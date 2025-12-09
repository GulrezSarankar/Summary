import os
import traceback
from datetime import timedelta

import bcrypt
import nltk
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager, create_access_token, get_jwt_identity, jwt_required
)
from nltk.tokenize import sent_tokenize
from transformers import pipeline
import pymysql
from flask_mail import Mail, Message

# -----------------------------
# NLTK Downloads (Fixes punkt_tab ERROR)
# -----------------------------
nltk.download('punkt', quiet=True)
nltk.download('punkt_tab', quiet=True)

app = Flask(__name__)
CORS(app)

# -----------------------------
# JWT Config
# -----------------------------
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'ab#123Uty')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=2)
jwt = JWTManager(app)

# -----------------------------
# EMAIL CONFIG (Admin Contact Emails)
# -----------------------------
app.config['MAIL_SERVER'] = "smtp.gmail.com"
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True

# 🔥 Put your admin email + Gmail App Password here
app.config['MAIL_USERNAME'] = "youradminemail@gmail.com"
app.config['MAIL_PASSWORD'] = "your_app_password"
app.config['MAIL_DEFAULT_SENDER'] = "youradminemail@gmail.com"

mail = Mail(app)

# -----------------------------
# Summarizer Model
# -----------------------------
summarizer = pipeline("summarization", model="t5-small")

# -----------------------------
# Database Connection
# -----------------------------
def get_db_connection():
    try:
        connection = pymysql.connect(
            host=os.environ.get('DB_HOST', 'localhost'),
            user=os.environ.get('DB_USER', 'root'),
            password=os.environ.get('DB_PASSWORD', 'system'),
            database=os.environ.get('DB_NAME', 'demo111'),
            charset='utf8mb4',
            cursorclass=pymysql.cursors.Cursor,
            autocommit=False
        )
        return connection
    except pymysql.MySQLError as e:
        print("Database Connection Failed:", str(e))
        return None


# -----------------------------
# Register
# -----------------------------
@app.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({"msg": "Missing fields"}), 400

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    connection = get_db_connection()
    if not connection:
        return jsonify({"msg": "Database connection failed"}), 500

    cursor = connection.cursor()
    try:
        cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
        if cursor.fetchone():
            return jsonify({"msg": "User already exists"}), 400

        cursor.execute(
            "INSERT INTO users (username, email, password) VALUES (%s, %s, %s)",
            (username, email, hashed_password.decode('utf-8'))
        )
        connection.commit()
        return jsonify({"msg": "Registered successfully!"}), 201
    except Exception as e:
        connection.rollback()
        return jsonify({"msg": "DB error", "error": str(e)}), 500
    finally:
        cursor.close()
        connection.close()


# -----------------------------
# Login
# -----------------------------
@app.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"msg": "Missing fields"}), 400

    connection = get_db_connection()
    if not connection:
        return jsonify({"msg": "Database connection failed"}), 500

    cursor = connection.cursor()

    try:
        cursor.execute("SELECT email, password FROM users WHERE email = %s", (email,))
        user = cursor.fetchone()

        if not user:
            return jsonify({"msg": "User does not exist"}), 401

        stored_pass = user[1].encode('utf-8')
        if bcrypt.checkpw(password.encode('utf-8'), stored_pass):
            access_token = create_access_token(identity=user[0])
            return jsonify(access_token=access_token), 200

        return jsonify({"msg": "Invalid password"}), 401
    except Exception as e:
        traceback.print_exc()
        return jsonify({"msg": "Error", "error": str(e)}), 500
    finally:
        cursor.close()
        connection.close()


# -----------------------------
# Get Next Meeting ID
# -----------------------------
@app.route('/get_next_meeting_id', methods=['GET'])
@jwt_required()
def get_next_meeting_id():
    user = get_jwt_identity()

    connection = get_db_connection()
    if not connection:
        return jsonify({"msg": "DB fail"}), 500

    cursor = connection.cursor()

    try:
        cursor.execute(
            "SELECT MAX(meet_id) FROM summaries WHERE user_email = %s",
            (user,)
        )
        result = cursor.fetchone()
        max_id = result[0] if result[0] else 0
        return jsonify({"next_meeting_id": max_id + 1})
    except Exception as e:
        return jsonify({"msg": "Error", "error": str(e)}), 500
    finally:
        cursor.close()
        connection.close()


# -----------------------------
# Extractive Summary
# -----------------------------
def extractive_summary(text, num_sentences=3):
    sentences = sent_tokenize(text)
    return ' '.join(sentences[:num_sentences])


# -----------------------------
# Generate Summary
# -----------------------------
@app.route('/get_summary', methods=['POST'])
@jwt_required()
def get_summary():
    data = request.get_json()
    text = data.get('text')
    summary_type = data.get('type')
    meeting_id = data.get('meeting_id')
    generate_bullets = data.get('generate_bullets', False)

    user_email = get_jwt_identity()

    if not text or not meeting_id:
        return jsonify({"msg": "Text + Meeting ID required"}), 400

    connection = get_db_connection()
    if not connection:
        return jsonify({"msg": "DB fail"}), 500
    cursor = connection.cursor()

    try:
        chunks = [text[i:i+900] for i in range(0, len(text), 900)]

        summaries = []
        for chunk in chunks:
            if summary_type == 'extractive':
                summaries.append(extractive_summary(chunk))
            else:
                result = summarizer(chunk, max_length=130, min_length=25, do_sample=False)
                summaries.append(result[0]['summary_text'])

        final_summary = " ".join(summaries)

        cursor.execute(
            "SELECT 1 FROM summaries WHERE meet_id = %s AND user_email = %s",
            (meeting_id, user_email)
        )
        if cursor.fetchone():
            return jsonify({"msg": "Meeting ID already exists"}), 400

        cursor.execute(
            "INSERT INTO summaries (meet_id, user_email, ptext, summary) VALUES (%s, %s, %s, %s)",
            (meeting_id, user_email, text, final_summary)
        )
        connection.commit()

        bullet_points = ""
        if generate_bullets:
            sentences = text.replace("\n", " ").split(". ")
            bullet_points = "\n".join(
                [f"• {s.strip()}" for s in sentences if s.strip()]
            )

            cursor.execute(
                "INSERT INTO bullet_points (meet_id, user_email, ptext, bullets) VALUES (%s, %s, %s, %s)",
                (meeting_id, user_email, text, bullet_points)
            )
            connection.commit()

        return jsonify({
            "msg": "Summary generated successfully",
            "summary": final_summary,
            "bullets": bullet_points if generate_bullets else None
        })

    except Exception as e:
        connection.rollback()
        traceback.print_exc()
        return jsonify({"msg": "Error generating summary", "error": str(e)}), 500
    finally:
        cursor.close()
        connection.close()


# -----------------------------
# Fetch All Summaries
# -----------------------------
@app.route('/get_summary_by_id', methods=['GET'])
@jwt_required()
def get_summary_by_id():
    user_email = get_jwt_identity()

    connection = get_db_connection()
    if not connection:
        return jsonify({"msg": "DB fail"}), 500

    cursor = connection.cursor()

    try:
        cursor.execute("""
            SELECT s.meet_id, s.ptext, s.summary, b.bullets
            FROM summaries s
            LEFT JOIN bullet_points b
            ON s.meet_id = b.meet_id AND s.user_email = b.user_email
            WHERE s.user_email = %s
        """, (user_email,))

        rows = cursor.fetchall()
        data = []

        for row in rows:
            data.append({
                "meeting_id": row[0],
                "ptext": row[1],
                "summary": row[2],
                "bullet_points": row[3] if row[3] else ""
            })

        return jsonify({"summaries": data})

    except Exception as e:
        return jsonify({"msg": "Error", "error": str(e)}), 500
    finally:
        cursor.close()
        connection.close()


# -----------------------------
# Delete Summary
# -----------------------------
@app.route('/delete_summary/<int:meeting_id>', methods=['DELETE'])
@jwt_required()
def delete_summary(meeting_id):
    user_email = get_jwt_identity()

    connection = get_db_connection()
    cursor = connection.cursor()

    try:
        cursor.execute(
            "DELETE FROM summaries WHERE meet_id = %s AND user_email = %s",
            (meeting_id, user_email)
        )
        connection.commit()

        if cursor.rowcount == 0:
            return jsonify({"msg": "Not found"}), 404

        return jsonify({"msg": "Summary deleted"})

    except Exception as e:
        connection.rollback()
        return jsonify({"msg": "Error", "error": str(e)}), 500
    finally:
        cursor.close()
        connection.close()


# ------------------------------------------------------------------
# ⭐ CONTACT API — Saves Message + Sends Email to Admin
# ------------------------------------------------------------------
@app.route('/contact', methods=['POST'])
def contact():
    data = request.json
    name = data.get("name")
    email = data.get("email")
    message = data.get("message")

    if not name or not email or not message:
        return jsonify({"error": "All fields required"}), 400

    # Save to DB
    connection = get_db_connection()
    cursor = connection.cursor()

    try:
        cursor.execute(
            "INSERT INTO contact_messages (name, email, message) VALUES (%s, %s, %s)",
            (name, email, message)
        )
        connection.commit()

        # Send Email to Admin
        try:
            msg = Message(
                subject=f"New Contact Message from {name}",
                recipients=[app.config["MAIL_USERNAME"]],
            )
            msg.body = f"""
New Contact Message:

Name: {name}
Email: {email}

Message:
{message}
            """
            mail.send(msg)

        except Exception as mail_err:
            print("MAIL ERROR:", mail_err)

        return jsonify({"message": "Message sent successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        cursor.close()
        connection.close()


# -----------------------------
# Run App
# -----------------------------
if __name__ == '__main__':
    app.run(debug=True)
