import { useTheme } from "../context/ThemeContext";

export default function Modal({ isOpen, onClose, title, children }) {
  const { colors } = useTheme();

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        animation: "fadeIn 0.2s ease",
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: colors.card,
          borderRadius: "12px",
          padding: "24px",
          maxWidth: "500px",
          width: "90%",
          border: `1px solid ${colors.border}`,
          animation: "slideIn 0.3s ease",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h2
            style={{
              fontSize: "18px",
              fontWeight: "600",
              color: colors.text,
              margin: 0,
            }}
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            style={{
              border: "none",
              background: "none",
              fontSize: "24px",
              cursor: "pointer",
              color: colors.textSecondary,
              padding: 0,
              lineHeight: 1,
              transition: "color 0.15s ease",
            }}
            onMouseEnter={(e) => (e.target.style.color = colors.text)}
            onMouseLeave={(e) => (e.target.style.color = colors.textSecondary)}
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
