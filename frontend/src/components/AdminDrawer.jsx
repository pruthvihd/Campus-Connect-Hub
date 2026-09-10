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
  Button,
  Dialog,
  Menu,
  MenuItem,
  IconButton,
  Chip,
  Stack,
  Grid
} from "@mui/material";

import {
  Event as EventIcon,
  Edit,
  Logout,
  History,
  Delete,
  PhotoCamera,
  Close,
  AutoAwesome,
  EventNote
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
    user?.name?.charAt(0)?.toUpperCase() || "A";

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
    if (fileInputRef.current) {
      fileInputRef.current.removeAttribute("capture");
      fileInputRef.current.click();
    }
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
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            backgroundColor: "rgba(11, 15, 25, 0.94)",
            backdropFilter: "blur(24px) saturate(180%)",
            color: "#FFFFFF",
            fontFamily: "'Plus Jakarta Sans', sans-serif"
          }
        }}
      >
        <Box sx={{ width: { xs: "100vw", sm: 820, md: 940 }, display: "flex", minHeight: "100vh" }}>

          {/* LEFT SIDEBAR PANEL */}
          <Box
            sx={{
              width: 320,
              p: 3,
              background: "rgba(15, 23, 42, 0.65)",
              backdropFilter: "blur(20px)",
              borderRight: "1px solid rgba(255, 255, 255, 0.15)",
              display: "flex",
              flexDirection: "column"
            }}
          >

            {/* PROFILE SECTION */}
            <Box textAlign="center" pt={1}>

              <Box sx={{ position: "relative", width: 100, margin: "auto" }}>
                <Avatar
                  src={user.profilePic || ""}
                  sx={{
                    width: 100,
                    height: 100,
                    bgcolor: "transparent",
                    background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
                    color: "#FFFFFF",
                    fontSize: 38,
                    fontWeight: 800,
                    boxShadow: "0 0 24px rgba(99, 102, 241, 0.5)",
                    border: "2.5px solid rgba(255, 255, 255, 0.9)"
                  }}
                >
                  {!user.profilePic && initials}
                </Avatar>

                <IconButton
                  size="small"
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                  sx={{
                    position: "absolute",
                    bottom: 2,
                    right: 2,
                    bgcolor: "#6366F1",
                    color: "#FFFFFF",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                    border: "2px solid #0F172A",
                    "&:hover": { bgcolor: "#4F46E5" }
                  }}
                >
                  <PhotoCamera sx={{ fontSize: 16 }} />
                </IconButton>
              </Box>

              <Typography
                sx={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 800,
                  fontSize: "1.25rem",
                  color: "#FFFFFF",
                  mt: 2
                }}
              >
                {user?.name || "Admin"}
              </Typography>

              <Stack spacing={0.6} mt={1.5} alignItems="center">
                {user.email && (
                  <Typography sx={{ fontSize: "0.825rem", color: "#CBD5E1", fontWeight: 500 }}>
                    📧 {user.email}
                  </Typography>
                )}

                {user.phone && (
                  <Typography sx={{ fontSize: "0.825rem", color: "#CBD5E1", fontWeight: 500 }}>
                    📞 {user.phone}
                  </Typography>
                )}

                {user.college && (
                  <Typography sx={{ fontSize: "0.825rem", color: "#CBD5E1", fontWeight: 500 }}>
                    🎓 {user.college}
                  </Typography>
                )}
              </Stack>

            </Box>

            <Divider sx={{ my: 3, borderColor: "rgba(255, 255, 255, 0.15)" }} />

            {/* NAV MENU LIST */}
            <Typography
              sx={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                fontSize: "0.75rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#94A3B8",
                mb: 1.5,
                px: 1
              }}
            >
              Admin Controls
            </Typography>

            <List sx={{ display: "flex", flexDirection: "column", gap: 1 }}>

              <ListItemButton
                onClick={() => setActiveSection("dashboard")}
                sx={{
                  borderRadius: 3,
                  py: 1.2,
                  px: 2,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  background: activeSection === "dashboard"
                    ? "linear-gradient(135deg, rgba(99, 102, 241, 0.45) 0%, rgba(139, 92, 246, 0.35) 100%)"
                    : "transparent",
                  border: activeSection === "dashboard"
                    ? "1px solid rgba(255, 255, 255, 0.3)"
                    : "1px solid transparent",
                  "&:hover": { background: "rgba(255, 255, 255, 0.12)" }
                }}
              >
                <ListItemIcon sx={{ minWidth: 38, color: activeSection === "dashboard" ? "#818CF8" : "#94A3B8" }}>
                  <EventIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Active Events"
                  primaryTypographyProps={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: activeSection === "dashboard" ? 700 : 600,
                    fontSize: "0.925rem",
                    color: "#FFFFFF"
                  }}
                />
                <Chip
                  label={activeEvents.length}
                  size="small"
                  sx={{
                    height: 22,
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    background: "rgba(99, 102, 241, 0.3)",
                    color: "#E0E7FF"
                  }}
                />
              </ListItemButton>

              <ListItemButton
                onClick={() => setActiveSection("edit")}
                sx={{
                  borderRadius: 3,
                  py: 1.2,
                  px: 2,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  background: activeSection === "edit"
                    ? "linear-gradient(135deg, rgba(99, 102, 241, 0.45) 0%, rgba(139, 92, 246, 0.35) 100%)"
                    : "transparent",
                  border: activeSection === "edit"
                    ? "1px solid rgba(255, 255, 255, 0.3)"
                    : "1px solid transparent",
                  "&:hover": { background: "rgba(255, 255, 255, 0.12)" }
                }}
              >
                <ListItemIcon sx={{ minWidth: 38, color: activeSection === "edit" ? "#38BDF8" : "#94A3B8" }}>
                  <Edit />
                </ListItemIcon>
                <ListItemText
                  primary="Edit Events"
                  primaryTypographyProps={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: activeSection === "edit" ? 700 : 600,
                    fontSize: "0.925rem",
                    color: "#FFFFFF"
                  }}
                />
              </ListItemButton>

              <ListItemButton
                onClick={() => setActiveSection("delete")}
                sx={{
                  borderRadius: 3,
                  py: 1.2,
                  px: 2,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  background: activeSection === "delete"
                    ? "linear-gradient(135deg, rgba(239, 68, 68, 0.4) 0%, rgba(220, 38, 38, 0.3) 100%)"
                    : "transparent",
                  border: activeSection === "delete"
                    ? "1px solid rgba(239, 68, 68, 0.4)"
                    : "1px solid transparent",
                  "&:hover": { background: "rgba(239, 68, 68, 0.15)" }
                }}
              >
                <ListItemIcon sx={{ minWidth: 38, color: activeSection === "delete" ? "#F87171" : "#94A3B8" }}>
                  <Delete />
                </ListItemIcon>
                <ListItemText
                  primary="Delete Events"
                  primaryTypographyProps={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: activeSection === "delete" ? 700 : 600,
                    fontSize: "0.925rem",
                    color: "#FFFFFF"
                  }}
                />
              </ListItemButton>

              <ListItemButton
                onClick={() => setActiveSection("history")}
                sx={{
                  borderRadius: 3,
                  py: 1.2,
                  px: 2,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  background: activeSection === "history"
                    ? "linear-gradient(135deg, rgba(99, 102, 241, 0.45) 0%, rgba(139, 92, 246, 0.35) 100%)"
                    : "transparent",
                  border: activeSection === "history"
                    ? "1px solid rgba(255, 255, 255, 0.3)"
                    : "1px solid transparent",
                  "&:hover": { background: "rgba(255, 255, 255, 0.12)" }
                }}
              >
                <ListItemIcon sx={{ minWidth: 38, color: activeSection === "history" ? "#A78BFA" : "#94A3B8" }}>
                  <History />
                </ListItemIcon>
                <ListItemText
                  primary="Expired Events"
                  primaryTypographyProps={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: activeSection === "history" ? 700 : 600,
                    fontSize: "0.925rem",
                    color: "#FFFFFF"
                  }}
                />
                <Chip
                  label={expiredEvents.length}
                  size="small"
                  sx={{
                    height: 22,
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    background: "rgba(255, 255, 255, 0.15)",
                    color: "#CBD5E1"
                  }}
                />
              </ListItemButton>

              <Divider sx={{ my: 1.5, borderColor: "rgba(255, 255, 255, 0.15)" }} />

              <ListItemButton
                onClick={() => {
                  localStorage.removeItem("user");
                  window.location.href = "/#/login";
                }}
                sx={{
                  borderRadius: 3,
                  py: 1.2,
                  px: 2,
                  "&:hover": { background: "rgba(239, 68, 68, 0.15)" }
                }}
              >
                <ListItemIcon sx={{ minWidth: 38 }}>
                  <Logout sx={{ color: "#F87171" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Logout"
                  primaryTypographyProps={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.925rem",
                    color: "#F87171"
                  }}
                />
              </ListItemButton>

            </List>
          </Box>

          {/* RIGHT PANEL CONTENT */}
          <Box sx={{ flex: 1, p: { xs: 3, md: 4 }, overflowY: "auto", position: "relative" }}>

            {/* CLOSE BUTTON */}
            <IconButton
              onClick={onClose}
              sx={{
                position: "absolute",
                top: 20,
                right: 20,
                color: "#FFFFFF",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.18)",
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.25)" }
              }}
            >
              <Close />
            </IconButton>

            {/* DASHBOARD */}
            {activeSection === "dashboard" && (
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3.5 }}>
                  <AutoAwesome sx={{ color: "#818CF8", fontSize: 28 }} />
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 800,
                      fontSize: "1.75rem",
                      color: "#FFFFFF"
                    }}
                  >
                    Active Events Dashboard
                  </Typography>
                </Box>

                {activeEvents.length === 0 ? (
                  <Card
                    elevation={0}
                    sx={{
                      p: 5,
                      textAlign: "center",
                      borderRadius: 4,
                      background: "rgba(15, 23, 42, 0.55)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(255, 255, 255, 0.2)"
                    }}
                  >
                    <EventNote sx={{ fontSize: 52, color: "#818CF8", mb: 1.5 }} />
                    <Typography sx={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "1.1rem" }}>
                      No Active Events Currently
                    </Typography>
                  </Card>
                ) : (
                  <Grid container spacing={2.5}>
                    {activeEvents.map(event => (
                      <Grid item xs={12} sm={6} key={event.id || event._id}>
                        <Card
                          elevation={0}
                          sx={{
                            height: "100%",
                            borderRadius: 4,
                            background: "rgba(15, 23, 42, 0.55)",
                            backdropFilter: "blur(24px) saturate(180%)",
                            border: "1px solid rgba(255, 255, 255, 0.22)",
                            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.35)",
                            p: 2.5,
                            display: "flex",
                            flexDirection: "column"
                          }}
                        >
                          <Typography
                            sx={{
                              fontFamily: "'Plus Jakarta Sans', sans-serif",
                              fontWeight: 800,
                              fontSize: "1.15rem",
                              color: "#FFFFFF",
                              mb: 1.5
                            }}
                          >
                            {event.title}
                          </Typography>

                          <Stack spacing={1} mb={2}>
                            {event.category && (
                              <Typography sx={{ fontSize: "0.85rem", color: "#CBD5E1", fontWeight: 600 }}>
                                🏷️ Category: {event.category}
                              </Typography>
                            )}
                            {event.venue && (
                              <Typography sx={{ fontSize: "0.85rem", color: "#CBD5E1", fontWeight: 600 }}>
                                📍 Venue: {event.venue}
                              </Typography>
                            )}
                            {event.expireAt && (
                              <Typography sx={{ fontSize: "0.85rem", color: "#CBD5E1", fontWeight: 600 }}>
                                📅 Date: {new Date(event.expireAt).toLocaleDateString()}
                              </Typography>
                            )}
                          </Stack>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Box>
            )}

            {/* EDIT EVENTS */}
            {activeSection === "edit" && (
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 800,
                    fontSize: "1.75rem",
                    color: "#FFFFFF",
                    mb: 3.5
                  }}
                >
                  Edit Registered Events
                </Typography>

                <Grid container spacing={2.5}>
                  {activeEvents.map(event => (
                    <Grid item xs={12} sm={6} key={event.id || event._id}>
                      <Card
                        elevation={0}
                        sx={{
                          borderRadius: 4,
                          background: "rgba(15, 23, 42, 0.55)",
                          backdropFilter: "blur(24px) saturate(180%)",
                          border: "1px solid rgba(255, 255, 255, 0.22)",
                          p: 2.5
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontWeight: 800,
                            fontSize: "1.1rem",
                            color: "#FFFFFF",
                            mb: 1
                          }}
                        >
                          {event.title}
                        </Typography>

                        <Typography sx={{ fontSize: "0.85rem", color: "#CBD5E1", mb: 2 }}>
                          {event.category} | {event.venue || "Campus"}
                        </Typography>

                        <Button
                          variant="contained"
                          startIcon={<Edit sx={{ fontSize: 18 }} />}
                          onClick={() => handleEdit(event)}
                          sx={{
                            py: 1,
                            px: 2.5,
                            borderRadius: 2.5,
                            background: "linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)",
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontWeight: 700,
                            textTransform: "none",
                            boxShadow: "0 4px 14px rgba(79, 70, 229, 0.4)"
                          }}
                        >
                          Edit Event Details
                        </Button>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            {/* DELETE EVENTS */}
            {activeSection === "delete" && (
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 800,
                    fontSize: "1.75rem",
                    color: "#FFFFFF",
                    mb: 3.5
                  }}
                >
                  Delete Active Events
                </Typography>

                <Grid container spacing={2.5}>
                  {activeEvents.map(event => (
                    <Grid item xs={12} sm={6} key={event.id || event._id}>
                      <Card
                        elevation={0}
                        sx={{
                          borderRadius: 4,
                          background: "rgba(15, 23, 42, 0.55)",
                          backdropFilter: "blur(24px) saturate(180%)",
                          border: "1px solid rgba(239, 68, 68, 0.3)",
                          p: 2.5
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontWeight: 800,
                            fontSize: "1.1rem",
                            color: "#FFFFFF",
                            mb: 1
                          }}
                        >
                          {event.title}
                        </Typography>

                        <Typography sx={{ fontSize: "0.85rem", color: "#CBD5E1", mb: 2 }}>
                          {event.category}
                        </Typography>

                        <Button
                          variant="contained"
                          color="error"
                          startIcon={<Delete sx={{ fontSize: 18 }} />}
                          onClick={() => deleteEvent(event.id || event._id)}
                          sx={{
                            py: 1,
                            px: 2.5,
                            borderRadius: 2.5,
                            background: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontWeight: 700,
                            textTransform: "none",
                            boxShadow: "0 4px 14px rgba(239, 68, 68, 0.4)"
                          }}
                        >
                          Delete Event
                        </Button>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            {/* HISTORY */}
            {activeSection === "history" && (
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 800,
                    fontSize: "1.75rem",
                    color: "#FFFFFF",
                    mb: 3.5
                  }}
                >
                  Expired Events Log
                </Typography>

                {expiredEvents.length === 0 ? (
                  <Card
                    elevation={0}
                    sx={{
                      p: 5,
                      textAlign: "center",
                      borderRadius: 4,
                      background: "rgba(15, 23, 42, 0.55)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(255, 255, 255, 0.2)"
                    }}
                  >
                    <History sx={{ fontSize: 52, color: "#94A3B8", mb: 1.5 }} />
                    <Typography sx={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}>
                      No Expired Events Found
                    </Typography>
                  </Card>
                ) : (
                  <Grid container spacing={2.5}>
                    {expiredEvents.map(event => (
                      <Grid item xs={12} sm={6} key={event.id || event._id}>
                        <Card
                          elevation={0}
                          sx={{
                            borderRadius: 4,
                            background: "rgba(15, 23, 42, 0.55)",
                            backdropFilter: "blur(24px) saturate(180%)",
                            border: "1px solid rgba(255, 255, 255, 0.18)",
                            p: 2.5
                          }}
                        >
                          <Typography
                            sx={{
                              fontFamily: "'Plus Jakarta Sans', sans-serif",
                              fontWeight: 800,
                              fontSize: "1.1rem",
                              color: "#FFFFFF",
                              mb: 1
                            }}
                          >
                            {event.title}
                          </Typography>

                          <Chip
                            label="Expired"
                            size="small"
                            sx={{
                              background: "rgba(239, 68, 68, 0.2)",
                              border: "1px solid rgba(239, 68, 68, 0.4)",
                              color: "#F87171",
                              fontWeight: 700,
                              fontSize: "0.75rem"
                            }}
                          />
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Box>
            )}

          </Box>
        </Box>
      </Drawer>

      {/* EDIT DIALOG */}
      <Dialog
        open={editOpen}
        onClose={closeEdit}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 4, backgroundColor: "transparent", overflow: "hidden" }
        }}
      >
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
        PaperProps={{
          sx: {
            backgroundColor: "#0F172A",
            color: "#FFFFFF",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            borderRadius: 3
          }
        }}
      >
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            openDevice();
          }}
          sx={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, py: 1.2, px: 2.5 }}
        >
          Upload Profile Picture from Device
        </MenuItem>
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