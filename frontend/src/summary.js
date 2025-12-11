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
import api from "./api";
import { useNavigate } from "react-router-dom";

function Summary() {
  const [selected, setSelected] = useState("extractive");
  const [text, setText] = useState("");
  const [meetingId, setMeetingId] = useState("");
  const [summary, setSummary] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchMeetingId = useCallback(async () => {
    const res = await api.get("/get_next_meeting_id", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setMeetingId(res.data.next_meeting_id);
  }, [token]);

  useEffect(() => {
    fetchMeetingId();
  }, [fetchMeetingId]);

  const generate = async () => {
    const res = await api.post(
      "/get_summary",
      { text, type: selected, meeting_id: meetingId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setSummary(res.data.summary);
  };

  const download = () => {
    navigate("/download-summary", { state: { summary, bullets: null } });
  };

  return (
    <Layout>
      <Box sx={{ padding: 4 }}>

        <Card sx={{ maxWidth: 700, margin: "auto" }}>
          <CardContent>

            <Typography variant="h4" textAlign="center">
              ✨ Generate Your Summary
            </Typography>

            <TextField label="Meeting ID" fullWidth disabled value={meetingId} />

            <RadioGroup
              row
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
            >
              <FormControlLabel value="extractive" control={<Radio />} label="Extractive" />
              <FormControlLabel value="abstractive" control={<Radio />} label="Abstractive" />
            </RadioGroup>

            <TextField
              multiline
              rows={6}
              fullWidth
              placeholder="Enter text..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <Button fullWidth variant="contained" sx={{ mt: 3 }} onClick={generate}>
              Generate Summary
            </Button>

            {summary && (
              <>
                <Box mt={3}>{summary}</Box>
                <Button fullWidth sx={{ mt: 2 }} onClick={download}>
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
