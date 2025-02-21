import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress } from "@mui/material";

const API_BASE_URL = "http://localhost:8000/api/events";

const PublicComplaints = () => {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(""); 

    useEffect(() => {
        const fetchComplaints = async () => {
            console.log("hwh")
            try {
                const token = localStorage.getItem("authToken");
                if (!token) {
                    setError("User not authenticated");
                    setLoading(false);
                    return;
                }

                const response = await fetch(`${API_BASE_URL}/get-flagged-complaints`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });

                console.log(response)
                if (!response.ok) {
                    throw new Error("Failed to fetch complaints");
                }

                const data = await response.json();
                setComplaints(data);
            } catch (err) {
                console.log(err)
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchComplaints();
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <Typography variant="h5" gutterBottom>User InAppropriate Complaints</Typography>

            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><b>Title</b></TableCell>
                                <TableCell><b>Description</b></TableCell>
                                <TableCell><b>Category</b></TableCell>
                                <TableCell><b>Status</b></TableCell>
                                <TableCell><b>Moderation</b></TableCell>
                                <TableCell><b>Date</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {complaints.length > 0 ? (
                                complaints.map((complaint) => (
                                    <TableRow key={complaint._id}>
                                        <TableCell>{complaint.title}</TableCell>
                                        <TableCell>{complaint.description}</TableCell>
                                        <TableCell>{complaint.category}</TableCell>
                                        <TableCell>{complaint.status}</TableCell>
                                        <TableCell sx={{color:"red"}}>{complaint.moderation_status}</TableCell>
                                        <TableCell>{new Date(complaint.createdAt).toLocaleString()}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">
                                        No complaints found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
};

export default PublicComplaints;
