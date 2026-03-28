import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  Snackbar
} from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";

export default function LoginPage() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const showAlert = (message, severity = "success") => {
    setAlert({ open: true, message, severity });
  };

  // ✅ UPDATED LOGIN
  const handleLogin = async () => {

    if (!form.email || !form.password) {
      showAlert("Please fill in all fields", "error");
      return;
    }

    setLoading(true);

    try {

      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          email: form.email,
          password: form.password
        }
      );

      // ✅ Store logged-in user
      localStorage.setItem(
        "user",
        JSON.stringify(response.data)
      );

      showAlert("Login Successful!");

      setTimeout(() => {
        navigate("/menu");
      }, 1000);

    } catch (err) {

      console.error("Login error:", err);

      // 🔥 Better error message handling
      if (err.response) {
        showAlert(err.response.data || "Invalid credentials", "error");
      } 
      else if (err.request) {
        showAlert("Cannot connect to server. Is backend running?", "error");
      } 
      else {
        showAlert("Login failed. Please try again.", "error");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #d8ecff, #b6dcff)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <Paper
          elevation={5}
          sx={{
            p: 4,
            borderRadius: "18px",
            backdropFilter: "blur(5px)",
          }}
        >
          <Typography
            variant="h5"
            fontWeight="700"
            align="center"
            sx={{ color: "#0A4DA3", mb: 2 }}
          >
            Welcome Back
          </Typography>

          <TextField
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            type="password"
            label="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            margin="normal"
          />

          <Button
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              mt: 3,
              py: 1.4,
              bgcolor: "#0A4DA3",
              "&:hover": { bgcolor: "#083b7a" },
              "&:disabled": { bgcolor: "#cccccc" }
            }}
            onClick={handleLogin}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          <Typography align="center" sx={{ mt: 2 }}>
            Don't have an account?{" "}
            <span
              style={{
                color: "#0A4DA3",
                cursor: "pointer",
                fontWeight: "600",
              }}
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </Typography>
        </Paper>
      </motion.div>

      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={() => setAlert({ ...alert, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setAlert({ ...alert, open: false })}
          severity={alert.severity}
          sx={{ width: '100%' }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
