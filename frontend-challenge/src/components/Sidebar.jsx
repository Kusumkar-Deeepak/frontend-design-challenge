import { useTheme } from "../context/ThemeContext";

export default function Sidebar({ activePage, onNavigate }) {
  const { colors, isDark, toggleTheme } = useTheme();

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "projects", label: "Projects", icon: "📁" },
    { id: "scans", label: "Scans", icon: "🔍" },
    { id: "schedule", label: "Schedule", icon: "📅" },
    { id: "notifications", label: "Notifications", icon: "🔔" },
    { id: "settings", label: "Settings", icon: "⚙️" },
    { id: "support", label: "Support", icon: "💬" },
  ];

  return (
    <div
      style={{
        width: "260px",
        height: "100vh",
        backgroundColor: colors.sidebar,
        borderRight: `1px solid ${colors.border}`,
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        left: 0,
        top: 0,
      }}
    >
      {/* Logo */}
      <div
        style={{ padding: "24px", borderBottom: `1px solid ${colors.border}` }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: colors.accent,
            }}
          ></div>
          <span
            style={{ fontSize: "18px", fontWeight: "600", color: colors.text }}
          >
            aps
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: "16px 12px", overflow: "auto" }}>
        {navItems.map((item) => {
          const isActive = activePage === item.id;
          const showDivider = item.id === "schedule";
          return (
            <div key={item.id}>
              <button
                onClick={() => onNavigate(item.id)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 16px",
                  marginBottom: "4px",
                  border: "none",
                  borderRadius: "8px",
                  backgroundColor: isActive
                    ? isDark
                      ? "#1A3A3A"
                      : "#E6F7F4"
                    : "transparent",
                  borderLeft: isActive
                    ? `3px solid ${colors.accent}`
                    : "3px solid transparent",
                  color: isActive ? colors.accent : colors.textSecondary,
                  fontSize: "14px",
                  fontWeight: isActive ? "500" : "400",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  textAlign: "left",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.target.style.backgroundColor = colors.hover;
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.target.style.backgroundColor = "transparent";
                }}
              >
                <span style={{ fontSize: "18px" }}>{item.icon}</span>
                <span>{item.label}</span>
              </button>
              {showDivider && (
                <div
                  style={{
                    height: "1px",
                    backgroundColor: colors.border,
                    margin: "16px 0",
                  }}
                ></div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Theme Toggle & User */}
      <div style={{ padding: "16px", borderTop: `1px solid ${colors.border}` }}>
        <button
          onClick={toggleTheme}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "12px",
            border: `1px solid ${colors.border}`,
            borderRadius: "8px",
            backgroundColor: colors.card,
            color: colors.text,
            fontSize: "14px",
            cursor: "pointer",
            fontWeight: "500",
          }}
        >
          {isDark ? "☀️" : "🌙"} {isDark ? "Light" : "Dark"} Mode
        </button>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "12px",
            borderRadius: "8px",
            backgroundColor: colors.hover,
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              backgroundColor: colors.accent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFF",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            N
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: "14px",
                fontWeight: "500",
                color: colors.text,
              }}
            >
              Nammagiri
            </div>
            <div style={{ fontSize: "12px", color: colors.textSecondary }}>
              Admin
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
