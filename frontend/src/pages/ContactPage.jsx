import {
  Box,
  Typography,
  IconButton,
  Container,
  Avatar,
  TextField,
  Button
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useState } from "react";
import emailjs from "@emailjs/browser"; // ✅ UPDATED PACKAGE

export default function ContactPage({ setActiveSection }) {

  const [formData, setFormData] = useState({
    from_name: "",
    reply_to: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    // ✅ Validation
    if (!formData.from_name || !formData.reply_to || !formData.message) {
      alert("All fields are required ⚠️");
      return;
    }

    emailjs.send(
      "service_unmvj9c",        // ✅ your service ID
      "template_rnm3wkr",      // ✅ your template ID
      {
        from_name: formData.from_name,
        reply_to: formData.reply_to,
        message: formData.message
      },
      "HHa8OhfnDIiFNUZmN"      // ✅ your public key
    )
    .then((result) => {
      console.log("SUCCESS:", result.text);
      alert("Message sent successfully ✅");

      setFormData({
        from_name: "",
        reply_to: "",
        message: ""
      });
    })
    .catch((error) => {
      console.log("ERROR:", error);
      alert("Failed to send ❌");
    });
  };

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        bgcolor: "rgba(0,0,0,0.92)",
        color: "white",
        zIndex: 2000,
        overflowY: "auto",
        textAlign: "center"
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

        <Typography variant="h3" fontWeight="bold" mb={4}>
           Contact
        </Typography>

        {/* Avatar */}
        <Avatar
          src="developers.jpg"
          sx={{ width: 120, height: 120, mx: "auto", mb: 2 }}
        />

        <Typography variant="h6">Pruthvi H D</Typography>
        <Typography sx={{ opacity: 0.7, mb: 4 }}>
        |  Full Stack Web Developer | B.E in Computer Science |
        </Typography>

        {/* Form */}
        <Box
          component="form"
          onSubmit={sendEmail}
          sx={{ maxWidth: 400, mx: "auto" }}
        >

          <TextField
            fullWidth
            name="from_name"
            placeholder="Your Name"
            value={formData.from_name}
            onChange={handleChange}
            sx={{ mb: 2, bgcolor: "white", borderRadius: 1 }}
          />

          <TextField
            fullWidth
            name="reply_to"
            type="email"
            placeholder="Your Email"
            value={formData.reply_to}
            onChange={handleChange}
            sx={{ mb: 2, bgcolor: "white", borderRadius: 1 }}
          />

          <TextField
            fullWidth
            multiline
            rows={4}
            name="message"
            placeholder="Report issue or feedback..."
            value={formData.message}
            onChange={handleChange}
            sx={{ mb: 2, bgcolor: "white", borderRadius: 1 }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              py: 1.2,
              fontWeight: "bold",
              background: "linear-gradient(135deg, #FF6B6B, #4ECDC4)"
            }}
          >
            Send Feedback
          </Button>

        </Box>
      </Container>
    </Box>
  );
}