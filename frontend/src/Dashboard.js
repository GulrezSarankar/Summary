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
import api from "./api";

function Dashboard() {
  const [summariesList, setSummariesList] = useState([]);
  const token = localStorage.getItem("token");

  const fetchSummaries = useCallback(async () => {
    try {
      const response = await api.get("/get_summary_by_id", {
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
      await api.delete(`/delete_summary/${meetingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSummariesList((prev) => prev.filter((s) => s.meeting_id !== meetingId));
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  return (
    <Layout>
      <Box
        sx={{
          padding: { xs: 2, md: 4 },
          marginLeft: { md: "260px" },
          marginTop: { xs: "70px", md: "0px" },
          background: "linear-gradient(145deg, #f6f9ff, #eef3ff)",
          minHeight: "100vh",
        }}
      >

        {/* HEADER */}
        <Box
          sx={{
            background: "white",
            padding: 3,
            borderRadius: 4,
            boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
            mb: 4,
            border: "1px solid #e8e8e8",
          }}
        >
          <Typography variant="h4" fontWeight={800}>
            📄 Your Generated Summaries
          </Typography>
          <Typography sx={{ mt: 1, color: "#666" }}>
            All your generated summaries appear here.
          </Typography>
        </Box>

        {/* DESKTOP TABLE */}
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <TableContainer component={Paper} sx={{ borderRadius: 4 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ background: "linear-gradient(90deg, #79a7ff, #89d4ff)" }}>
                  {["Meeting ID", "Paragraph", "Summary", "Bullet Points", "Actions"].map((col) => (
                    <TableCell key={col} sx={{ color: "white", fontWeight: 700 }}>
                      {col}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {summariesList.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 5 }}>
                      No summaries found
                    </TableCell>
                  </TableRow>
                )}

                {summariesList.map((row) => (
                  <TableRow key={row.meeting_id}>
                    <TableCell>{row.meeting_id}</TableCell>
                    <TableCell>{row.ptext}</TableCell>
                    <TableCell>{row.summary}</TableCell>
                    <TableCell sx={{ whiteSpace: "pre-wrap" }}>{row.bullet_points}</TableCell>
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

        {/* MOBILE CARDS */}
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          {summariesList.map((row) => (
            <Card key={row.meeting_id} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6">Meeting ID: {row.meeting_id}</Typography>
              <Typography mt={2}><b>Paragraph:</b> {row.ptext}</Typography>
              <Typography mt={2}><b>Summary:</b> {row.summary}</Typography>
              <Typography mt={2}><b>Bullets:</b> {row.bullet_points}</Typography>

              <Button
                fullWidth
                sx={{ mt: 2 }}
                variant="outlined"
                color="error"
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
