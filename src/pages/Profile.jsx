import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabaseClient } from "../supabaseClient.js";
import "./Profile.css";

const API_BASE = "http://localhost:8080";

export default function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState([
    { label: "Events Created", value: 0 },
    { label: "Events Joined", value: 0 },
    { label: "Upcoming Events", value: 0 },
  ]);

  useEffect(() => {
    async function loadProfile() {
      const { data, error } = await supabaseClient.auth.getUser();

      if (error) {
        console.error(error);
        return;
      }

      const user = data?.user;

      const currentProfile = {
        name: user?.user_metadata?.username || "User",
        email: user?.email || "No email found",
        role: user?.user_metadata?.role || "Event Manager User",
        bio: user?.user_metadata?.bio || "No bio added yet.",
        hostId: Number(user?.user_metadata?.hostId) || null,
      };

      setProfile(currentProfile);

      if (!currentProfile.hostId) return;

      try {
        const response = await fetch(`${API_BASE}/events?hostId=${currentProfile.hostId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const createdEvents = await response.json();

        const now = new Date();

        const upcomingEvents = createdEvents.filter((event) => {
          if (!event.date) return false;
          return new Date(event.date) > now;
        });

        setStats([
          { label: "Events Created", value: createdEvents.length },
          { label: "Events Joined", value: 0 },
          { label: "Upcoming Events", value: upcomingEvents.length },
        ]);
      } catch (err) {
        console.error("Error loading event stats:", err);
      }
    }

    loadProfile();
  }, []);

  if (!profile) {
    return <div className="profile-container">Loading...</div>;
  }

  return (
    <div className="profile-container">
      <button
        className="profile-back-button"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="profile-header">
        <div className="profile-header-left">
          <h1 className="profile-name">{profile.name}</h1>
          <p className="profile-email">{profile.email}</p>
          <p className="profile-role">{profile.role}</p>
          <p className="profile-bio-header">{profile.bio}</p>
        </div>

        <div className="profile-header-right">
          <button
            className="profile-edit-button"
            onClick={() => navigate("/profile/edit")}
          >
            Edit Profile
          </button>
        </div>
      </div>

      <div className="profile-section">
        <h2 className="profile-section-title">Profile Details</h2>

        <div className="profile-detail-row">
          <span className="profile-detail-label">Full Name:</span>
          <span className="profile-detail-value">{profile.name}</span>
        </div>

        <div className="profile-detail-row">
          <span className="profile-detail-label">Email:</span>
          <span className="profile-detail-value">{profile.email}</span>
        </div>

        <div className="profile-detail-row">
          <span className="profile-detail-label">Account Type:</span>
          <span className="profile-detail-value">{profile.role}</span>
        </div>
      </div>

      <div className="profile-stats">
        {stats.map((stat) => (
          <div key={stat.label} className="profile-stat-card">
            <h3 className="profile-stat-value">{stat.value}</h3>
            <p className="profile-stat-label">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}