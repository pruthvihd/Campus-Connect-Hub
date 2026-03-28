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
  CardMedia
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
  CloudUpload
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
    { value: "hackathon", label: "Hackathon", icon: <Code /> },
    { value: "internship", label: "Internship", icon: <Work /> },
    { value: "webinars", label: "Webinars", icon: <VideoCall /> },
    { value: "workshop", label: "Workshop", icon: <School /> },
    { value: "cultural", label: "Cultural Events", icon: <TheaterComedy /> },
    { value: "sports", label: "Sports", icon: <SportsBaseball /> },
    { value: "offcampus", label: "Off Campus Hiring", icon: <BusinessCenter /> },
    { value: "mentorship", label: "Mentorship", icon: <Psychology /> },
    { value: "competition", label: "Other Competitions", icon: <EmojiEvents /> }
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

  /* =======================================================
     UI
  ======================================================= */
  return (
    <Box sx={{ maxHeight: "80vh", overflow: "auto" }}>

      {/* HEADER */}
      <Box
        sx={{
          background: "#667eea",
          p: 3,
          color: "white",
          position: "relative"
        }}
      >
        <Typography variant="h4" align="center" fontWeight="700">
          {editingEvent ? "Edit Event" : "Register New Event"}
        </Typography>

        {/* ❌ CLOSE BUTTON FIXED */}
        <Button
          onClick={() => navigate("/menu")}
          sx={{
            position: "absolute",
            right: 16,
            top: 16,
            color: "white",
            minWidth: "auto"
          }}
        >
          <Close />
        </Button>
      </Box>

      {/* FORM */}
      <Box sx={{ p: 4 }}>
        <Grid container spacing={4}>

          {/* IMAGE UPLOAD */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                height: 300,
                borderRadius: 2,
                border: "2px dashed #bbb",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer"
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
                <Box sx={{ textAlign: "center" }}>
                  <CloudUpload sx={{ fontSize: 55, color: "#888" }} />
                  <Typography>Upload Event Image</Typography>
                </Box>
              )}
            </Card>
          </Grid>

          {/* FORM FIELDS */}
          <Grid item xs={12} md={6}>
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

                <TextField label="Event Name *" name="title" value={form.title} onChange={handleChange} required />

                <TextField select label="Category *" name="category" value={form.category} onChange={handleChange} required>
                  {eventCategories.map(cat => (
                    <MenuItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  type="date"
                  label="Event Date *"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  required
                />

                <TextField label="Venue" name="venue" value={form.venue} onChange={handleChange} />
                <TextField label="Organizer Name" name="organizerName" value={form.organizerName} onChange={handleChange} />
                <TextField label="Organizer Phone *" name="organizerPhone" value={form.organizerPhone} onChange={handleChange} required />
                <TextField label="Registration Link *" name="registrationLink" value={form.registrationLink} onChange={handleChange} required />
                <TextField label="Description" name="description" value={form.description} onChange={handleChange} multiline rows={3} />
                <TextField label="Fee" name="fee" value={form.fee} onChange={handleChange} placeholder="Leave empty for Free" />

                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{
                    py: 1.3,
                    fontWeight: "600",
                    background: "#667eea",
                    "&:hover": { background: "#5a6fd8" }
                  }}
                >
                  {loading
                    ? (editingEvent ? "Updating..." : "Registering...")
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
        <Alert severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>

    </Box>
  );
};

export default EventRegistration;