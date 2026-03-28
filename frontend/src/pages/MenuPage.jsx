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
  Link,
  Avatar,
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
  Add,
  Link as LinkIcon,
  Close
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
  // ✅ FIXED API
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
    { id: "hackathon", label: "Hackathon", icon: <Code />, color: "#FF6B6B" },
    { id: "internship", label: "Internship", icon: <Work />, color: "#4ECDC4" },
    { id: "webinars", label: "Webinars", icon: <VideoCall />, color: "#45B7D1" },
    { id: "workshop", label: "Workshop", icon: <School />, color: "#96CEB4" },
    { id: "cultural", label: "Cultural Events", icon: <TheaterComedy />, color: "#FFEAA7" },
    { id: "sports", label: "Sports", icon: <SportsBaseball />, color: "#DDA0DD" },
    { id: "offcampus", label: "Off Campus Hiring", icon: <BusinessCenter />, color: "#98D8C8" },
    { id: "mentorship", label: "Mentorship", icon: <Psychology />, color: "#F7DC6F" },
    { id: "competition", label: "Other Competitions", icon: <EmojiEvents />, color: "#BB8FCE" }
  ];

  //---------------------------------------
  // ✅ FIXED CATEGORY MATCH
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
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "90%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(214, 234, 255, 0.55)",
          backdropFilter: "blur(2px)",
          zIndex: 1
        }
      }}
    >
      <Box sx={{ position: "relative", zIndex: 2 }}>

        {/* HEADER */}
        <Box sx={{ backgroundColor: "#3952e1ff", py: 4, color: "white" }}>
          <Container maxWidth="xl" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box>
              <Typography
                sx={{
                  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",

                  fontSize: { xs: "2.8rem", md: "4.5rem" },
                  color: "#ffffff"
                }}
              >
                Campus Connect Hub
              </Typography>

              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                  Learn 📚 | Network 🌐 | Innovate 🚀 | Repeat 🔄
              </Typography>
            </Box>

            <Avatar
              src={user?.profilePic || ""}
              sx={{ bgcolor: "white", color: "#004B8D", cursor: "pointer", width: 52, height: 52 }}
              onClick={() => setAdminOpen(true)}
            >
              {!user?.profilePic && userInitial}
            </Avatar>
          </Container>
        </Box>

        {/* MAIN */}
        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Grid container spacing={3}>

            {/* LEFT PANEL */}
            <Grid item xs={12} md={3}>
              <Paper sx={{ p: 3, borderRadius: 3 }}>
                <Typography variant="h6" fontWeight="600" textAlign="center" mb={2}>
                  Event Categories
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.3 }}>
                  {updatedMenuItems.map((item) => (
                    <Button
                      key={item.id}
                      fullWidth
                      startIcon={item.icon}
                      onClick={() => handleCategoryClick(item.id)}
                      sx={{
                        justifyContent: "flex-start",
                        color: activeCategory === item.id ? item.color : "#444",
                        background:
                          activeCategory === item.id
                            ? `${item.color}25`
                            : "transparent",
                        borderRadius: 2,
                        p: 1.4
                      }}
                    >
                      <Typography sx={{ flexGrow: 1 }}>
                        {item.label}
                      </Typography>

                      <Chip
                        label={item.count}
                        size="small"
                        sx={{
                          background: item.color,
                          color: "white"
                        }}
                      />
                    </Button>
                  ))}
                </Box>

                <Box mt={3}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => setRegistrationOpen(true)}
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                      background:
                        "linear-gradient(135deg, #FF6B6B, #4ECDC4)",
                      fontWeight: "600"
                    }}
                  >
                    Register New Event
                  </Button>
                </Box>
              </Paper>
            </Grid>

            {/* EVENTS */}
            {/* EVENTS */}
<Grid item xs={12} md={9} ref={eventsRef}>

  <Typography variant="h4" fontWeight="700" sx={{ mb: 2 }}>
    {updatedMenuItems.find((i) => i.id === activeCategory)?.label}
  </Typography>

  {currentContent.length > 0 ? (
    <Grid container spacing={3}>
      {currentContent.map((item, index) => (
        <Grid item xs={12} sm={6} md={6} key={index}>

          <Card
            sx={{
              borderRadius: 3,
              display: "flex",
              flexDirection: "column",
              transition: "0.3s",
              "&:hover": {
                transform: "translateY(-6px)",
                boxShadow: 6
              }
            }}
          >

            {/* IMAGE */}
            {item.image && (
              <Box
                sx={{
                  height: 180,
                  overflow: "hidden",
                  cursor: "pointer"
                }}
                onClick={() => setSelectedImage(item.image)}
              >
                <img
                  src={item.image}
                  alt="event"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                />
              </Box>
            )}

            {/* CONTENT */}
            <CardContent>

              <Typography fontWeight="700" fontSize={18} mb={1}>
                {item.title}
              </Typography>

              <Typography variant="body2">
                📅 Date: {new Date(item.expireAt).toLocaleDateString()}
              </Typography>

              <Typography variant="body2">
                💰 Fee: {item.fee}
              </Typography>

              <Typography variant="body2">
                📍 Venue: {item.venue}
              </Typography>

              <Typography variant="body2">
                👤 Organizer: {item.organizerName}
              </Typography>

              <Typography variant="body2">
                📞 Contact: {item.organizerPhone}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  mt: 1,
                  color: "#666"
                }}
              >
                {item.description}
              </Typography>

              {/* LINK */}
              {item.registrationLink && (
                <Link
                  href={item.registrationLink}
                  target="_blank"
                  underline="hover"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    mt: 1,
                    fontWeight: 600
                  }}
                >
                  <LinkIcon fontSize="small" />
                  Register Here
                </Link>
              )}

            </CardContent>
          </Card>

        </Grid>
      ))}
    </Grid>
  ) : (
    <Typography>No events registered yet</Typography>
  )}

</Grid>

          </Grid>
        </Container>

       {/* IMAGE POPUP */}
<Dialog
  open={Boolean(selectedImage)}
  onClose={() => setSelectedImage(null)}
  fullScreen
>
  <Box
    sx={{
      position: "relative",
      width: "100%",
      height: "100vh",
      backgroundColor: "black",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}
  >

   {/* CLOSE BUTTON */}
<IconButton
  onClick={() => setSelectedImage(null)}
  sx={{
    position: "absolute",
    top: 20,
    right: 20,
    color: "white",
    backgroundColor: "rgba(0,0,0,0.5)",
    backdropFilter: "blur(6px)",
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.8)"
    },
    zIndex: 10
  }}
>
  <Close />
</IconButton>


    {/* IMAGE */}
    <img
      src={selectedImage}
      alt="full"
      style={{
        maxWidth: "100%",
        maxHeight: "100%",
        objectFit: "contain"
      }}
    />

  </Box>
</Dialog>
    <Box sx={{ display: "",color:"", justifyContent: "center", mt: 10 }}>
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
     
     

        {/* MODAL */}
        <Dialog open={registrationOpen} onClose={() => setRegistrationOpen(false)}>
          <EventRegistration onEventRegistered={handleEventRegistered} />
        </Dialog>

        <AdminDrawer open={adminOpen} onClose={() => setAdminOpen(false)} />

      </Box>
    </Box>
    
    
  );
}

