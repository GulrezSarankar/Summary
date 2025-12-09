// src/DownloadSummary.js
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    Box, Button, Typography, Card, CardContent,
    Snackbar, Alert, Switch, FormControlLabel
} from "@mui/material";
import Layout from "./Components/Layout";

function DownloadSummary() {
    const location = useLocation();
    const navigate = useNavigate();
    const { summary, bullets } = location.state || {};

    const [darkMode, setDarkMode] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const handleDownload = () => {
        if (!summary && !bullets) {
            setSnackbarMessage("No content available to download!");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
            return;
        }

        const fileData = `Summary:\n${summary}\n\nBullet Points:\n${bullets}`;
        const element = document.createElement("a");
        element.href = URL.createObjectURL(new Blob([fileData], { type: "text/plain" }));
        element.download = "summary.txt";
        element.click();

        setSnackbarMessage("Summary downloaded successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <Layout>
            <Box
                sx={{
                    width: "100%",
                    minHeight: "100vh",
                    padding: { xs: 2, sm: 3, md: 4 },
                    transition: "0.3s",
                    background: darkMode
                        ? "linear-gradient(135deg, #1e1e1e, #000)"
                        : "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
                    borderRadius: 2,
                    position: "relative",
                }}
            >
                {/* Dark Mode Toggle */}
                <Box sx={{ position: "absolute", top: 10, right: 20 }}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={darkMode}
                                onChange={(e) => setDarkMode(e.target.checked)}
                            />
                        }
                        label="Dark Mode"
                    />
                </Box>

                {/* Logout Button */}
                <Box sx={{ position: "absolute", top: 10, right: 150 }}>
                    <Button color="error" onClick={handleLogout}>
                        Logout
                    </Button>
                </Box>

                {/* MAIN CARD */}
                <Card
                    sx={{
                        maxWidth: 800,
                        margin: "auto",
                        padding: { xs: 2, md: 4 },
                        boxShadow: 8,
                        backdropFilter: "blur(12px)",
                        backgroundColor: darkMode
                            ? "rgba(40,40,40,0.6)"
                            : "rgba(255,255,255,0.6)",
                        borderRadius: 3,
                        mt: 8,
                    }}
                >
                    <CardContent>
                        <Typography
                            variant="h5"
                            align="center"
                            sx={{
                                fontWeight: "bold",
                                color: darkMode ? "#fff" : "#333",
                                mb: 2,
                            }}
                        >
                            Summary & Bullet Points Ready!
                        </Typography>

                        {/* Summary Box */}
                        <Box
                            sx={{
                                backgroundColor: darkMode
                                    ? "rgba(60,60,60,0.7)"
                                    : "rgba(255,255,255,0.8)",
                                padding: { xs: 2, md: 3 },
                                borderRadius: 2,
                                mb: 4,
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{ fontWeight: "bold", color: darkMode ? "#fff" : "#000" }}
                            >
                                Summary:
                            </Typography>
                            <Typography
                                sx={{ mt: 1, whiteSpace: "pre-wrap", color: darkMode ? "#ddd" : "#333" }}
                            >
                                {summary || "No summary available"}
                            </Typography>

                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: "bold",
                                    mt: 3,
                                    color: darkMode ? "#fff" : "#000",
                                }}
                            >
                                Bullet Points:
                            </Typography>

                            <Typography
                                sx={{
                                    mt: 1,
                                    whiteSpace: "pre-wrap",
                                    color: darkMode ? "#ddd" : "#333",
                                }}
                            >
                                {bullets || "No bullet points generated"}
                            </Typography>
                        </Box>

                        {/* Buttons */}
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: { xs: "column", sm: "row" },
                                gap: 2,
                                justifyContent: "center",
                            }}
                        >
                            <Button
                                variant="contained"
                                onClick={() => navigate("/home")}
                                sx={{
                                    padding: "12px 20px",
                                    fontWeight: "bold",
                                    textTransform: "none",
                                    background: "linear-gradient(135deg, #4facfe, #00f2fe)",
                                }}
                                fullWidth={true}
                            >
                                Generate Another
                            </Button>

                            <Button
                                variant="outlined"
                                onClick={handleDownload}
                                sx={{
                                    padding: "12px 20px",
                                    fontWeight: "bold",
                                    textTransform: "none",
                                    borderColor: "#4facfe",
                                    color: "#1976d2",
                                    "&:hover": {
                                        background: "#e3f2fd",
                                        borderColor: "#4facfe",
                                    },
                                }}
                                fullWidth={true}
                            >
                                Download Summary
                            </Button>
                        </Box>
                    </CardContent>
                </Card>

                {/* Snackbar */}
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={3000}
                    onClose={() => setSnackbarOpen(false)}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                    <Alert
                        onClose={() => setSnackbarOpen(false)}
                        severity={snackbarSeverity}
                        sx={{
                            width: "100%",
                            backdropFilter: "blur(10px)",
                            backgroundColor:
                                snackbarSeverity === "success"
                                    ? "rgba(76,175,80,0.8)"
                                    : "rgba(244,67,54,0.8)",
                            color: "#fff",
                        }}
                    >
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Box>
        </Layout>
    );
}

export default DownloadSummary;
