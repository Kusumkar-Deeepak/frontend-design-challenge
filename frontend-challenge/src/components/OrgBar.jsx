import { useTheme } from "../context/ThemeContext";

export default function OrgBar({ stats, onExport, onStopScan }) {
  const { colors } = useTheme();

  return (
    <div style={{ backgroundColor: colors.card }}>
      {/* Breadcrumb Header */}
      <div
        style={{
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          borderBottom: `1px solid ${colors.border}`,
        }}
      >
        {/* Breadcrumb */}
        <div
          style={{ display: "flex", alignItems: "center", fontSize: "14px" }}
        >
          <span style={{ color: colors.textSecondary }}>Scan</span>
          <span style={{ color: colors.textSecondary, margin: "0 8px" }}>
            /
          </span>
          <span style={{ color: colors.textSecondary }}>Private Assets</span>
          <span style={{ color: colors.textSecondary, margin: "0 8px" }}>
            /
          </span>
          <span style={{ color: colors.accent, fontWeight: "500" }}>
            New Scan
          </span>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={onExport}
            style={{
              height: "38px",
              padding: "0 20px",
              border: `1px solid ${colors.border}`,
              borderRadius: "8px",
              backgroundColor: "transparent",
              color: colors.text,
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
            }}
          >
            Export Report
          </button>
          <button
            onClick={onStopScan}
            style={{
              height: "38px",
              padding: "0 20px",
              border: "none",
              borderRadius: "8px",
              backgroundColor: "#EF4444",
              color: "#FFFFFF",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
            }}
          >
            Stop Scan
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
