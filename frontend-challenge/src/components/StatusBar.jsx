import { useTheme } from "../context/ThemeContext";

export default function StatusBar({ stats }) {
  const { colors, isDark } = useTheme();

  const items = [
    { label: "Sub-Agents", value: stats.subAgents },
    { label: "Parallel Executions", value: stats.parallelExecutions },
    { label: "Operations", value: stats.operations },
  ];

  const vulnerabilities = [
    {
      label: "Critical",
      value: stats.vulnerabilities.critical,
      color: "#EF4444",
    },
    { label: "High", value: stats.vulnerabilities.high, color: "#F97316" },
    { label: "Medium", value: stats.vulnerabilities.medium, color: "#F59E0B" },
    { label: "Low", value: stats.vulnerabilities.low, color: "#10B981" },
  ];

  return (
    <div
      style={{
        backgroundColor: isDark ? "#0A0A0A" : "#F9FAFB",
        borderTop: `1px solid ${colors.border}`,
        padding: "12px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "24px",
        minHeight: "48px",
        overflowX: "auto",
        flexWrap: "wrap",
      }}
    >
      <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
        {items.map((item) => (
          <div
            key={item.label}
            style={{ display: "flex", gap: "8px", alignItems: "center" }}
          >
            <span style={{ fontSize: "13px", color: colors.textSecondary }}>
              {item.label}:
            </span>
            <span
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: colors.text,
              }}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
        {vulnerabilities.map((vuln) => (
          <div
            key={vuln.label}
            style={{ display: "flex", gap: "6px", alignItems: "center" }}
          >
            <span
              style={{ fontSize: "13px", color: vuln.color, fontWeight: "500" }}
            >
              {vuln.label}:
            </span>
            <span
              style={{ fontSize: "14px", fontWeight: "700", color: vuln.color }}
            >
              {vuln.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
