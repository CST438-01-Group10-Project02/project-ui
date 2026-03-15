import { useNavigate, Link } from "react-router-dom";
import background from "../assets/dashboard-bg.png";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    sessionStorage.removeItem("token");
    navigate("/sign-in");
  };

  return (
    <div
      style={{
      minHeight: "100vh",
      position: "relative",
      overflow: "hidden",
      backgroundImage: `url(${background})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      fontFamily: "system-ui, sans-serif",
      padding: "50px 24px",
      }}
    >

      <div
        style={{
          position: "absolute",
          top: "-120px",
          left: "-100px",
          width: "280px",
          height: "280px",
          background: "rgba(59, 130, 246, 0.18)",
          borderRadius: "50%",
          filter: "blur(70px)",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: "-120px",
          right: "-80px",
          width: "320px",
          height: "320px",
          background: "rgba(139, 92, 246, 0.16)",
          borderRadius: "50%",
          filter: "blur(80px)",
        }}
      />

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            background: "rgba(255, 255, 255, 0.82)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.5)",
            borderRadius: "24px",
            boxShadow: "0 18px 40px rgba(15, 23, 42, 0.08)",
            padding: "32px",
            marginBottom: "28px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: "2.6rem",
                fontWeight: "800",
                color: "#0f172a",
              }}
            >
              Event Manager Dashboard
            </h1>
            <p
              style={{
                margin: "10px 0 0 0",
                color: "#475569",
                fontSize: "1.05rem",
              }}
            >
              Manage your events, invitations, and profile in one place.
            </p>
          </div>

          <button
            onClick={handleSignOut}
            style={{
              background: "#ef4444",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              padding: "12px 18px",
              fontSize: "0.95rem",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 8px 20px rgba(239, 68, 68, 0.22)",
            }}
          >
            Sign Out
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "20px",
            marginBottom: "28px",
          }}
        >
          <StatCard title="Total Events" value="12" subtitle="2 added this week" />
          <StatCard title="Invitations Sent" value="84" subtitle="14 pending replies" />
          <StatCard title="Upcoming Events" value="3" subtitle="Next one this Friday" />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "24px",
            marginBottom: "28px",
          }}
        >
          <DashboardCard
            title="Events"
            description="View, organize, and manage all of your upcoming events."
            buttonText="Open Events"
            to="/events"
          />

          <DashboardCard
            title="Create Event"
            description="Set up a brand new event and start inviting attendees."
            buttonText="Create Now"
            to="/events/new"
          />

          <DashboardCard
            title="Profile"
            description="Update your account details and manage your personal settings."
            buttonText="View Profile"
            to="/profile"
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr",
            gap: "24px",
          }}
        >
          <Panel title="Recent Activity">
            <ActivityItem
              title='Created "Spring Networking Event"'
              time="2 hours ago"
            />
            <ActivityItem
              title="Sent 12 invitations"
              time="Yesterday"
            />
            <ActivityItem
              title='Updated profile information'
              time="2 days ago"
            />
            <ActivityItem
              title='Received RSVP for "Startup Mixer"'
              time="3 days ago"
            />
          </Panel>

          <Panel title="Upcoming Schedule">
            <ScheduleItem
              event="Startup Mixer"
              date="Friday, 6:00 PM"
            />
            <ScheduleItem
              event="Career Meetup"
              date="Monday, 4:30 PM"
            />
            <ScheduleItem
              event="Product Demo Night"
              date="Next Thursday, 7:00 PM"
            />
          </Panel>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, subtitle }) {
  return (
    <div
      style={{
        background: "rgba(255, 255, 255, 0.88)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderRadius: "20px",
        padding: "24px",
        border: "1px solid rgba(255,255,255,0.7)",
        boxShadow: "0 10px 28px rgba(15, 23, 42, 0.08)",
      }}
    >
      <p
        style={{
          margin: 0,
          color: "#64748b",
          fontSize: "0.95rem",
          fontWeight: "600",
        }}
      >
        {title}
      </p>

      <h2
        style={{
          margin: "10px 0 8px 0",
          fontSize: "2rem",
          color: "#0f172a",
        }}
      >
        {value}
      </h2>

      <p
        style={{
          margin: 0,
          color: "#475569",
          fontSize: "0.95rem",
        }}
      >
        {subtitle}
      </p>
    </div>
  );
}

function DashboardCard({ title, description, buttonText, to }) {
  return (
    <div
      style={{
        background: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderRadius: "20px",
        padding: "28px",
        border: "1px solid rgba(255,255,255,0.7)",
        boxShadow: "0 10px 28px rgba(15, 23, 42, 0.08)",
        minHeight: "220px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 18px 34px rgba(15, 23, 42, 0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 10px 28px rgba(15, 23, 42, 0.08)";
      }}
    >
      <div>
        <h3
          style={{
            marginTop: 0,
            marginBottom: "14px",
            fontSize: "1.35rem",
            color: "#0f172a",
          }}
        >
          {title}
        </h3>

        <p
          style={{
            color: "#475569",
            lineHeight: "1.6",
            margin: 0,
          }}
        >
          {description}
        </p>
      </div>

      <div style={{ marginTop: "24px" }}>
        <Link
          to={to}
          style={{
            display: "inline-block",
            textDecoration: "none",
            background: "#2563eb",
            color: "#fff",
            padding: "10px 16px",
            borderRadius: "10px",
            fontWeight: "600",
            boxShadow: "0 8px 18px rgba(37, 99, 235, 0.18)",
          }}
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
}

function Panel({ title, children }) {
  return (
    <div
      style={{
        background: "rgba(255, 255, 255, 0.88)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderRadius: "22px",
        padding: "28px",
        border: "1px solid rgba(255,255,255,0.7)",
        boxShadow: "0 10px 28px rgba(15, 23, 42, 0.08)",
      }}
    >
      <h3
        style={{
          marginTop: 0,
          marginBottom: "20px",
          fontSize: "1.35rem",
          color: "#0f172a",
        }}
      >
        {title}
      </h3>

      {children}
    </div>
  );
}

function ActivityItem({ title, time }) {
  return (
    <div
      style={{
        padding: "14px 0",
        borderBottom: "1px solid #e2e8f0",
      }}
    >
      <p
        style={{
          margin: 0,
          color: "#0f172a",
          fontWeight: "600",
        }}
      >
        {title}
      </p>
      <p
        style={{
          margin: "6px 0 0 0",
          color: "#64748b",
          fontSize: "0.92rem",
        }}
      >
        {time}
      </p>
    </div>
  );
}

function ScheduleItem({ event, date }) {
  return (
    <div
      style={{
        padding: "14px 0",
        borderBottom: "1px solid #e2e8f0",
      }}
    >
      <p
        style={{
          margin: 0,
          color: "#0f172a",
          fontWeight: "600",
        }}
      >
        {event}
      </p>
      <p
        style={{
          margin: "6px 0 0 0",
          color: "#64748b",
          fontSize: "0.92rem",
        }}
      >
        {date}
      </p>
    </div>
  );
}