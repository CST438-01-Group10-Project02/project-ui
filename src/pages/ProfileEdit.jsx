import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfileEdit() {
  const navigate = useNavigate();

  const storedUser = (() => {
    try {
      return JSON.parse(sessionStorage.getItem("token")) || {};
    } catch {
      return {};
    }
  })();

  const [formData, setFormData] = useState({
    name: storedUser.name || "Tanner Butler",
    email: storedUser.email || "tanner@example.com",
    role: storedUser.role || "Event Manager User",
    bio: storedUser.bio || "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const updatedUser = {
      ...storedUser,
      ...formData,
    };

    sessionStorage.setItem("token", JSON.stringify(updatedUser));
    navigate("/profile");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, rgb(248, 250, 252), rgb(226, 232, 240))",
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          backgroundColor: "white",
          borderRadius: "20px",
          padding: "32px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            marginTop: 0,
            marginBottom: "8px",
            color: "#1e293b",
            fontSize: "32px",
          }}
        >
          Edit Profile
        </h1>

        <p
          style={{
            marginTop: 0,
            marginBottom: "28px",
            color: "#64748b",
          }}
        >
          Update your account details below.
        </p>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "20px" }}>
          <div>
            <label
              htmlFor="name"
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "bold",
                color: "#0f172a",
              }}
            >
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: "10px",
                border: "1px solid #cbd5e1",
                fontSize: "15px",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "bold",
                color: "#0f172a",
              }}
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: "10px",
                border: "1px solid #cbd5e1",
                fontSize: "15px",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <label
              htmlFor="role"
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "bold",
                color: "#0f172a",
              }}
            >
              Role
            </label>
            <input
              id="role"
              name="role"
              type="text"
              value={formData.role}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: "10px",
                border: "1px solid #cbd5e1",
                fontSize: "15px",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <label
              htmlFor="bio"
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "bold",
                color: "#0f172a",
              }}
            >
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              rows="5"
              value={formData.bio}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: "10px",
                border: "1px solid #cbd5e1",
                fontSize: "15px",
                boxSizing: "border-box",
                resize: "vertical",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "8px",
              flexWrap: "wrap",
            }}
          >
            <button
              type="submit"
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
              Save Changes
            </button>

            <button
              type="button"
              onClick={() => navigate("/profile")}
              style={{
                backgroundColor: "#e2e8f0",
                color: "#0f172a",
                border: "none",
                borderRadius: "10px",
                padding: "12px 20px",
                fontSize: "15px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}