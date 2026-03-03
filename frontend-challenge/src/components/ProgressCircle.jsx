import { useTheme } from "../context/ThemeContext";

export default function ProgressCircle({ progress, status }) {
  const { colors } = useTheme();
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
      }}
    >
      <div style={{ position: "relative", width: "140px", height: "140px" }}>
        <svg width="140" height="140" style={{ transform: "rotate(-90deg)" }}>
          {/* Background circle */}
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke={colors.border}
            strokeWidth="8"
          />
          {/* Progress circle */}
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke={colors.accent}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.5s ease" }}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div
            style={{ fontSize: "28px", fontWeight: "700", color: colors.text }}
          >
            {progress}%
          </div>
        </div>
      </div>
      <div
        style={{
          fontSize: "14px",
          fontWeight: "500",
          color: colors.textSecondary,
        }}
      >
        {status}
      </div>
    </div>
  );
}
