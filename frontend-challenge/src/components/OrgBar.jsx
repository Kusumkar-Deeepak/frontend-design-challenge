import { useTheme } from "../context/ThemeContext";

export default function OrgBar({ stats, onExport, onStopScan, onMenuClick, currentPage = "dashboard" }) {
  const { colors } = useTheme();
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  const pageInfo = {
    dashboard: { icon: "📊", title: "Dashboard", subtitle: "Overview" },
    scans: { icon: "🔍", title: "Scans", subtitle: "Security Scans" },
    projects: { icon: "📁", title: "Projects", subtitle: "All Projects" },
    schedule: { icon: "📅", title: "Schedule", subtitle: "Scan Schedule" },
    notifications: { icon: "🔔", title: "Notifications", subtitle: "Alerts" },
    settings: { icon: "⚙️", title: "Settings", subtitle: "Configuration" },
    support: { icon: "💬", title: "Support", subtitle: "Help Center" },
  };

  const current = pageInfo[currentPage] || pageInfo.dashboard;

  return (
    <div style={{ backgroundColor: colors.card }}>
      {/* Breadcrumb Header */}
      <div
        style={{
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 16px",
          borderBottom: `1px solid ${colors.border}`,
          gap: "12px",
        }}
      >
        {/* Left: Menu + Breadcrumb */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flex: 1,
            minWidth: 0,
          }}
        >
          {isMobile && (
            <button
              onClick={onMenuClick}
              style={{
                background: "none",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
                color: colors.text,
                padding: "4px",
                display: "flex",
                alignItems: "center",
              }}
            >
              ☰
            </button>
          )}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "14px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              gap: "8px",
            }}
          >
            <span style={{ fontSize: "18px" }}>{current.icon}</span>
            <span style={{ color: colors.text, fontWeight: "600" }}>
              {current.title}
            </span>
            <span style={{ color: colors.textSecondary, fontSize: "12px" }}>
              / {current.subtitle}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
          <button
            onClick={onExport}
            style={{
              height: "38px",
              padding: "0 16px",
              border: `1px solid ${colors.border}`,
              borderRadius: "8px",
              backgroundColor: "transparent",
              color: colors.text,
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
              transition: "all 0.15s ease",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = colors.hover;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "transparent";
            }}
          >
            {isMobile ? "📄" : "Export Report"}
          </button>
          <button
            onClick={onStopScan}
            style={{
              height: "38px",
              padding: "0 16px",
              border: "none",
              borderRadius: "8px",
              backgroundColor: "#EF4444",
              color: "#FFFFFF",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
              transition: "all 0.15s ease",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#DC2626";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#EF4444";
            }}
          >
            {isMobile ? "⏹️" : "Stop Scan"}
          </button>
        </div>
      </div>

      {/* Compact Stats Row */}
      <div
        style={{
          minHeight: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 24px",
          borderBottom: `1px solid ${colors.border}`,
          fontSize: "14px",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ color: colors.textSecondary }}>Org:</span>
            <span style={{ color: colors.text, fontWeight: "600" }}>
              Project X
            </span>
          </div>

          <div
            style={{
              width: "1px",
              height: "16px",
              backgroundColor: colors.border,
            }}
          />

          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ color: colors.textSecondary }}>Owner:</span>
            <span style={{ color: colors.text, fontWeight: "600" }}>
              Nammagiri
            </span>
          </div>

          <div
            style={{
              width: "1px",
              height: "16px",
              backgroundColor: colors.border,
            }}
          />

          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ color: colors.textSecondary }}>Total Scans:</span>
            <span style={{ color: colors.text, fontWeight: "600" }}>
              {stats.total}
            </span>
          </div>

          <div
            style={{
              width: "1px",
              height: "16px",
              backgroundColor: colors.border,
            }}
          />

          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ color: colors.textSecondary }}>Scheduled:</span>
            <span style={{ color: colors.text, fontWeight: "600" }}>
              {stats.scheduled}
            </span>
          </div>

          <div
            style={{
              width: "1px",
              height: "16px",
              backgroundColor: colors.border,
            }}
          />

          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ color: colors.textSecondary }}>Rescans:</span>
            <span style={{ color: colors.text, fontWeight: "600" }}>
              {stats.rescans}
            </span>
          </div>

          <div
            style={{
              width: "1px",
              height: "16px",
              backgroundColor: colors.border,
            }}
          />

          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ color: colors.textSecondary }}>Failed:</span>
            <span style={{ color: colors.text, fontWeight: "600" }}>
              {stats.failed}
            </span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ color: colors.textSecondary }}>10 mins ago</span>
          <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              display: "flex",
              alignItems: "center",
              color: colors.accent,
              fontSize: "16px",
            }}
            onClick={() => window.location.reload()}
            title="Refresh"
          >
            🔄
          </button>
        </div>
      </div>
    </div>
  );
}
