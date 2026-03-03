import { useTheme } from "../context/ThemeContext";
import { useState } from "react";

export default function FindingCard({ finding }) {
  const { colors } = useTheme();
  const [expanded, setExpanded] = useState(false);

  const severityColors = {
    Critical: { bg: "#FEE2E2", text: "#991B1B", border: "#EF4444" },
    High: { bg: "#FFEDD5", text: "#9A3412", border: "#F97316" },
    Medium: { bg: "#FEF3C7", text: "#92400E", border: "#F59E0B" },
    Low: { bg: "#D1FAE5", text: "#065F46", border: "#10B981" },
  };

  const severityColor =
    severityColors[finding.severity] || severityColors.Medium;

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      style={{
        backgroundColor: colors.card,
        border: `1px solid ${colors.border}`,
        borderRadius: "12px",
        padding: "16px",
        marginBottom: "12px",
        cursor: "pointer",
        transition: "all 0.15s ease",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "start",
          marginBottom: "12px",
        }}
      >
        <span
          style={{
            display: "inline-block",
            padding: "4px 12px",
            borderRadius: "999px",
            backgroundColor: severityColor.bg,
            color: severityColor.text,
            fontSize: "12px",
            fontWeight: "600",
            border: `1px solid ${severityColor.border}`,
          }}
        >
          {finding.severity}
        </span>
        <span style={{ fontSize: "12px", color: colors.textSecondary }}>
          {finding.time}
        </span>
      </div>

      <h3
        style={{
          fontSize: "15px",
          fontWeight: "600",
          color: colors.text,
          marginBottom: "8px",
          lineHeight: "1.4",
        }}
      >
        {finding.title}
      </h3>

      <div
        style={{
          fontSize: "13px",
          color: colors.accent,
          backgroundColor: colors.hover,
          padding: "6px 10px",
          borderRadius: "6px",
          fontFamily: "'Courier New', monospace",
          marginBottom: "8px",
          wordBreak: "break-all",
        }}
      >
        {finding.endpoint}
      </div>

      {expanded && (
        <p
          style={{
            fontSize: "14px",
            color: colors.textSecondary,
            lineHeight: "1.6",
            marginTop: "12px",
            paddingTop: "12px",
            borderTop: `1px solid ${colors.border}`,
          }}
        >
          {finding.description}
        </p>
      )}

      <div
        style={{
          fontSize: "12px",
          color: colors.textSecondary,
          marginTop: "8px",
          textAlign: "center",
        }}
      >
        {expanded ? "Click to collapse ▲" : "Click to expand ▼"}
      </div>
    </div>
  );
}
