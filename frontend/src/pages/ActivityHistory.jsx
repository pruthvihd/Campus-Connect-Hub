import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ActivityHistory() {

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ safer parsing
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {

    const fetchExpiredEvents = async () => {
      try {

        if (!user || !user.id) {
          console.error("User not found in localStorage");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `http://localhost:8080/events/expired/${user.id}`
        );

        setHistory(response.data);

      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpiredEvents();

  }, [user]);

  return (
    <div style={{ padding: 40 }}>
      <h2>Activity History</h2>

      {/* ✅ Loading state */}
      {loading ? (
        <p>Loading...</p>
      ) : history.length === 0 ? (
        <p>No expired events yet.</p>
      ) : (
        history.map((event) => (
          <div
            key={event.id}
            style={{
              border: "1px solid #ccc",
              padding: 15,
              marginBottom: 10,
              borderRadius: 8,
              backgroundColor: "#f9f9f9"
            }}
          >
            <h4>{event.title}</h4>
            <p><strong>Venue:</strong> {event.venue}</p>
            <p><strong>Category:</strong> {event.category}</p>
            <p><strong>Organizer:</strong> {event.organizerName}</p>
            <p><strong>Status:</strong> <span style={{ color: "red" }}>Expired</span></p>
          </div>
        ))
      )}
    </div>
  );
}
