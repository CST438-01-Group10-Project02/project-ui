export default function Dashboard() {
  return (
    <div style={{ padding: 40, fontFamily: "system-ui" }}>
      <h1>Event Manager Dashboard</h1>

      <p style={{ color: "#555" }}>
        Manage your events, invitations, and profile.
      </p>

      <div
        style={{
          marginTop: 30,
          display: "grid",
          gridTemplateColumns: "repeat(3, 200px)",
          gap: 20,
        }}
      >
        <div style={cardStyle}>
          <h3>Events</h3>
          <p>View and manage your events.</p>
          <a href="/events">Open</a>
        </div>

        <div style={cardStyle}>
          <h3>Create Event</h3>
          <p>Create a new event.</p>
          <a href="/events/new">Create</a>
        </div>

        <div style={cardStyle}>
          <h3>Profile</h3>
          <p>Manage your user profile.</p>
          <a href="/profile">View</a>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  border: "1px solid #ddd",
  padding: 20,
  borderRadius: 10,
  background: "#fafafa",
};