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
        {/* Header Card */}
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
          <Typography
            variant="h4"
            fontWeight={800}
            sx={{
              textAlign: { xs: "center", md: "left" },
              color: "#2a2a2a",
              letterSpacing: "-0.5px",
            }}
          >
            📄 Your Generated Summaries
          </Typography>
          <Typography sx={{ mt: 1, color: "#666", fontSize: "15px" }}>
            All your generated summaries appear here. You can view, scroll, and delete them anytime.
          </Typography>
        </Box>

        {/* Desktop View */}
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: "0 6px 25px rgba(0,0,0,0.08)",
            }}
          >
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    background: "linear-gradient(90deg, #79a7ff, #89d4ff)",
                  }}
                >
                  {["Meeting ID", "Paragraph", "Summary", "Bullet Points", "Actions"].map((col) => (
                    <TableCell
                      key={col}
                      sx={{
                        fontWeight: 700,
                        color: "white",
                        fontSize: "15px",
                        letterSpacing: "0.3px",
                      }}
                    >
                      {col}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {summariesList.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 5, color: "#777" }}>
                      No summaries found
                    </TableCell>
                  </TableRow>
                )}

                {summariesList.map((row, index) => (
                  <TableRow
                    key={row.meeting_id}
                    sx={{
                      backgroundColor: index % 2 === 0 ? "#f9fbff" : "#ffffff",
                      "&:hover": {
                        backgroundColor: "#eef4ff",
                        transition: "0.2s",
                      },
                    }}
                  >
                    <TableCell sx={{ fontWeight: 600 }}>{row.meeting_id}</TableCell>
                    <TableCell sx={{ maxWidth: 250 }}>{row.ptext}</TableCell>
                    <TableCell sx={{ maxWidth: 250 }}>{row.summary}</TableCell>
                    <TableCell>
                      <pre style={{ whiteSpace: "pre-wrap", fontFamily: "inherit" }}>
                        {row.bullet_points}
                      </pre>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(row.meeting_id)}
                        sx={{
                          background: "#ffe5e5",
                          "&:hover": { background: "#ffcccc" },
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Mobile Cards (BEAUTIFUL MOBILE UI) */}
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          {summariesList.map((row) => (
            <Card
              key={row.meeting_id}
              sx={{
                mb: 3,
                borderRadius: 4,
                padding: 3,
                boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                backgroundColor: "white",
                border: "1px solid #ededed",
                transition: "0.2s",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
                },
              }}
            >
              <Typography variant="h6" fontWeight={800} color="#333">
                Meeting ID: {row.meeting_id}
              </Typography>

              <Typography mt={2} fontWeight={600} color="#555">
                Paragraph
              </Typography>
              <Typography color="#444">{row.ptext}</Typography>

              <Typography mt={2} fontWeight={600} color="#555">
                Summary
              </Typography>
              <Typography color="#444">{row.summary}</Typography>

              {row.bullet_points && (
                <>
                  <Typography mt={2} fontWeight={600} color="#555">
                    Bullets
                  </Typography>
                  <Typography sx={{ whiteSpace: "pre-wrap" }} color="#444">
                    {row.bullet_points}
                  </Typography>
                </>
              )}

              <Button
                variant="contained"
                fullWidth
                color="error"
                sx={{
                  mt: 3,
                  py: 1.2,
                  fontWeight: 700,
                  borderRadius: 3,
                }}
                onClick={() => handleDelete(row.meeting_id)}
              >
                Delete Summary
              </Button>
            </Card>
          ))}
        </Box>
      </Box>
    </Layout>
  );
}

export default Dashboard;
