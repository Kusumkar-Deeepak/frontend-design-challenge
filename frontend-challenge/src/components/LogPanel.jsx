import { useTheme } from "../context/ThemeContext";
import { useEffect, useRef } from "react";

export default function LogPanel({ logs }) {
  const { colors, isDark } = useTheme();
  const logEndRef = useRef(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const formatLogLine = (line) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const apiRegex = /(\/api\/[^\s]+)/g;
    const errorRegex = /(error|failed|vulnerability|injection|xss|csrf)/gi;

    let formattedLine = line;

    // Highlight URLs
    formattedLine = formattedLine.replace(
      urlRegex,
      '<span style="color: #0E7490;">$1</span>',
    );

    // Highlight API paths
    formattedLine = formattedLine.replace(
      apiRegex,
      '<span style="color: #0E7490;">$1</span>',
    );

    // Highlight errors/findings
    formattedLine = formattedLine.replace(
      errorRegex,
      '<span style="color: #EF4444; font-weight: 600;">$1</span>',
    );

    return formattedLine;
  };

  return (
    <div
      style={{
        backgroundColor: isDark ? "#0F0F0F" : "#1A1A1A",
        borderRadius: "8px",
        padding: "12px",
        height: "360px",
        overflowY: "auto",
        fontFamily: "'Courier New', monospace",
        fontSize: "12px",
        lineHeight: "1.5",
        color: "#E5E7EB",
      }}
    >
      {logs.map((log, index) => (
        <div
          key={index}
          style={{
            marginBottom: "4px",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
          dangerouslySetInnerHTML={{ __html: formatLogLine(log) }}
        />
      ))}
      <div ref={logEndRef} />
    </div>
  );
}
