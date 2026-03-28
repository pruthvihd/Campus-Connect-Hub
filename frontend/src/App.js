import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import IntroPage from "./pages/IntroPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import MenuPage from "./pages/MenuPage";
import EventRegistration from "./pages/EventRegistration";


// ⭐ IMPORT ADMIN PAGES
import EditEvents from "./pages/EditEvents";
import DeleteEvents from "./pages/DeleteEvents";
import ActivityHistory from "./pages/ActivityHistory";

function App() {
  return (
    <Router>
      <Routes>

        {/* ========= PUBLIC ========= */}
        <Route path="/" element={<IntroPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* ========= USER ========= */}
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/register-event" element={<EventRegistration />} />


        {/* ========= ADMIN ========= */}
        <Route path="/admin/edit-events" element={<EditEvents />} />
        <Route path="/admin/delete-events" element={<DeleteEvents />} />
        <Route path="/admin/activity" element={<ActivityHistory />} />

        {/* ========= FALLBACK (ALWAYS LAST) ========= */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </Router>
  );
}

export default App;
