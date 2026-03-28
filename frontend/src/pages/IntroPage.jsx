import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";
import handshake from "../assets/handshake.png";

// ICONS
import {
  Code,
  Work,
  VideoCall,
  TheaterComedy,
  SportsBaseball,
  BusinessCenter,
  Psychology,
  EmojiEvents
} from "@mui/icons-material";

export default function IntroPage() {
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);

  // Updated with icons
  const keyFeatures = [
    { name: "Hackathon Updates", icon: <Code sx={{ fontSize: 45 }} /> },
    { name: "Internship Alerts", icon: <Work sx={{ fontSize: 45 }} /> },
    { name: "Webinars & Workshops", icon: <VideoCall sx={{ fontSize: 45 }} /> },
    { name: "Cultural & Fest Events", icon: <TheaterComedy sx={{ fontSize: 45 }} /> },
    { name: "Sports Activities", icon: <SportsBaseball sx={{ fontSize: 45 }} /> },
    { name: "Other Competitions", icon: <EmojiEvents sx={{ fontSize: 45 }} /> },
    { name: "Off-campus Hiring", icon: <BusinessCenter sx={{ fontSize: 45 }} /> },
    { name: "Mentorship Programs", icon: <Psychology sx={{ fontSize: 45 }} /> }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      style={{ minHeight: "100vh", width: "100vw" }}
    >
      <Box
        sx={{
          minHeight: "100vh",
          width: "100vw",
          p: { xs: 3, md: 6 },
          textAlign: "center",
          position: "relative",
          overflow: "hidden"
        }}
      >

        {/* Background Image */}
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.35 }}
          transition={{ duration: 1.5 }}
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${handshake})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 0
          }}
        />

        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.55 }}
          transition={{ duration: 1.5 }}
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(128, 154, 174, 0)",
            zIndex: 1
          }}
        />

        {/* MAIN CONTENT */}
        <Box sx={{ position: "relative", zIndex: 2 }}>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h3" fontWeight="800" sx={{ color: "#3952e1ff" }}>
              Welcome to Campus Connect Hub
            </Typography>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 250 }}
              transition={{ duration: 0.7 }}
              style={{
                height: "4px",
                background: "#3952e1ff",
                margin: "10px auto 20px",
                borderRadius: "5px"
              }}
            />
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
          <Typography
  sx={{
    fontFamily: "'Source Serif 4', serif",
    fontSize: "25px",
    fontWeight: 500,
    textAlign: "center",
    color: "#000000",
    lineHeight: 1.7,
    letterSpacing: "0.3px",
    maxWidth: "900px",
    mx: "auto",
    mb: 4
  }}
>
  Unlock your potential through hackathons 🚀, internships 💼, workshops 📚,
  cultural events 🎭, sports 🏆, and mentorship 🤝 — where learning meets opportunity.
</Typography>
          </motion.div>

          {/* Feature Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}

          >
            <Box
              sx={{
                maxWidth: "1100px",
                mx: "auto",
                mt: 5,
                p: 3,
                borderRadius: 4,
                background: "rgba(255,255,255,0.45)",
                backdropFilter: "blur(8px)",
                boxShadow: "0 8px 28px rgba(0,0,0,0.15)"
              }}
            >
              <Typography variant="h5" fontWeight="700" sx={{ color: "#3952e1ff", mb: 3 }}>
                Key Features of Our Platform
              </Typography>

              <Grid container spacing={3} justifyContent="center">
                {keyFeatures.map((feature, index) => (
                  <Grid item xs={12} sm={6} md={3} key={feature.name}>
                    <motion.div
                    initial={{ opacity: 0, scale: 0.92, y: 15 }}
animate={{ opacity: 1, scale: 1, y: 0 }}
transition={{ delay: index * 0.06, duration: 0.3 }}
whileHover={{
  scale: 1.06,
  transition: { duration: 0.12 },
  boxShadow: "0px 10px 25px rgba(0,0,0,0.2)"
}}

                      style={{ borderRadius: "16px" }}
                    >
                      <Card
                        sx={{
                          height: "100%",
                          borderRadius: 3,
                          background: "rgba(255,255,255,0.75)",
                          border: "1px solid rgba(0,0,0,0.1)"
                        }}
                      >
                        <CardContent sx={{ textAlign: "center" }}>
                          {/* ICON */}
                          <Box sx={{ mb: 1.5, color: "#333" }}>{feature.icon}</Box>

                          {/* TITLE */}
                          <Typography variant="subtitle1" fontWeight="600" sx={{ color: "#3952e1ff" }}>
                            {feature.name}
                          </Typography>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </motion.div>

          {/* Buttons */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}>
            <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  mt: 5,
                  px: 5,
                  py: 1.8,
                  bgcolor: "#4059e5ff",
                  fontWeight: "700",
                  borderRadius: "12px"
                }}
                onClick={() => setDialogOpen(true)}
              >
                Get Started — Register Now
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  mt: 5,
                  ml: 3,
                  px: 5,
                  py: 1.8,
                  borderColor: "#4059e5ff",
                  fontWeight: "700",
                  borderRadius: "12px"
                }}
                onClick={() => navigate("/login")}
              >
                Already Registered? Login
              </Button>
            </motion.div>
          </motion.div>

          {/* Registration Dialog */}
          <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="xs" fullWidth>
            <DialogTitle sx={{ fontWeight: "700", color: "#0A4DA3" }}>
              Registration Details
              <IconButton
                onClick={() => setDialogOpen(false)}
                sx={{ position: "absolute", right: 12, top: 12, color: "#0A4DA3" }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>

            <DialogContent dividers>
              <Typography sx={{ mb: 2, color: "#003c8f" }}>
                Register to explore college opportunities and participate in events.
              </Typography>

              <Typography variant="body2" sx={{ color: "#0A4DA3" }}>
                Required fields:<br />
                • Name, Email, Phone<br />
                • College, Branch, Year<br />
                • Admin approval may be needed
              </Typography>
            </DialogContent>

            <DialogActions sx={{ p: 2 }}>
              <Button variant="outlined" sx={{ borderColor: "#0A4DA3", color: "#0A4DA3" }}
                onClick={() => setDialogOpen(false)}
              >
                Close
              </Button>

              <Button
                variant="contained"
                sx={{ bgcolor: "#0A4DA3", color: "white" }}
                onClick={() => {
                  setDialogOpen(false);
                  navigate("/register");
                }}
              >
                Continue
              </Button>
            </DialogActions>
          </Dialog>

        </Box>
      </Box>
    </motion.div>
  );
}
