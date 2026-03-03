import { useTheme } from "../context/ThemeContext";
import { useState } from "react";

export default function ScanTable({ scans, onRowClick }) {
  const { colors, isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredScans = scans.filter((scan) =>
    scan.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div>
      {/* Toolbar */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            flex: 1,
            position: "relative",
          }}
        >
          <input
            type="text"
            placeholder="Search scans..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 12px 10px 40px",
              border: `1px solid ${colors.border}`,
              borderRadius: "8px",
              backgroundColor: colors.card,
              color: colors.text,
              fontSize: "14px",
              outline: "none",
            }}
          />
          <span
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "16px",
            }}
          >
            🔍
          </span>
        </div>

        <button
          style={{
            padding: "10px 16px",
            border: `1px solid ${colors.border}`,
            borderRadius: "8px",
            backgroundColor: colors.card,
            color: colors.text,
            fontSize: "14px",
            fontWeight: "500",
            cursor: "pointer",
          }}
        >
          🎯 Filter
        </button>

        <button
          style={{
            padding: "10px 16px",
            border: `1px solid ${colors.border}`,
            borderRadius: "8px",
            backgroundColor: colors.card,
            color: colors.text,
            fontSize: "14px",
            fontWeight: "500",
            cursor: "pointer",
          }}
        >
          📋 Columns
        </button>

        <button
          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            backgroundColor: colors.accent,
            color: "#FFFFFF",
            fontSize: "14px",
            fontWeight: "500",
            cursor: "pointer",
          }}
        >
          ➕ New Scan
        </button>
      </div>

      {/* Table */}
      <div
        style={{
          backgroundColor: colors.table,
          border: `1px solid ${colors.border}`,
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1.2fr auto 110px",
            padding: "12px 20px",
            backgroundColor: isDark ? "#1A1A1A" : "#F9FAFB",
            borderBottom: `1px solid ${colors.border}`,
            fontSize: "12px",
            fontWeight: "500",
            color: colors.textSecondary,
            textTransform: "uppercase",
            letterSpacing: "0.04em",
          }}
        >
          <div>Scan Name</div>
          <div>Type</div>
          <div>Status</div>
          <div>Progress</div>
          <div>Vulnerabilities</div>
          <div style={{ textAlign: "right" }}>Last Scan</div>
        </div>

        {/* Rows */}
        {filteredScans.map((scan) => (
          <div
            key={scan.id}
            onClick={() => onRowClick(scan)}
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1.2fr auto 110px",
              padding: "14px 20px",
              borderBottom: `1px solid ${colors.border}`,
              cursor: "pointer",
              transition: "background-color 0.15s",
              alignItems: "center",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = colors.hover)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <div
              style={{
                fontSize: "14px",
                fontWeight: "500",
                color: colors.text,
              }}
            >
              {scan.name}
            </div>

            <div style={{ fontSize: "14px", color: colors.textSecondary }}>
              {scan.type}
            </div>

            <div>
              <StatusChip status={scan.status} />
            </div>

            <div>
              <ProgressBar progress={scan.progress} colors={colors} />
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
              <VulnBadge
                count={scan.vulnerabilities.critical}
                color="#EF4444"
              />
              <VulnBadge count={scan.vulnerabilities.high} color="#F97316" />
              <VulnBadge count={scan.vulnerabilities.medium} color="#F59E0B" />
              <VulnBadge count={scan.vulnerabilities.low} color="#10B981" />
            </div>

            <div
              style={{
                fontSize: "14px",
                color: colors.textSecondary,
                textAlign: "right",
              }}
            >
              {scan.lastScan}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusChip({ status }) {
  const styles = {
    Completed: { bg: "#DEF7EC", text: "#03543F" },
    Scheduled: { bg: "#E5E7EB", text: "#374151" },
    Failed: { bg: "#FDE8E8", text: "#9B1C1C" },
    Running: { bg: "#E0E7FF", text: "#3730A3" },
  };

  const style = styles[status] || styles.Scheduled;

  return (
    <span
      style={{
        display: "inline-block",
        padding: "4px 10px",
        borderRadius: "999px",
        backgroundColor: style.bg,
        color: style.text,
        fontSize: "12px",
        fontWeight: "500",
      }}
    >
      {status}
    </span>
  );
}

function ProgressBar({ progress, colors }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        maxWidth: "120px",
      }}
    >
      <div
        style={{
          flex: 1,
          height: "6px",
          backgroundColor: colors.border,
          borderRadius: "3px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            backgroundColor: colors.accent,
            borderRadius: "3px",
          }}
        ></div>
      </div>
      <span
        style={{
          fontSize: "12px",
          color: colors.textSecondary,
          minWidth: "35px",
        }}
      >
        {progress}%
      </span>
    </div>
  );
}

function VulnBadge({ count, color }) {
  return (
    <div
      style={{
        minWidth: "28px",
        height: "28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: color + "20",
        color: color,
        borderRadius: "6px",
        fontSize: "12px",
        fontWeight: "700",
      }}
    >
      {count}
    </div>
  );
}
