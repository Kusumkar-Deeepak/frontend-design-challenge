import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    localStorage.setItem("theme", !isDark ? "dark" : "light");
  };

  const theme = {
    isDark,
    toggleTheme,
    colors: {
      bg: isDark ? "#0F0F0F" : "#F5F7FA",
      sidebar: isDark ? "#121212" : "#FFFFFF",
      card: isDark ? "#1A1A1A" : "#FFFFFF",
      table: isDark ? "#1E1E1E" : "#FFFFFF",
      border: isDark ? "#2A2A2A" : "#E5E7EB",
      text: isDark ? "#F3F4F6" : "#111827",
      textSecondary: isDark ? "#9CA3AF" : "#6B7280",
      accent: "#0CC8A8",
      hover: isDark ? "#252525" : "#F9FAFB",
    },
  };

  return (
    <ThemeContext.Provider value={theme}>
      <div
        style={{
          backgroundColor: theme.colors.bg,
          minHeight: "100vh",
          color: theme.colors.text,
          transition: "background-color 0.2s",
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
