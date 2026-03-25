import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabaseClient } from "../supabaseClient.js";
import "./ProfileEdit.css";

export default function ProfileEdit() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    bio: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadUser() {
      const { data, error } = await supabaseClient.auth.getUser();

      if (error) {
        console.error(error);
        return;
      }

      const user = data?.user;

      setFormData({
        name: user?.user_metadata?.username || "",
        email: user?.email || "",
        role: user?.user_metadata?.role || "Event Manager User",
        bio: user?.user_metadata?.bio || "",
      });
    }

    loadUser();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);

    const { error } = await supabaseClient.auth.updateUser({
      data: {
        username: formData.name,
        role: formData.role,
        bio: formData.bio,
      },
    });

    setSaving(false);

    if (error) {
      alert(error.message);
      return;
    }

    navigate("/profile");
  }

  return (
    <div className="profile-edit-container">

      <button
        className="profile-back-button"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>
      
      <h2>Edit Profile</h2>

      <form className="profile-edit-form" onSubmit={handleSubmit}>
        <label>
          Full Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            disabled
            placeholder="Enter your email"
          />
        </label>

        <label>
          Role
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Enter your role"
          />
        </label>

        <label>
          Bio
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell us about yourself"
            rows="4"
          />
        </label>

        <div className="profile-edit-buttons">
          <button type="button" onClick={() => navigate("/profile")}>
            Cancel
          </button>
          <button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}