import { useTheme } from "../context/ThemeContext";

export default function SeverityCards({ data }) {
  const { colors } = useTheme();

  const cards = [
    {
      label: "Critical Severity",
      count: data.critical,
      change: "+2%",
      changeText: "increase than yesterday",
      color: "#EF4444",
      icon: "⚠️",
    },
    {
      label: "High Severity",
      count: data.high,
      change: "+5%",
      changeText: "increase than yesterday",
      color: "#F97316",
      icon: "⬆️",
    },
    {
      label: "Medium Severity",
      count: data.medium,
      change: "-3%",
      changeText: "decrease than yesterday",
      color: "#F59E0B",
      icon: "➖",
    },
    {
      label: "Low Severity",
      count: data.low,
      change: "+8%",
      changeText: "increase than yesterday",
      color: "#10B981",
      icon: "✓",
    },
  ];

  return (
    <div
      style={{
        backgroundColor: colors.card,
        border: `1px solid ${colors.border}`,
        borderRadius: "12px",
        padding: "20px",
        marginBottom: "24px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
        }}
      >
        {cards.map((card) => (
          <div
            key={card.label}
            style={{
              padding: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "16px",
              }}
            >
              <span
                style={{
                  fontSize: "14px",
                  color: colors.text,
                  fontWeight: "500",
                }}
              >
                {card.label}
              </span>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: card.color + "15",
                  borderRadius: "8px",
                  fontSize: "18px",
                }}
              >
                {card.icon}
              </div>
            </div>

            <div
              style={{
                fontSize: "36px",
                fontWeight: "700",
                color: colors.text,
                marginBottom: "12px",
                lineHeight: "1",
              }}
            >
              {card.count}
            </div>

            <div
              style={{
                fontSize: "13px",
                color: colors.textSecondary,
                fontWeight: "400",
              }}
            >
              <span
                style={{
                  color: card.change.startsWith("+") ? "#EF4444" : "#10B981",
                  fontWeight: "500",
                }}
              >
                {card.change.startsWith("+") ? "↑" : "↓"} {card.change}
              </span>{" "}
              {card.changeText}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
