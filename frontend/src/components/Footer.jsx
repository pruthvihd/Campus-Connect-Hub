export default function Footer({ setActiveSection }) {
  return (
    <footer
     style={{
        backgroundColor: "transparent", // ✅ removed background
        color: "#000",
        textAlign: "center",
        padding: "20px 10px",
      }}
    >
      {/* Copyright */}
      <p style={{ marginBottom: "10px" }}>
        © {new Date().getFullYear()} Campus Connect Hub. All rights reserved.
      </p>

      {/* Buttons */}
      <div style={{ marginBottom: "10px" }}>
 <span
  onClick={() => setActiveSection("features")}
  style={linkStyle}
  onMouseOver={(e) => (e.target.style.color = "#000000")} // darker
  onMouseOut={(e) => (e.target.style.color = "#0c00f7")}  // normal
>
  Features
</span>
 
 <span
  onClick={() => setActiveSection("about")}
  style={linkStyle}
  onMouseOver={(e) => (e.target.style.color = "#000000")} // darker
  onMouseOut={(e) => (e.target.style.color = "#0c00f7")}  // normal
>
  About Us
</span>

 <span
  onClick={() => setActiveSection("contact")}
  style={linkStyle}
  onMouseOver={(e) => (e.target.style.color = "#000000")} // darker
  onMouseOut={(e) => (e.target.style.color = "#0c00f7")}  // normal
>
  Contact
</span>
</div>

      {/* Bottom Text */}
      <p style={{ color: "black", fontSize: "14px" }}>
       Connecting talent with opportunities 🎯
      </p>
    </footer>
  );
}

// ✅ Button Style (Blue)
const linkStyle = {
  margin: "0 12px",
  color: "#0c00f7",
  cursor: "pointer",
  fontWeight: "500",
  textDecoration: "none",
  transition: "0.3s"
};