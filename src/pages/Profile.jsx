import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  const user = useMemo(() => {
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));

      return {
        name: token?.name || "Tanner Butler",
        email: token?.email || "tanner@example.com",
        role: token?.role || "Event Manager User",
      };
    } catch {
      return {
        name: "Tanner Butler",
        email: "tanner@example.com",
        role: "Event Manager User",
      };
    }
  }, []);

  const stats = [
    { label: "Events Created", value: 12 },
    { label: "Events Joined", value: 28 },
    { label: "Upcoming Events", value: 5 },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, rgb(248, 250, 252), rgb(226, 232, 240))",
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          display: "grid",
          gap: "24px",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "32px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            display: "flex",
            alignItems: "center",
            gap: "24px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              background:
                "linear-gradient(135deg, rgb(59, 130, 246), rgb(99, 102, 241))",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "36px",
              fontWeight: "bold",
            }}
          >
            {user.name.charAt(0)}
          </div>

          <div style={{ flex: 1 }}>
            <h1
              style={{
                margin: "0 0 8px 0",
                fontSize: "32px",
                color: "#1e293b",
              }}
            >
              {user.name}
            </h1>
            <p style={{ margin: "0 0 6px 0", color: "#475569", fontSize: "16px" }}>
              {user.email}
            </p>
            <p style={{ margin: 0, color: "#64748b", fontSize: "15px" }}>
              {user.role}
            </p>
          </div>

          <button
            onClick={() => {
              console.log("button clicked");
              navigate("/profile/edit");
            }}
            style={{
              backgroundColor: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "10px",
              padding: "12px 20px",
              fontSize: "15px",
              cursor: "pointer",
            }}
          >
            Edit Profile
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
          }}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              style={{
                backgroundColor: "white",
                borderRadius: "18px",
                padding: "24px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
              }}
            >
              <h2
                style={{
                  margin: "0 0 10px 0",
                  fontSize: "15px",
                  color: "#64748b",
                  fontWeight: "normal",
                }}
              >
                {stat.label}
              </h2>
              <p
                style={{
                  margin: 0,
                  fontSize: "32px",
                  fontWeight: "bold",
                  color: "#0f172a",
                }}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div
          style={{
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "32px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          <h2 style={{ marginTop: 0, color: "#1e293b" }}>About</h2>
          <p style={{ color: "#475569", lineHeight: "1.7", marginBottom: "20px" }}>
            Welcome to your profile page. This is where users can view their
            account details, event activity, and personal information for the
            Event Manager app.
          </p>

          <div style={{ display: "grid", gap: "14px" }}>
            <div>
              <strong style={{ color: "#0f172a" }}>Full Name:</strong>
              <span style={{ marginLeft: "8px", color: "#475569" }}>
                {user.name}
              </span>
            </div>

            <div>
              <strong style={{ color: "#0f172a" }}>Email:</strong>
              <span style={{ marginLeft: "8px", color: "#475569" }}>
                {user.email}
              </span>
            </div>

            <div>
              <strong style={{ color: "#0f172a" }}>Account Type:</strong>
              <span style={{ marginLeft: "8px", color: "#475569" }}>
                {user.role}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}