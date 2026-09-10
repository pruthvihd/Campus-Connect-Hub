import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  TextField,
  MenuItem,
  Alert,
  Snackbar,
  CardMedia,
  IconButton
} from "@mui/material";

import {
  Code,
  Work,
  VideoCall,
  School,
  TheaterComedy,
  SportsBaseball,
  BusinessCenter,
  Psychology,
  EmojiEvents,
  Close,
  CloudUpload,
  AutoAwesome
} from "@mui/icons-material";

/* =======================================================
   EMPTY FORM
======================================================= */
const EMPTY_FORM = {
  title: "",
  category: "",
  date: "",
  fee: "",
  registrationLink: "",
  description: "",
  venue: "",
  organizerName: "",
  organizerPhone: ""
};

const EventRegistration = ({ editingEvent }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  const [form, setForm] = useState(EMPTY_FORM);

  /* =======================================================
     AUTO FILL WHEN EDITING
  ======================================================= */
  useEffect(() => {
    if (editingEvent) {
      setForm({
        title: editingEvent.title || "",
        category: editingEvent.category || "",
        date: editingEvent.expireAt
          ? new Date(editingEvent.expireAt)
              .toISOString()
              .substring(0, 10)
          : "",
        fee: editingEvent.fee
          ? editingEvent.fee.replace("₹", "")
          : "",
        registrationLink: editingEvent.registrationLink || "",
        description: editingEvent.description || "",
        venue: editingEvent.venue || "",
        organizerName: editingEvent.organizerName || "",
        organizerPhone: editingEvent.organizerPhone || ""
      });

      setImagePreview(editingEvent.image || null);
    } else {
      setForm(EMPTY_FORM);
      setImagePreview(null);
    }
  }, [editingEvent]);

  /* =======================================================
     EVENT CATEGORIES
  ======================================================= */
  const eventCategories = [
    { value: "hackathon", label: "Hackathon", icon: <Code sx={{ color: "#6366F1" }} /> },
    { value: "internship", label: "Internship", icon: <Work sx={{ color: "#06B6D4" }} /> },
    { value: "webinars", label: "Webinars", icon: <VideoCall sx={{ color: "#3B82F6" }} /> },
    { value: "workshop", label: "Workshop", icon: <School sx={{ color: "#10B981" }} /> },
    { value: "cultural", label: "Cultural Events", icon: <TheaterComedy sx={{ color: "#EC4899" }} /> },
    { value: "sports", label: "Sports", icon: <SportsBaseball sx={{ color: "#F59E0B" }} /> },
    { value: "offcampus", label: "Off Campus Hiring", icon: <BusinessCenter sx={{ color: "#8B5CF6" }} /> },
    { value: "mentorship", label: "Mentorship", icon: <Psychology sx={{ color: "#14B8A6" }} /> },
    { value: "competition", label: "Other Competitions", icon: <EmojiEvents sx={{ color: "#F43F5E" }} /> }
  ];

  /* =======================================================
     HANDLERS
  ======================================================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const showAlert = (message, severity = "success") => {
    setAlert({ open: true, message, severity });
  };

  /* =======================================================
     SUBMIT (CREATE + UPDATE)
  ======================================================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.category || !form.date || !form.registrationLink) {
      showAlert("Please fill all required fields", "error");
      return;
    }

    setLoading(true);

    try {
      const eventData = {
        title: form.title,
        category: form.category,
        venue: form.venue,
        organizerName: form.organizerName,
        organizerPhone: form.organizerPhone,
        registrationLink: form.registrationLink,
        description: form.description,
        fee: form.fee ? `₹${form.fee}` : "Free",
        image: imagePreview,
        expireAt: new Date(form.date)
      };

      // UPDATE
      if (editingEvent) {
        await axios.put(
          `http://localhost:8080/events/update/${editingEvent.id || editingEvent._id}`,
          eventData
        );
        showAlert("Event Updated Successfully!");
      }
      // CREATE
      else {
        await axios.post(
          "http://localhost:8080/events/register",
          eventData
        );
        showAlert("Event Registered Successfully!");
      }

      setForm(EMPTY_FORM);
      setImagePreview(null);

      // ✅ REDIRECT TO MENU PAGE
      setTimeout(() => {
        navigate("/menu");
      }, 1200);

    } catch (error) {
      console.log("Backend Error 👉", error.response?.data || error.message);
      showAlert("Backend connection failed!", "error");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    "& .MuiInputLabel-root": {
      color: "#94A3B8",
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 500,
      "&.Mui-focused": { color: "#818CF8" }
    },
    "& .MuiOutlinedInput-root": {
      color: "#FFFFFF",
      backgroundColor: "rgba(255, 255, 255, 0.04)",
      borderRadius: 3,
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      "& fieldset": { borderColor: "rgba(255, 255, 255, 0.15)" },
      "&:hover fieldset": { borderColor: "rgba(99, 102, 241, 0.5)" },
      "&.Mui-focused fieldset": { borderColor: "#6366F1" }
    },
    "& .MuiSelect-icon": { color: "#94A3B8" }
  };

  /* =======================================================
     UI
  ======================================================= */
  return (
    <Box
      sx={{
        maxHeight: "90vh",
        overflow: "auto",
        backgroundColor: "#0F172A",
        color: "#FFFFFF",
        fontFamily: "'Plus Jakarta Sans', sans-serif"
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #0F172A 0%, #1E1B4B 50%, #312E81 100%)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          p: { xs: 3, md: 3.5 },
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <AutoAwesome sx={{ color: "#818CF8", fontSize: 28 }} />
          <Typography
            variant="h5"
            sx={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: { xs: "1.3rem", md: "1.75rem" },
              background: "linear-gradient(135deg, #FFFFFF 30%, #A5B4FC 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.02em"
            }}
          >
            {editingEvent ? "Edit Event" : "Register New Event"}
          </Typography>
        </Box>

        <IconButton
          onClick={() => navigate("/menu")}
          sx={{
            color: "#FFFFFF",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.2)"
            }
          }}
        >
          <Close />
        </IconButton>
      </Box>

      {/* FORM BODY */}
      <Box sx={{ p: { xs: 3, md: 4 } }}>
        <Grid container spacing={4}>

          {/* IMAGE UPLOAD */}
          <Grid item xs={12} md={5}>
            <Typography
              sx={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: "0.9rem",
                color: "#E2E8F0",
                mb: 1.5
              }}
            >
              Event Cover Banner
            </Typography>

            <Card
              elevation={0}
              sx={{
                height: 340,
                borderRadius: 4,
                border: "2px dashed rgba(99, 102, 241, 0.4)",
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.3s ease",
                overflow: "hidden",
                "&:hover": {
                  borderColor: "#6366F1",
                  backgroundColor: "rgba(99, 102, 241, 0.06)",
                  transform: "scale(1.01)"
                }
              }}
              onClick={() =>
                document.getElementById("upload-img").click()
              }
            >
              <input
                id="upload-img"
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageUpload}
              />

              {imagePreview ? (
                <CardMedia
                  component="img"
                  image={imagePreview}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                />
              ) : (
                <Box sx={{ textAlign: "center", p: 3 }}>
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      backgroundColor: "rgba(99, 102, 241, 0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto",
                      mb: 2
                    }}
                  >
                    <CloudUpload sx={{ fontSize: 32, color: "#818CF8" }} />
                  </Box>
                  <Typography
                    sx={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 700,
                      color: "#FFFFFF",
                      fontSize: "1rem",
                      mb: 0.5
                    }}
                  >
                    Upload Cover Image
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: "0.825rem",
                      color: "#94A3B8"
                    }}
                  >
                    PNG, JPG or WEBP (Max 5MB)
                  </Typography>
                </Box>
              )}
            </Card>
          </Grid>

          {/* FORM FIELDS */}
          <Grid item xs={12} md={7}>
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>

                <TextField
                  label="Event Name *"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  sx={inputStyle}
                />

                <TextField
                  select
                  label="Category *"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                  sx={inputStyle}
                >
                  {eventCategories.map(cat => (
                    <MenuItem
                      key={cat.value}
                      value={cat.value}
                      sx={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        py: 1.2
                      }}
                    >
                      {cat.icon}
                      <span>{cat.label}</span>
                    </MenuItem>
                  ))}
                </TextField>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="date"
                      label="Event Date *"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                      required
                      sx={inputStyle}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Fee (₹)"
                      name="fee"
                      value={form.fee}
                      onChange={handleChange}
                      placeholder="Leave empty for Free"
                      sx={inputStyle}
                    />
                  </Grid>
                </Grid>

                <TextField
                  label="Venue"
                  name="venue"
                  value={form.venue}
                  onChange={handleChange}
                  sx={inputStyle}
                />

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Organizer Name"
                      name="organizerName"
                      value={form.organizerName}
                      onChange={handleChange}
                      sx={inputStyle}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Organizer Phone *"
                      name="organizerPhone"
                      value={form.organizerPhone}
                      onChange={handleChange}
                      required
                      sx={inputStyle}
                    />
                  </Grid>
                </Grid>

                <TextField
                  label="Registration Link *"
                  name="registrationLink"
                  value={form.registrationLink}
                  onChange={handleChange}
                  required
                  sx={inputStyle}
                />

                <TextField
                  label="Description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  sx={inputStyle}
                />

                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{
                    py: 1.6,
                    borderRadius: 3,
                    background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
                    boxShadow: "0 8px 20px -4px rgba(99, 102, 241, 0.5)",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: "1rem",
                    textTransform: "none",
                    letterSpacing: "0.01em",
                    color: "#FFFFFF",
                    mt: 1,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background: "linear-gradient(135deg, #4338CA 0%, #6D28D9 100%)",
                      boxShadow: "0 12px 25px -4px rgba(99, 102, 241, 0.7)",
                      transform: "translateY(-2px)"
                    }
                  }}
                >
                  {loading
                    ? (editingEvent ? "Updating Event..." : "Registering Event...")
                    : (editingEvent ? "Save Changes" : "Register Event")}
                </Button>

              </Box>
            </form>
          </Grid>

        </Grid>
      </Box>

      {/* ALERT */}
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={() => setAlert({ ...alert, open: false })}
      >
        <Alert severity={alert.severity} sx={{ borderRadius: 3, fontWeight: 600 }}>
          {alert.message}
        </Alert>
      </Snackbar>

    </Box>
  );
};

export default EventRegistration;