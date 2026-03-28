import React, { useState, useEffect, useMemo, useRef } from "react";
import axios from "axios";

import {
  Drawer,
  Box,
  Typography,
  Avatar,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
  Button,
  Dialog,
  Menu,
  MenuItem,
  IconButton
} from "@mui/material";

import {
  Event as EventIcon,
  Edit,
  Logout,
  History,
  Delete,
  PhotoCamera,
  Close   // ✅ added
} from "@mui/icons-material";

import EventRegistration from "../pages/EventRegistration";

export default function AdminDrawer({ open, onClose }) {

  const fileInputRef = useRef(null);

  const [activeSection, setActiveSection] = useState("dashboard");
  const [events, setEvents] = useState([]);

  const [editOpen, setEditOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null);

  //------------------------------------
  // FETCH EVENTS
  //------------------------------------

  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:8080/events/all");
      console.log("Events 👉", res.data);
      setEvents(res.data || []);
    } catch (err) {
      console.log("Fetch error:", err);
      setEvents([]);
    }
  };

  useEffect(() => {
    if (open) fetchEvents();
  }, [open]);

  //------------------------------------
  // SESSION USER
  //------------------------------------

  const sessionUser = useMemo(() => {
    return JSON.parse(localStorage.getItem("user")) || {};
  }, []);

  const user = useMemo(() => {
    const allUsers =
      JSON.parse(localStorage.getItem("users")) || [];

    return (
      allUsers.find(u => u.email === sessionUser.email)
      || sessionUser
    );
  }, [sessionUser]);

  if (!user) return null;

  const initials =
    user?.name?.charAt(0)?.toUpperCase() || "U";

  //------------------------------------
  // PROFILE PIC
  //------------------------------------

  const saveProfilePic = (image) => {
    const updatedUser = { ...user, profilePic: image };

    localStorage.setItem("user", JSON.stringify(updatedUser));

    const allUsers =
      JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = allUsers.map(u =>
      u.email === updatedUser.email ? updatedUser : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    window.location.reload();
  };

  const handleDeviceImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => saveProfilePic(reader.result);
    reader.readAsDataURL(file);
  };

  const openDevice = () => {
    fileInputRef.current.removeAttribute("capture");
    fileInputRef.current.click();
  };

  //------------------------------------
  // DELETE EVENT
  //------------------------------------

  const deleteEvent = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/events/${id}`);
      fetchEvents();
    } catch (err) {
      console.log(err);
    }
  };

  //------------------------------------
  // EDIT EVENT
  //------------------------------------

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setEditOpen(true);
  };

  const closeEdit = () => {
    setEditOpen(false);
    setSelectedEvent(null);
    fetchEvents();
  };

  //------------------------------------
  // FILTER EVENTS
  //------------------------------------

  const now = new Date();

  const activeEvents = events.filter(e => {
    if (!e?.expireAt) return false;
    return new Date(e.expireAt).getTime() >= now.getTime();
  });

  const expiredEvents = events.filter(e => {
    if (!e?.expireAt) return false;
    return new Date(e.expireAt).getTime() < now.getTime();
  });

  //------------------------------------
  // UI
  //------------------------------------

  return (
    <>
      <Drawer anchor="right" open={open} onClose={onClose}>
        <Box sx={{ width: 900, display: "flex" }}>

          {/* LEFT PANEL */}
          <Box sx={{ width: 320, p: 3 }}>

            <Box textAlign="center">

              <Box sx={{ position: "relative", width: 100, margin: "auto" }}>
                <Avatar
                  src={user.profilePic || ""}
                  sx={{
                    width: 100,
                    height: 100,
                    bgcolor: "#667eea",
                    fontSize: 36
                  }}
                >
                  {!user.profilePic && initials}
                </Avatar>

                <IconButton
                  size="small"
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    bgcolor: "white",
                    boxShadow: 2
                  }}
                >
                  <PhotoCamera fontSize="small" />
                </IconButton>
              </Box>

              <Typography variant="h6" fontWeight="bold" mt={1}>
                {user?.name || "User"}
              </Typography>

              <Typography variant="body2" mt={1}>
                📧 {user.email}
              </Typography>

              <Typography variant="body2">
                📞 {user.phone}
              </Typography>

              <Typography variant="body2">
                🎓 {user.college}
              </Typography>

            </Box>

            <Divider sx={{ my: 2 }} />

            <List>

              <ListItemButton onClick={() => setActiveSection("dashboard")}>
                <ListItemIcon><EventIcon /></ListItemIcon>
                <ListItemText primary="Events Dashboard" />
              </ListItemButton>

              <ListItemButton onClick={() => setActiveSection("edit")}>
                <ListItemIcon><Edit /></ListItemIcon>
                <ListItemText primary="Edit Events" />
              </ListItemButton>

              <ListItemButton onClick={() => setActiveSection("delete")}>
                <ListItemIcon><Delete /></ListItemIcon>
                <ListItemText primary="Delete Events" />
              </ListItemButton>

              <ListItemButton onClick={() => setActiveSection("history")}>
                <ListItemIcon><History /></ListItemIcon>
                <ListItemText primary="Expired Events" />
              </ListItemButton>

              <Divider sx={{ my: 1 }} />

              <ListItemButton onClick={() => {
                localStorage.removeItem("user");
                window.location.href = "/login";
              }}>
                <ListItemIcon>
                  <Logout color="error" />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>

            </List>
          </Box>

          {/* RIGHT PANEL */}
          <Box sx={{ flex: 1, p: 3, overflowY: "auto", position: "relative" }}>

            {/* ❌ CLOSE BUTTON */}
            <IconButton
              onClick={onClose}
              sx={{
                position: "absolute",
                top: 10,
                right: 10
              }}
            >
              <Close />
            </IconButton>

            {/* DASHBOARD */}
            {activeSection === "dashboard" && (
              <>
                <Typography variant="h5" mb={2}>Active Events</Typography>

                {activeEvents.length === 0 ? (
                  <Typography>No Active Events</Typography>
                ) : (
                  activeEvents.map(event => (
                    <Card key={event.id || event._id} sx={{ mb: 2 }}>
                      <CardContent>
                        <Typography fontWeight="bold">
                          {event.title}
                        </Typography>
                        <Typography>{event.venue}</Typography>
                      </CardContent>
                    </Card>
                  ))
                )}
              </>
            )}

            {/* EDIT */}
            {activeSection === "edit" && (
              <>
                <Typography variant="h5" mb={2}>Edit Events</Typography>

                {activeEvents.map(event => (
                  <Card key={event.id || event._id} sx={{ mb: 2 }}>
                    <CardContent>
                      <Typography fontWeight="bold">
                        {event.title}
                      </Typography>
                      <Button
                        variant="contained"
                        sx={{ mt: 1 }}
                        onClick={() => handleEdit(event)}
                      >
                        Edit
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </>
            )}

            {/* DELETE */}
            {activeSection === "delete" && (
              <>
                <Typography variant="h5" mb={2}>Delete Events</Typography>

                {activeEvents.map(event => (
                  <Card key={event.id || event._id} sx={{ mb: 2 }}>
                    <CardContent>
                      <Typography fontWeight="bold">
                        {event.title}
                      </Typography>
                      <Button
                        color="error"
                        variant="contained"
                        sx={{ mt: 1 }}
                        onClick={() => deleteEvent(event.id || event._id)}
                      >
                        Delete
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </>
            )}

            {/* HISTORY */}
            {activeSection === "history" && (
              <>
                <Typography variant="h5" mb={2}>Expired Events</Typography>

                {expiredEvents.length === 0 ? (
                  <Typography>No Expired Events</Typography>
                ) : (
                  expiredEvents.map(event => (
                    <Card key={event.id || event._id} sx={{ mb: 2 }}>
                      <CardContent>
                        <Typography fontWeight="bold">
                          {event.title}
                        </Typography>
                        <Typography color="error">
                          Expired
                        </Typography>
                      </CardContent>
                    </Card>
                  ))
                )}
              </>
            )}

          </Box>
        </Box>
      </Drawer>

      {/* EDIT DIALOG */}
      <Dialog open={editOpen} onClose={closeEdit} maxWidth="md" fullWidth>
        <EventRegistration
          editingEvent={selectedEvent}
          onClose={closeEdit}
          onEventUpdated={fetchEvents}
        />
      </Dialog>

      {/* PROFILE MENU */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={openDevice}>Upload from Device</MenuItem>
      </Menu>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleDeviceImage}
      />
    </>
  );
}