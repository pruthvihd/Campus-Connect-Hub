import { Box, Typography, IconButton, Container, Grid, Paper } from "@mui/material";
import { Close } from "@mui/icons-material";

export default function FeaturesPage({ setActiveSection }) {
const features = [
  {
    title: "Hackathon Updates ",
    desc: "Stay updated with upcoming hackathons across campuses and online platforms. Participate to sharpen your coding, creativity, and problem-solving skills while competing with top talent."
  },
  {
    title: "Internship Alerts ",
    desc: "Discover the latest internship opportunities from top companies and startups. Gain real-world experience, build your resume, and take a step closer to your dream career."
  },
  {
    title: "Webinars & Workshops ",
    desc: "Attend expert-led sessions to learn trending technologies and industry skills. Enhance your knowledge beyond academics with practical, hands-on learning experiences."
  },
  {
    title: "Cultural & Fest Events ",
    desc: "Explore vibrant cultural programs, college fests, and creative events. Showcase your talents, enjoy campus life, and connect with like-minded individuals."
  },
  {
    title: "Sports Activities ",
    desc: "Stay active with sports events, tournaments, and fitness challenges. Build teamwork, discipline, and a competitive spirit while maintaining a healthy lifestyle."
  },
  {
    title: "Off-Campus Opportunities ",
    desc: "Find job and internship opportunities beyond campus placements. Apply to top companies and unlock more career possibilities across industries."
  },
  {
    title: "Mentorship Programs ",
    desc: "Connect with experienced mentors for guidance, career advice, and personal growth. Learn from real-world experiences and make smarter career decisions."
  },
  {
    title: " Other Competitions",
    desc: "Participate in coding contests, quizzes, and innovation challenges. Test your skills, gain recognition, and win exciting rewards."
  }
];
  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        bgcolor: "#0f172a", // dark background like image
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
  Our Features
</Typography>

        {/* Cards Layout */}
        <Grid container spacing={5} justifyContent="center">

          {features.map((item, index) => (
            <Grid
              item
              xs={12}
              sm={10}
              md={4}
              key={index}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Paper
                elevation={0}
                sx={{
                  width: "100%",
                  maxWidth: 380,
                  p: 4,
                  borderRadius: "30px", // 🔥 pill shape like image
                  bgcolor: "#f1f5f9", // light gray
                  color: "#111",
                  textAlign: "center",
                  transition: "all 0.3s ease",

                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 12px 30px rgba(0,0,0,0.4)"
                  }
                }}
              >
                {/* Title */}
                <Typography
  variant="h5"
  fontWeight="bold"
  sx={{
    color: "#0a7d3b", // green text
    mb: 2,
    textShadow: "0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff"
  }}
>
  {item.title}
</Typography>

                {/* Description */}
                <Typography
                  variant="body1"
                  sx={{
                    lineHeight: 1.8,
                    color: "#000000"
                  }}
                >
                  {item.desc}
                </Typography>

              </Paper>
            </Grid>
          ))}

        </Grid>

      </Container>
    </Box>
  );
}