import { useTheme } from "../context/ThemeContext";
import { useEffect } from "react";

export default function Toast({
  message,
  type = "success",
  isVisible,
  onClose,
}) {
  const { colors } = useTheme();

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const bgColor =
    type === "success"
      ? "#10B981"
      : type === "error"
        ? "#EF4444"
        : colors.accent;

  return (
    <div
      style={{
        position: "fixed",
        top: "24px",
        right: "24px",
        backgroundColor: bgColor,
        color: "#FFFFFF",
        padding: "16px 24px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        zIndex: 1001,
        fontSize: "14px",
        fontWeight: "500",
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <span>{type === "success" ? "✅" : type === "error" ? "❌" : "ℹ️"}</span>
      <span>{message}</span>
    </div>
  );
}
