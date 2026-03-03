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
        gap: "16px",
        flexWrap: "nowrap",
        justifyContent: "center",
        overflowX: "auto",
      }}
    >
      {steps.map((step, index) => {
        const status = getStepStatus(index);
        const isActive = status === "active";
        const isCompleted = status === "completed";

        return (
          <div
            key={step}
            style={{ display: "flex", alignItems: "center", gap: "16px" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
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
                  fontSize: "16px",
                  color:
                    isActive || isCompleted
                      ? colors.accent
                      : colors.textSecondary,
                  fontWeight: "600",
                  boxShadow: isActive ? `0 0 12px ${colors.accent}30` : "none",
                  transition: "all 0.3s ease",
                }}
              >
                {isCompleted ? "✓" : index + 1}
              </div>
              <div
                style={{
                  fontSize: "12px",
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
                  width: "32px",
                  height: "1.5px",
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
