export default function Footer({ setActiveSection }) {
  return (
    <footer
      style={{
        backgroundColor: "transparent",
        color: "#ffffff",
        textAlign: "center",
        padding: "24px 10px",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {/* Copyright */}
      <p style={{ marginBottom: "12px", color: "rgba(255, 255, 255, 0.9)", fontSize: "14px", fontWeight: "500" }}>
        © {new Date().getFullYear()} Campus Connect Hub. All rights reserved.
      </p>

      {/* Buttons */}
      <div style={{ marginBottom: "12px" }}>
        <span
          onClick={() => setActiveSection("features")}
          style={linkStyle}
          onMouseOver={(e) => (e.target.style.color = "#818CF8")}
          onMouseOut={(e) => (e.target.style.color = "#FFFFFF")}
        >
          Features
        </span>

        <span
          onClick={() => setActiveSection("about")}
          style={linkStyle}
          onMouseOver={(e) => (e.target.style.color = "#818CF8")}
          onMouseOut={(e) => (e.target.style.color = "#FFFFFF")}
        >
          About Us
        </span>

        <span
          onClick={() => setActiveSection("contact")}
          style={linkStyle}
          onMouseOver={(e) => (e.target.style.color = "#818CF8")}
          onMouseOut={(e) => (e.target.style.color = "#FFFFFF")}
        >
          Contact
        </span>
      </div>

      {/* Bottom Text */}
      <p style={{ color: "rgba(255, 255, 255, 0.75)", fontSize: "14px" }}>
        Connecting talent with opportunities 🎯
      </p>
    </footer>
  );
}

// ✅ Button Style (White & Smooth Hover)
const linkStyle = {
  margin: "0 14px",
  color: "#FFFFFF",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "15px",
  textDecoration: "none",
  transition: "all 0.2s ease"
};