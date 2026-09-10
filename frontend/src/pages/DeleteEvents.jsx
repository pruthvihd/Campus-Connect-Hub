import React, { useState, useEffect } from "react";
import axios from "axios";
import bgImage from "../assets/handshake.png";
import Footer from "../components/Footer";

import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Chip
} from "@mui/material";

import { Delete, AutoAwesome } from "@mui/icons-material";

export default function DeleteEvents() {

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8080/events/all");
      setEvents(res.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/events/${id}`);
      fetchEvents();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

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
            <AutoAwesome sx={{ color: "#F87171", fontSize: 36 }} />
            <Box>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 800,
                  background: "linear-gradient(135deg, #FFFFFF 30%, #FCA5A5 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                Delete Events
              </Typography>
              <Typography sx={{ color: "#CBD5E1", fontSize: "0.95rem", fontWeight: 500 }}>
                Remove active or completed events from the database
              </Typography>
            </Box>
          </Container>
        </Box>

        {/* CONTENT */}
        <Container maxWidth="xl" sx={{ py: 6 }}>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
              <CircularProgress sx={{ color: "#F87171" }} />
            </Box>
          ) : events.length === 0 ? (
            <Typography sx={{ color: "#CBD5E1", fontSize: "1.1rem" }}>No events found to delete.</Typography>
          ) : (
            <Grid container spacing={3}>
              {events.map((event) => (
                <Grid item xs={12} sm={6} md={4} key={event.id || event._id}>
                  <Card
                    elevation={0}
                    sx={{
                      height: "100%",
                      borderRadius: 4,
                      background: "rgba(15, 23, 42, 0.55)",
                      backdropFilter: "blur(24px) saturate(180%)",
                      border: "1px solid rgba(239, 68, 68, 0.3)",
                      boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
                      p: 1
                    }}
                  >
                    <CardContent sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
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

                      {event.category && (
                        <Chip
                          label={event.category}
                          size="small"
                          sx={{
                            width: "fit-content",
                            mb: 2,
                            background: "rgba(239, 68, 68, 0.2)",
                            border: "1px solid rgba(239, 68, 68, 0.4)",
                            color: "#F87171",
                            fontWeight: 700
                          }}
                        />
                      )}

                      <Typography sx={{ color: "#CBD5E1", fontSize: "0.9rem", mb: 2, flexGrow: 1 }}>
                        📍 Venue: {event.venue || "Campus"}
                      </Typography>

                      <Button
                        variant="contained"
                        color="error"
                        startIcon={<Delete />}
                        onClick={() => handleDelete(event.id || event._id)}
                        sx={{
                          py: 1.2,
                          borderRadius: 3,
                          background: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontWeight: 700,
                          textTransform: "none"
                        }}
                      >
                        Delete Event
                      </Button>
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
