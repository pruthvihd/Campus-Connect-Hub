import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Paper,
  Alert,
  Snackbar,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";

export default function RegisterPage() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("student");

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    branch: "",
    year: "",
    experience: "",
    password: "",
    confirmPassword: ""
  });

  // ---------- HANDLERS ----------
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);

    setForm((prev) => ({
      ...prev,
      year: "",
      experience: ""
    }));
  };

  const showAlert = (message, severity = "success") => {
    setAlert({ open: true, message, severity });
  };

  // ---------- REGISTER ----------
  const handleRegister = async () => {

    if (!form.name || !form.email || !form.password) {
      showAlert("Please fill in all required fields", "error");
      return;
    }

    if (form.password !== form.confirmPassword) {
      showAlert("Passwords do not match", "error");
      return;
    }

    if (form.password.length < 6) {
      showAlert("Password must be at least 6 characters", "error");
      return;
    }

    if (role === "student" && !form.year) {
      showAlert("Please select your year", "error");
      return;
    }

    if (role === "staff" && !form.experience) {
      showAlert("Please enter experience", "error");
      return;
    }

    setLoading(true);

    try {

      await axios.post(
        "http://localhost:8080/api/auth/register",
        {
          name: form.name,
          email: form.email,
          password: form.password,
          phone: form.phone,
          college: form.college,
          branch: form.branch,
          year: form.year,
          experience: form.experience,
          role
        }
      );

      // ✅ CREATE CLEAN USER OBJECT
      const newUser = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        college: form.college,
        branch: form.branch,
        role,
        profilePic: null
      };

      // ✅ GET EXISTING USERS
      const existingUsers =
        JSON.parse(localStorage.getItem("users")) || [];

      // ✅ PREVENT DUPLICATE EMAIL
      const userExists = existingUsers.find(
        (u) => u.email === newUser.email
      );

      if (!userExists) {
        existingUsers.push(newUser);
        localStorage.setItem("users", JSON.stringify(existingUsers));
      }

      // ✅ SET CURRENT SESSION USER
      localStorage.setItem("user", JSON.stringify(newUser));

      showAlert("Registration successful!");

      setTimeout(() => navigate("/menu"), 1500);

    } catch (err) {

      console.error("Registration error:", err);

      const msg =
        err.response?.data?.message ||
        err.response?.data ||
        "Registration failed. Please try again.";

      showAlert(msg, "error");

    } finally {
      setLoading(false);
    }
  };

  // ---------- UI ----------
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #d8ecff, #b6dcff)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ width: "100%", maxWidth: 450 }}
      >
        <Paper elevation={5} sx={{ p: 4, borderRadius: 3 }}>
          <Typography
            variant="h5"
            fontWeight="700"
            align="center"
            sx={{ color: "#0A4DA3", mb: 2 }}
          >
            Create Your Account
          </Typography>

          <FormControl sx={{ width: "100%", mb: 2 }}>
            <FormLabel sx={{ fontWeight: 600, color: "#0A4DA3" }}>
              I am a *
            </FormLabel>

            <RadioGroup row value={role} onChange={handleRoleChange}>
              <FormControlLabel value="student" control={<Radio />} label="Student" />
              <FormControlLabel value="staff" control={<Radio />} label="Staff" />
            </RadioGroup>
          </FormControl>

          <TextField fullWidth label="Full Name *" name="name" value={form.name} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="Email *" name="email" value={form.email} onChange={handleChange} margin="normal" />
          <TextField fullWidth type="password" label="Password *" name="password" value={form.password} onChange={handleChange} margin="normal" />
          <TextField fullWidth type="password" label="Confirm Password *" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="Phone Number" name="phone" value={form.phone} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="College" name="college" value={form.college} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="Branch" name="branch" value={form.branch} onChange={handleChange} margin="normal" />

          {role === "student" ? (
            <TextField select fullWidth label="Year *" name="year" value={form.year} onChange={handleChange} margin="normal">
              {["1st Year", "2nd Year", "3rd Year", "4th Year"].map((y) => (
                <MenuItem key={y} value={y}>{y}</MenuItem>
              ))}
            </TextField>
          ) : (
            <TextField fullWidth type="number" label="Experience (Years) *" name="experience" value={form.experience} onChange={handleChange} margin="normal" />
          )}

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, py: 1.3, bgcolor: "#0A4DA3" }}
            onClick={handleRegister}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </Button>

          <Typography align="center" sx={{ mt: 2 }}>
            Already have an account?{" "}
            <span
              style={{ color: "#0A4DA3", cursor: "pointer", fontWeight: 600 }}
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </Typography>
        </Paper>
      </motion.div>

      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={() => setAlert({ ...alert, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
