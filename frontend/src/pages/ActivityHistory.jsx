import React, { useEffect, useState } from "react";
import axios from "axios";
import bgImage from "../assets/handshake.png";
import Footer from "../components/Footer";

import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Chip
} from "@mui/material";

import { AutoAwesome, EventNote } from "@mui/icons-material";

export default function ActivityHistory() {

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchExpiredEvents = async () => {
      try {
        if (!user || !user.id) {
          console.error("User not found in localStorage");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `http://localhost:8080/events/expired/${user.id}`
        );

        setHistory(response.data || []);

      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpiredEvents();

  }, [user]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#0B0F19",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        color: "#FFFFFF",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(11, 15, 25, 0.45) 0%, rgba(15, 23, 42, 0.55) 100%)",
          backdropFilter: "blur(3px)",
          zIndex: 1
        }
      }}
    >
      <Box sx={{ position: "relative", zIndex: 2 }}>

        {/* HERO BANNER */}
        <Box
          sx={{
            background: "rgba(15, 23, 42, 0.55)",
            backdropFilter: "blur(20px) saturate(180%)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.18)",
            py: 4,
            px: 2,
            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.3)"
          }}
        >
          <Container maxWidth="xl" sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <AutoAwesome sx={{ color: "#A78BFA", fontSize: 36 }} />
            <Box>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 800,
                  background: "linear-gradient(135deg, #FFFFFF 30%, #C4B5FD 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                Activity & Expired Events Log
              </Typography>
              <Typography sx={{ color: "#CBD5E1", fontSize: "0.95rem", fontWeight: 500 }}>
                Archive of past campus events and registration activity
              </Typography>
            </Box>
          </Container>
        </Box>

        {/* CONTENT */}
        <Container maxWidth="xl" sx={{ py: 6 }}>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
              <CircularProgress sx={{ color: "#A78BFA" }} />
            </Box>
          ) : history.length === 0 ? (
            <Box
              sx={{
                p: 6,
                textAlign: "center",
                borderRadius: 4,
                background: "rgba(15, 23, 42, 0.55)",
                backdropFilter: "blur(24px)",
                border: "1px solid rgba(255, 255, 255, 0.22)",
                maxWidth: 500,
                mx: "auto"
              }}
            >
              <EventNote sx={{ fontSize: 54, color: "#A78BFA", mb: 2 }} />
              <Typography sx={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "1.1rem" }}>
                No expired events in your activity log yet.
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {history.map((event) => (
                <Grid item xs={12} sm={6} md={4} key={event.id || event._id}>
                  <Card
                    elevation={0}
                    sx={{
                      height: "100%",
                      borderRadius: 4,
                      background: "rgba(15, 23, 42, 0.55)",
                      backdropFilter: "blur(24px) saturate(180%)",
                      border: "1px solid rgba(255, 255, 255, 0.22)",
                      boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
                      p: 1
                    }}
                  >
                    <CardContent>
                      <Typography
                        sx={{
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontWeight: 800,
                          fontSize: "1.2rem",
                          color: "#FFFFFF",
                          mb: 1.5
                        }}
                      >
                        {event.title}
                      </Typography>

                      <Typography sx={{ color: "#CBD5E1", fontSize: "0.9rem", mb: 0.8 }}>
                        📍 Venue: {event.venue || "N/A"}
                      </Typography>

                      <Typography sx={{ color: "#CBD5E1", fontSize: "0.9rem", mb: 0.8 }}>
                        🏷️ Category: {event.category || "N/A"}
                      </Typography>

                      <Typography sx={{ color: "#CBD5E1", fontSize: "0.9rem", mb: 2 }}>
                        👤 Organizer: {event.organizerName || "N/A"}
                      </Typography>

                      <Chip
                        label="Expired"
                        size="small"
                        sx={{
                          background: "rgba(239, 68, 68, 0.2)",
                          border: "1px solid rgba(239, 68, 68, 0.4)",
                          color: "#F87171",
                          fontWeight: 700
                        }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>

        <Footer />
      </Box>
    </Box>
  );
}
