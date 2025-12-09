// src/Dashboard.js
import React, { useState, useEffect, useCallback } from "react";
import Layout from "./Components/Layout";
import {
  Box,
  Typography,
  IconButton,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

function Dashboard() {
  const [summariesList, setSummariesList] = useState([]);
  const token = localStorage.getItem("token");

  // FIX: UseCallback to avoid ESLint missing dependency warning
  const fetchSummaries = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/get_summary_by_id", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSummariesList(response.data.summaries || []);
    } catch (error) {
      console.error("Error fetching summaries:", error);
      alert("Failed to fetch data.");
    }
  }, [token]);

  useEffect(() => {
    fetchSummaries();
  }, [fetchSummaries]);

  const handleDelete = async (meetingId) => {
    if (!window.confirm("Delete this summary?")) return;

    try {
      await axios.delete(`http://localhost:5000/delete_summary/${meetingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSummariesList((prev) =>
        prev.filter((s) => s.meeting_id !== meetingId)
      );
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  return (
    <Layout>
      <Box
        sx={{
          padding: 3,
          marginLeft: { md: "260px" },
          marginTop: { xs: "70px", md: "0px" },
        }}
      >
        <Typography variant="h4" fontWeight={700} mb={3}>
          Your Summaries
        </Typography>

        {/* Desktop Table View */}
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "#4facfe" }}>
                  <TableCell sx={{ fontWeight: 600, color: "white" }}>
                    Meeting ID
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "white" }}>
                    Paragraph
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "white" }}>
                    Summary
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "white" }}>
                    Bullets
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "white" }}>
                    Delete
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {summariesList.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No summaries found
                    </TableCell>
                  </TableRow>
                )}

                {summariesList.map((row) => (
                  <TableRow key={row.meeting_id}>
                    <TableCell>{row.meeting_id}</TableCell>
                    <TableCell sx={{ maxWidth: 300, whiteSpace: "normal" }}>
                      {row.ptext}
                    </TableCell>
                    <TableCell sx={{ maxWidth: 300, whiteSpace: "normal" }}>
                      {row.summary}
                    </TableCell>
                    <TableCell>
                      <pre style={{ whiteSpace: "pre-wrap" }}>
                        {row.bullet_points}
                      </pre>
                    </TableCell>
                    <TableCell>
                      <IconButton color="error" onClick={() => handleDelete(row.meeting_id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Mobile Card Layout */}
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          {summariesList.map((row) => (
            <Card
              key={row.meeting_id}
              sx={{
                mb: 3,
                borderRadius: 3,
                boxShadow: 3,
                padding: 2,
              }}
            >
              <Typography variant="h6" fontWeight={700}>
                Meeting ID: {row.meeting_id}
              </Typography>

              <Typography mt={1} fontWeight={600}>Paragraph:</Typography>
              <Typography>{row.ptext}</Typography>

              <Typography mt={1} fontWeight={600}>Summary:</Typography>
              <Typography>{row.summary}</Typography>

              {row.bullet_points && (
                <>
                  <Typography mt={1} fontWeight={600}>Bullets:</Typography>
                  <Typography sx={{ whiteSpace: "pre-wrap" }}>
                    {row.bullet_points}
                  </Typography>
                </>
              )}

              <Button
                variant="contained"
                color="error"
                fullWidth
                sx={{ mt: 2 }}
                onClick={() => handleDelete(row.meeting_id)}
              >
                Delete
              </Button>
            </Card>
          ))}
        </Box>
      </Box>
    </Layout>
  );
}

export default Dashboard;
