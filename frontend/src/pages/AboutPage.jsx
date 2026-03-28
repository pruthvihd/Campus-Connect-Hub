import { Box, Typography, IconButton, Container, Grid, Paper } from "@mui/material";
import { Close } from "@mui/icons-material";

export default function AboutPage({ setActiveSection }) {

  const aboutCards = [
    {
      title: "Our Vision ",
      desc: "Campus Connect Hub is a centralized platform that connects students with opportunities like hackathons, internships, and events.It simplifies discovery, registration, and participation through a seamless digital experience.Our goal is to empower students to grow, connect, and build successful careers."
    },
    {
      title: "Stack & Architecture ",
      desc: `
• A centralized platform connecting students with hackathons, internships, workshops, and campus events.

• A clean and responsive user interface built using React JS and Material UI for a smooth user experience.

• A powerful backend developed with Spring Boot (Java) handling user requests, event management, and system logic.

• Secure and scalable data storage using MongoDB Compass for managing user details and event information.

• Easy event discovery and quick registration process for students without complexity.

• Efficient communication between frontend and backend using REST APIs for seamless performance.
`
    },
    {
      title: "Caution ⚠️ ",
      desc: `
  • Ensure the information entered during registration is accurate to avoid issues in event participation.

  • Regularly check event updates and deadlines to avoid missing important opportunities.

  • Use only your own account for registrations to maintain proper tracking and data accuracy.
`
    }
  ];

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        bgcolor: "#0f172a",
        color: "white",
        zIndex: 2000,
        overflowY: "auto"
      }}
    >

      {/* Close Button */}
      <IconButton
        onClick={() => setActiveSection(null)}
        sx={{ position: "absolute", top: 20, right: 20, color: "white" }}
      >
        <Close />
      </IconButton>

      <Container sx={{ py: 10 }}>

        {/* Heading */}
        <Typography
          variant="h3"
          fontWeight="bold"
          textAlign="center"
          mb={6}
          sx={{
            color: "#fff",
            textShadow: `
              0 0 3px rgba(255,255,255,0.6),
              0 0 6px rgba(255,255,255,0.4)
            `
          }}
        >
          About
        </Typography>

        {/* Cards */}
        <Grid container spacing={4} justifyContent="center">
          {aboutCards.map((item, index) => (
            <Grid item xs={12} sm={10} md={4} key={index}>
              <Paper
                sx={{
                  p: 4,
                  borderRadius: "25px",
                  bgcolor: "#f1f5f9",
                  color: "#111",
                  textAlign: "center",
                  transition: "0.3s",
                  minHeight: "220px",

                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.4)"
                  }
                }}
              >
                {/* Title */}
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  sx={{
                    color: "#0a7d3b",
                    mb: 2
                  }}
                >
                  {item.title}
                </Typography>

                {/* Description */}
                <Typography
  variant="body1"
  sx={{
    lineHeight: 1.6,
    color: "#000000",
    textAlign: "left"
  }}
>
  {item.desc
    .split("\n")
    .filter(line => line.trim() !== "") // remove empty lines
    .map((line, i) => (
      <Box key={i} sx={{ mb: 0.5 }}>
        {line}
      </Box>
    ))}
</Typography>

              </Paper>
            </Grid>
          ))}
        </Grid>

      </Container>
    </Box>
  );
}