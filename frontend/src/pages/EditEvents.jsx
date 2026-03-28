import React, { useState, useEffect } from "react";
import axios from "axios";
import EventRegistration from "./EventRegistration";

import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CircularProgress
} from "@mui/material";

export default function EditEvents() {

  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8080/events");
      console.log("EVENTS 👉", res.data);
      setEvents(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (event) => {
    console.log("EDIT CLICKED 👉", event);
    setEditingEvent(event);
  };

  const handleClose = () => {
    setEditingEvent(null);
    fetchEvents();
  };

  // 🔥 SHOW EDIT FORM
  if (editingEvent) {
    return (
      <EventRegistration
        editingEvent={editingEvent}
        onClose={handleClose}
        onEventUpdated={fetchEvents}
      />
    );
  }

  // 🔥 SHOW LIST
  return (
    <Box sx={{ p: 5 }}>
      <Typography variant="h4" mb={4}>
        Edit Events
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        events.map((event) => (
          <Card key={event.id || event._id} sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6">
                {event.title}
              </Typography>

              <Typography>
                {event.category}
              </Typography>

              <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={() => handleEditClick(event)}
              >
                Edit
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
}
