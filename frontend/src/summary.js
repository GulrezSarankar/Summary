import React, { useState, useEffect, useCallback } from "react";
import Layout from "./Components/Layout";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Summary() {
  const [selected, setSelected] = useState("extractive");
  const [text, setText] = useState("");
  const [meetingId, setMeetingId] = useState("");
  const [summary, setSummary] = useState("");

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchMeetingId = useCallback(async () => {
    const res = await axios.get("http://localhost:5000/get_next_meeting_id", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setMeetingId(res.data.next_meeting_id);
  }, [token]);

  useEffect(() => {
    fetchMeetingId();
  }, [fetchMeetingId]);

  const generate = async () => {
    const res = await axios.post(
      "http://localhost:5000/get_summary",
      { text, type: selected, meeting_id: meetingId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setSummary(res.data.summary);
  };

  const download = () =>
    navigate("/download-summary", { state: { summary, bullets: null } });

  return (
    <Layout>
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          background: "linear-gradient(145deg, #edf3ff, #f8faff)",
          padding: { xs: 2, md: 4 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: { xs: 0, md: "260px" },
        }}
      >
        <Card
          sx={{
            width: "100%",
            maxWidth: 700,
            borderRadius: 5,
            boxShadow: "0 12px 35px rgba(0,0,0,0.08)",
            paddingY: 2,
            background: "white",
            border: "1px solid #e2e8ff",
            animation: "fadeIn 0.5s ease",
          }}
        >
          <CardContent sx={{ padding: { xs: 3, md: 5 } }}>
            {/* Title */}
            <Typography
              variant="h4"
              fontWeight={800}
              textAlign="center"
              mb={3}
              sx={{ letterSpacing: "-0.5px", color: "#222" }}
            >
              ✨ Generate Your Summary
            </Typography>

            {/* Meeting ID */}
            <TextField
              label="Meeting ID"
              value={meetingId}
              fullWidth
              margin="normal"
              disabled
              sx={{
                background: "#f5f7ff",
                borderRadius: 2,
              }}
            />

            {/* Summary Type */}
            <Typography fontWeight={600} mt={3} mb={1} color="#333">
              Select summarization type
            </Typography>

            <RadioGroup
              row
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              sx={{
                background: "#f0f4ff",
                padding: 1.5,
                borderRadius: 3,
                border: "1px solid #d8e0ff",
              }}
            >
              <FormControlLabel value="extractive" control={<Radio />} label="Extractive" />
              <FormControlLabel value="abstractive" control={<Radio />} label="Abstractive" />
            </RadioGroup>

            {/* Textarea */}
            <Typography fontWeight={600} mt={3} color="#333">
              Enter text to summarize
            </Typography>

            <TextField
              placeholder="Paste your content here..."
              multiline
              rows={7}
              fullWidth
              margin="normal"
              value={text}
              onChange={(e) => setText(e.target.value)}
              sx={{
                background: "#ffffff",
                borderRadius: 3,
                "& textarea": { fontSize: "16px", lineHeight: "1.6" },
              }}
            />

            {/* Generate Summary Button */}
            <Button
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                py: 1.5,
                fontSize: "16px",
                fontWeight: 700,
                borderRadius: 3,
                background: "linear-gradient(90deg, #6a11cb, #2575fc)",
                ":hover": { opacity: 0.9 },
              }}
              onClick={generate}
            >
              Generate Summary
            </Button>

            {/* Summary Output */}
            {summary && (
              <Box mt={4}>
                <Typography variant="h5" fontWeight={700} mb={1} color="#222">
                  📘 Summary Result
                </Typography>

                <Box
                  sx={{
                    background: "#f5f7ff",
                    padding: 2.5,
                    borderRadius: 3,
                    border: "1px solid #d8e0ff",
                    whiteSpace: "pre-wrap",
                    fontSize: "16px",
                    color: "#444",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
                  }}
                >
                  {summary}
                </Box>

                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  sx={{
                    mt: 3,
                    py: 1.4,
                    fontSize: "16px",
                    fontWeight: 700,
                    borderRadius: 3,
                  }}
                  onClick={download}
                >
                  Continue
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>

        {/* Animation */}
        <style>
          {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
        </style>
      </Box>
    </Layout>
  );
}

export default Summary;
