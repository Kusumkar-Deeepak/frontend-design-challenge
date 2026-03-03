import { useTheme } from "../context/ThemeContext";

export default function StepIndicator({ steps, currentStep }) {
  const { colors } = useTheme();

  const getStepStatus = (index) => {
    if (index < currentStep) return "completed";
    if (index === currentStep) return "active";
    return "inactive";
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "24px",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {steps.map((step, index) => {
        const status = getStepStatus(index);
        const isActive = status === "active";
        const isCompleted = status === "completed";

        return (
          <div
            key={step}
            style={{ display: "flex", alignItems: "center", gap: "24px" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  backgroundColor: isActive
                    ? colors.accent + "20"
                    : isCompleted
                      ? colors.accent + "15"
                      : colors.hover,
                  border: `2px solid ${isActive || isCompleted ? colors.accent : colors.border}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                  color:
                    isActive || isCompleted
                      ? colors.accent
                      : colors.textSecondary,
                  fontWeight: "600",
                  boxShadow: isActive ? `0 0 20px ${colors.accent}40` : "none",
                  transition: "all 0.3s ease",
                }}
              >
                {isCompleted ? "✓" : index + 1}
              </div>
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: isActive ? "600" : "400",
                  color:
                    isActive || isCompleted
                      ? colors.text
                      : colors.textSecondary,
                  textAlign: "center",
                }}
              >
                {step}
              </div>
            </div>

            {index < steps.length - 1 && (
              <div
                style={{
                  width: "40px",
                  height: "2px",
                  backgroundColor: isCompleted ? colors.accent : colors.border,
                  transition: "background-color 0.3s ease",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
