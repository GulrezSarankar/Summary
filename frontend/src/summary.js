// src/summary.js
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

  // Fix missing dependency warning
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
          padding: 3,
          width: "100%",
          boxSizing: "border-box",
          marginLeft: { xs: 0, md: "260px" },
          marginTop: { xs: "70px", md: 0 },
        }}
      >
        <Card sx={{ width: "100%", maxWidth: 850, margin: "auto", boxShadow: 4 }}>
          <CardContent>
            <Typography variant="h5" fontWeight={600}>
              Generate Summary
            </Typography>

            <TextField
              label="Meeting ID"
              value={meetingId}
              fullWidth
              margin="normal"
              disabled
            />

            <RadioGroup
              row
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              sx={{ mt: 1 }}
            >
              <FormControlLabel value="extractive" control={<Radio />} label="Extractive" />
              <FormControlLabel value="abstractive" control={<Radio />} label="Abstractive" />
            </RadioGroup>

            <TextField
              label="Enter Text"
              multiline
              rows={5}
              fullWidth
              margin="normal"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <Button variant="contained" fullWidth sx={{ mt: 2, py: 1.5 }} onClick={generate}>
              Summarize
            </Button>

            {summary && (
              <>
                <Typography variant="h6" fontWeight={600} mt={3}>
                  Summary:
                </Typography>

                <Typography sx={{ whiteSpace: "pre-wrap" }}>{summary}</Typography>

                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  sx={{ mt: 3, py: 1.5 }}
                  onClick={download}
                >
                  Continue
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </Box>
    </Layout>
  );
}

export default Summary;
