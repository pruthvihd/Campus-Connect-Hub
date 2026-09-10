import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import bgImage from "../assets/handshake.png";
import Footer from "../components/Footer";
import AboutPage from "./AboutPage";
import FeaturesPage from "./FeaturesPage";
import ContactPage from "./ContactPage";

import {
  Box,
  Button,
  Typography,
  Paper,
  Grid,
  Container,
  Card,
  CardContent,
  Chip,
  Dialog,
  Avatar,
  IconButton,
  Tooltip,
  Stack
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
  Add,
  Close,
  CalendarToday,
  Place,
  Payments,
  Person,
  LocalPhone,
  ArrowForward,
  AutoAwesome,
  EventNote
} from "@mui/icons-material";

import EventRegistration from "./EventRegistration";
import AdminDrawer from "../components/AdminDrawer";

export default function MenuPage() {

  const [activeCategory, setActiveCategory] = useState("hackathon");
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [adminOpen, setAdminOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeSection, setActiveSection] = useState(null);

  const eventsRef = useRef(null);
  const user = JSON.parse(localStorage.getItem("user")) || {};

  //---------------------------------------
  // ✅ API FETCH
  //---------------------------------------

  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:8080/events/active");
      setRegisteredEvents(res.data);
    } catch (err) {
      console.log("Error fetching events:", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  //---------------------------------------
  // MENU ITEMS
  //---------------------------------------

  const menuItems = [
    { id: "hackathon", label: "Hackathon", icon: <Code />, color: "#6366F1" },
    { id: "internship", label: "Internship", icon: <Work />, color: "#06B6D4" },
    { id: "webinars", label: "Webinars", icon: <VideoCall />, color: "#3B82F6" },
    { id: "workshop", label: "Workshop", icon: <School />, color: "#10B981" },
    { id: "cultural", label: "Cultural Events", icon: <TheaterComedy />, color: "#EC4899" },
    { id: "sports", label: "Sports", icon: <SportsBaseball />, color: "#F59E0B" },
    { id: "offcampus", label: "Off Campus Hiring", icon: <BusinessCenter />, color: "#8B5CF6" },
    { id: "mentorship", label: "Mentorship", icon: <Psychology />, color: "#14B8A6" },
    { id: "competition", label: "Other Competitions", icon: <EmojiEvents />, color: "#F43F5E" }
  ];

  //---------------------------------------
  // ✅ CATEGORY MATCH
  //---------------------------------------

  const updatedMenuItems = menuItems.map((item) => ({
    ...item,
    count: registeredEvents.filter(
      (event) =>
        event.category?.toLowerCase() === item.id?.toLowerCase()
    ).length
  }));

  const currentContent = registeredEvents.filter(
    (event) =>
      event.category?.toLowerCase() === activeCategory?.toLowerCase()
  );

  const activeCategoryObj = updatedMenuItems.find((i) => i.id === activeCategory);

  //---------------------------------------

  const handleCategoryClick = (id) => {
    setActiveCategory(id);
    setTimeout(() => {
      eventsRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleEventRegistered = () => {
    fetchEvents();
  };

  const userInitial = user?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        backgroundColor: "#0B0F19",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
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

        {/* HERO HEADER GLASS */}
        <Box
          sx={{
            background: "rgba(15, 23, 42, 0.55)",
            backdropFilter: "blur(20px) saturate(180%)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.18)",
            py: { xs: 4, md: 5 },
            px: 2,
            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.3)"
          }}
        >
          <Container maxWidth="xl" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box>
              <Typography
                component="h1"
                sx={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 800,
                  fontSize: { xs: "2.4rem", sm: "3.4rem", md: "4.2rem" },
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                  background: "linear-gradient(135deg, #FFFFFF 30%, #A5B4FC 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 1.5,
                  filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.4))"
                }}
              >
                Campus Connect Hub
              </Typography>

              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1.5,
                  py: 0.75,
                  px: 2,
                  borderRadius: "50px",
                  backgroundColor: "rgba(99, 102, 241, 0.2)",
                  border: "1px solid rgba(165, 180, 252, 0.3)",
                  backdropFilter: "blur(12px)"
                }}
              >
                <AutoAwesome sx={{ fontSize: 18, color: "#818CF8" }} />
                <Typography
                  sx={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: { xs: "0.825rem", sm: "0.95rem" },
                    fontWeight: 600,
                    color: "#E0E7FF",
                    letterSpacing: "0.02em"
                  }}
                >
                  Learn 📚 | Network 🌐 | Innovate 🚀 | Repeat 🔄
                </Typography>
              </Box>
            </Box>

            <Tooltip title="Admin Dashboard Profile" arrow>
              <Avatar
                src={user?.profilePic || ""}
                sx={{
                  bgcolor: "transparent",
                  background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
                  color: "#FFFFFF",
                  cursor: "pointer",
                  width: { xs: 48, md: 56 },
                  height: { xs: 48, md: 56 },
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  boxShadow: "0 0 20px rgba(99, 102, 241, 0.5)",
                  border: "2.5px solid rgba(255, 255, 255, 0.9)",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    transform: "scale(1.08)",
                    boxShadow: "0 0 28px rgba(139, 92, 246, 0.7)"
                  }
                }}
                onClick={() => setAdminOpen(true)}
              >
                {!user?.profilePic && userInitial}
              </Avatar>
            </Tooltip>
          </Container>
        </Box>

        {/* MAIN BODY */}
        <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 } }}>
          <Grid container spacing={4}>

            {/* LEFT SIDEBAR PANEL GLASS */}
            <Grid item xs={12} md={3.5} lg={3}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  background: "rgba(15, 23, 42, 0.5)",
                  backdropFilter: "blur(24px) saturate(180%)",
                  boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
                  border: "1px solid rgba(255, 255, 255, 0.22)",
                  position: "sticky",
                  top: 24
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 800,
                    fontSize: "0.8rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#CBD5E1",
                    mb: 2.5,
                    px: 0.5
                  }}
                >
                  Event Categories
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {updatedMenuItems.map((item) => {
                    const isActive = activeCategory === item.id;
                    return (
                      <Button
                        key={item.id}
                        fullWidth
                        startIcon={
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              p: 0.8,
                              borderRadius: 2,
                              color: "#FFFFFF",
                              backgroundColor: isActive ? item.color : "rgba(255, 255, 255, 0.12)",
                              transition: "all 0.25s ease"
                            }}
                          >
                            {item.icon}
                          </Box>
                        }
                        onClick={() => handleCategoryClick(item.id)}
                        sx={{
                          justifyContent: "flex-start",
                          py: 1.2,
                          px: 1.5,
                          borderRadius: 3,
                          transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontWeight: isActive ? 700 : 600,
                          fontSize: "0.925rem",
                          color: "#FFFFFF",
                          background: isActive
                            ? "linear-gradient(135deg, rgba(99, 102, 241, 0.45) 0%, rgba(139, 92, 246, 0.35) 100%)"
                            : "transparent",
                          border: isActive
                            ? "1px solid rgba(255, 255, 255, 0.35)"
                            : "1px solid transparent",
                          boxShadow: isActive ? "0 4px 15px rgba(99, 102, 241, 0.3)" : "none",
                          "&:hover": {
                            transform: "translateX(4px)",
                            background: "rgba(255, 255, 255, 0.15)",
                            color: "#FFFFFF"
                          }
                        }}
                      >
                        <Typography
                          sx={{
                            flexGrow: 1,
                            textAlign: "left",
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontWeight: isActive ? 700 : 600,
                            fontSize: "0.925rem"
                          }}
                        >
                          {item.label}
                        </Typography>

                        <Chip
                          label={item.count}
                          size="small"
                          sx={{
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontWeight: 700,
                            fontSize: "0.75rem",
                            height: 24,
                            borderRadius: "12px",
                            background: isActive ? item.color : "rgba(255, 255, 255, 0.2)",
                            color: "#FFFFFF",
                            transition: "all 0.25s ease"
                          }}
                        />
                      </Button>
                    );
                  })}
                </Box>

                <Box mt={3.5}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<Add sx={{ fontSize: 20 }} />}
                    onClick={() => setRegistrationOpen(true)}
                    sx={{
                      py: 1.6,
                      borderRadius: 3,
                      background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
                      boxShadow: "0 8px 24px -4px rgba(99, 102, 241, 0.6)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      textTransform: "none",
                      letterSpacing: "0.01em",
                      color: "#FFFFFF",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&:hover": {
                        background: "linear-gradient(135deg, #4338CA 0%, #6D28D9 100%)",
                        boxShadow: "0 12px 28px -4px rgba(99, 102, 241, 0.8)",
                        transform: "translateY(-2px)"
                      }
                    }}
                  >
                    Register New Event
                  </Button>
                </Box>
              </Paper>
            </Grid>

            {/* EVENTS GRID */}
            <Grid item xs={12} md={8.5} lg={9} ref={eventsRef}>

              {/* SECTION HEADER */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 3.5,
                  pb: 1.5,
                  borderBottom: "1px solid rgba(255, 255, 255, 0.18)"
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 800,
                      fontSize: { xs: "1.6rem", md: "2.1rem" },
                      color: "#FFFFFF",
                      letterSpacing: "-0.02em",
                      filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.4))"
                    }}
                  >
                    {activeCategoryObj?.label}
                  </Typography>

                  <Chip
                    label={`${currentContent.length} Active`}
                    size="small"
                    sx={{
                      background: "rgba(99, 102, 241, 0.3)",
                      border: "1px solid rgba(165, 180, 252, 0.4)",
                      color: "#E0E7FF",
                      fontWeight: 700,
                      fontSize: "0.8rem",
                      borderRadius: "12px",
                      py: 0.5,
                      backdropFilter: "blur(8px)"
                    }}
                  />
                </Box>
              </Box>

              {/* CONTENT LIST */}
              {currentContent.length > 0 ? (
                <Grid container spacing={3}>
                  {currentContent.map((item, index) => (
                    <Grid item xs={12} sm={6} key={index}>

                      <Card
                        elevation={0}
                        sx={{
                          borderRadius: 4,
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          background: "rgba(15, 23, 42, 0.55)",
                          backdropFilter: "blur(24px) saturate(180%)",
                          border: "1px solid rgba(255, 255, 255, 0.25)",
                          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
                          transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                          overflow: "hidden",
                          "&:hover": {
                            transform: "translateY(-8px)",
                            boxShadow: "0 16px 40px 0 rgba(99, 102, 241, 0.35)",
                            border: "1px solid rgba(165, 180, 252, 0.5)"
                          }
                        }}
                      >

                        {/* IMAGE CONTAINER */}
                        {item.image && (
                          <Box
                            sx={{
                              height: 190,
                              position: "relative",
                              overflow: "hidden",
                              cursor: "pointer",
                              "&:hover img": {
                                transform: "scale(1.06)"
                              }
                            }}
                            onClick={() => setSelectedImage(item.image)}
                          >
                            <img
                              src={item.image}
                              alt={item.title}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                transition: "transform 0.4s ease"
                              }}
                            />
                            
                            {/* OVERLAY BADGE */}
                            <Box
                              sx={{
                                position: "absolute",
                                top: 12,
                                right: 12,
                                background: "rgba(15, 23, 42, 0.8)",
                                backdropFilter: "blur(12px)",
                                color: "#FFFFFF",
                                fontWeight: 700,
                                fontSize: "0.75rem",
                                px: 1.5,
                                py: 0.5,
                                borderRadius: "20px",
                                border: "1px solid rgba(255, 255, 255, 0.25)",
                                letterSpacing: "0.02em"
                              }}
                            >
                              {activeCategoryObj?.label}
                            </Box>
                          </Box>
                        )}

                        {/* CONTENT CONTAINER */}
                        <CardContent
                          sx={{
                            p: 3,
                            display: "flex",
                            flexDirection: "column",
                            flexGrow: 1
                          }}
                        >
                          <Typography
                            sx={{
                              fontFamily: "'Plus Jakarta Sans', sans-serif",
                              fontWeight: 800,
                              fontSize: "1.25rem",
                              color: "#FFFFFF",
                              mb: 2,
                              lineHeight: 1.3
                            }}
                          >
                            {item.title}
                          </Typography>

                          <Stack spacing={1.2} mb={2}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                              <CalendarToday sx={{ fontSize: 17, color: "#818CF8" }} />
                              <Typography
                                sx={{
                                  fontSize: "0.875rem",
                                  fontWeight: 600,
                                  color: "#E2E8F0"
                                }}
                              >
                                Date: {new Date(item.expireAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                              </Typography>
                            </Box>

                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                              <Payments sx={{ fontSize: 17, color: "#34D399" }} />
                              <Typography
                                sx={{
                                  fontSize: "0.875rem",
                                  fontWeight: 600,
                                  color: "#E2E8F0"
                                }}
                              >
                                Fee: {item.fee || "Free"}
                              </Typography>
                            </Box>

                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                              <Place sx={{ fontSize: 17, color: "#F87171" }} />
                              <Typography
                                sx={{
                                  fontSize: "0.875rem",
                                  fontWeight: 600,
                                  color: "#E2E8F0"
                                }}
                              >
                                Venue: {item.venue}
                              </Typography>
                            </Box>

                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                              <Person sx={{ fontSize: 17, color: "#A78BFA" }} />
                              <Typography
                                sx={{
                                  fontSize: "0.875rem",
                                  fontWeight: 600,
                                  color: "#E2E8F0"
                                }}
                              >
                                Organizer: {item.organizerName}
                              </Typography>
                            </Box>

                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                              <LocalPhone sx={{ fontSize: 17, color: "#FBBF24" }} />
                              <Typography
                                sx={{
                                  fontSize: "0.875rem",
                                  fontWeight: 600,
                                  color: "#E2E8F0"
                                }}
                              >
                                Contact: {item.organizerPhone}
                              </Typography>
                            </Box>
                          </Stack>

                          {item.description && (
                            <Typography
                              sx={{
                                pt: 1.5,
                                borderTop: "1px solid rgba(255, 255, 255, 0.15)",
                                color: "#CBD5E1",
                                fontSize: "0.875rem",
                                lineHeight: 1.6,
                                mb: 2,
                                flexGrow: 1
                              }}
                            >
                              {item.description}
                            </Typography>
                          )}

                          {/* ACTION BUTTON */}
                          {item.registrationLink && (
                            <Box mt="auto" pt={1}>
                              <Button
                                component="a"
                                href={item.registrationLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                fullWidth
                                variant="contained"
                                endIcon={<ArrowForward sx={{ fontSize: 18 }} />}
                                sx={{
                                  py: 1.2,
                                  borderRadius: 2.5,
                                  background: "linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)",
                                  color: "#FFFFFF",
                                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                                  fontWeight: 700,
                                  fontSize: "0.875rem",
                                  textTransform: "none",
                                  border: "1px solid rgba(255, 255, 255, 0.2)",
                                  boxShadow: "0 4px 15px rgba(79, 70, 229, 0.4)",
                                  transition: "all 0.25s ease",
                                  "&:hover": {
                                    background: "linear-gradient(135deg, #4338CA 0%, #4F46E5 100%)",
                                    boxShadow: "0 6px 20px rgba(79, 70, 229, 0.6)",
                                    transform: "translateY(-1px)"
                                  }
                                }}
                              >
                                Register Here
                              </Button>
                            </Box>
                          )}
                        </CardContent>
                      </Card>

                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Paper
                  elevation={0}
                  sx={{
                    py: 8,
                    px: 3,
                    textAlign: "center",
                    borderRadius: 4,
                    background: "rgba(15, 23, 42, 0.55)",
                    backdropFilter: "blur(24px)",
                    border: "1px solid rgba(255, 255, 255, 0.22)"
                  }}
                >
                  <EventNote sx={{ fontSize: 54, color: "#818CF8", mb: 2 }} />
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 700,
                      color: "#FFFFFF",
                      mb: 1
                    }}
                  >
                    No active events listed for {activeCategoryObj?.label}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#CBD5E1",
                      fontSize: "0.95rem",
                      mb: 3,
                      maxWidth: 420,
                      mx: "auto"
                    }}
                  >
                    Check back soon or register a new event to showcase it to students across campus!
                  </Typography>

                  <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => setRegistrationOpen(true)}
                    sx={{
                      py: 1.2,
                      px: 3,
                      borderRadius: 3,
                      background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 700,
                      textTransform: "none"
                    }}
                  >
                    Register New Event
                  </Button>
                </Paper>
              )}

            </Grid>

          </Grid>
        </Container>

        {/* FULLSCREEN IMAGE POPUP */}
        <Dialog
          open={Boolean(selectedImage)}
          onClose={() => setSelectedImage(null)}
          fullScreen
          PaperProps={{
            style: { backgroundColor: "rgba(11, 15, 25, 0.96)", backdropFilter: "blur(12px)" }
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 2
            }}
          >
            {/* CLOSE BUTTON */}
            <IconButton
              onClick={() => setSelectedImage(null)}
              sx={{
                position: "absolute",
                top: 24,
                right: 24,
                color: "white",
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.3)"
                },
                zIndex: 10
              }}
            >
              <Close />
            </IconButton>

            {/* IMAGE */}
            <img
              src={selectedImage}
              alt="Event full size"
              style={{
                maxWidth: "92%",
                maxHeight: "92vh",
                objectFit: "contain",
                borderRadius: "12px",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)"
              }}
            />
          </Box>
        </Dialog>

        {/* FOOTER & SUB-SECTIONS */}
        <Box sx={{ mt: 8 }}>
          <Footer setActiveSection={setActiveSection} />
        </Box>

        {activeSection === "about" && (
          <AboutPage setActiveSection={setActiveSection} />
        )}

        {activeSection === "features" && (
          <FeaturesPage setActiveSection={setActiveSection} />
        )}

        {activeSection === "contact" && (
          <ContactPage setActiveSection={setActiveSection} />
        )}

        {/* MODALS */}
        <Dialog open={registrationOpen} onClose={() => setRegistrationOpen(false)} maxWidth="md" fullWidth>
          <EventRegistration onEventRegistered={handleEventRegistered} />
        </Dialog>

        <AdminDrawer open={adminOpen} onClose={() => setAdminOpen(false)} />

      </Box>
    </Box>
  );
}
