import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import ProgressCircle from "../components/ProgressCircle";
import StepIndicator from "../components/StepIndicator";
import LogPanel from "../components/LogPanel";
import FindingCard from "../components/FindingCard";
import StatusBar from "../components/StatusBar";

export default function ScanDetail({ scan, onBack, onExport, onStop }) {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState("activity");
  const [isMobile] = useState(window.innerWidth < 768);

  if (!scan) {
    return (
      <div style={{ padding: "24px", color: "#EF4444" }}>
        Error: No scan data provided
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Breadcrumb Header */}
      <div
        style={{
          height: "60px",
          backgroundColor: colors.card,
          borderBottom: `1px solid ${colors.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          gap: "16px",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "14px",
          }}
        >
          <button
            onClick={onBack}
            style={{
              background: "none",
              border: "none",
              color: colors.text,
              cursor: "pointer",
              padding: "8px",
              fontSize: "18px",
              fontWeight: "600",
              lineHeight: 1,
              borderRadius: "6px",
              transition: "all 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = colors.hover;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "transparent";
            }}
            title="Close"
          >
            ✕
          </button>
          <span style={{ color: colors.textSecondary }}>/</span>
          <span style={{ color: colors.textSecondary }}>Scans</span>
          <span style={{ color: colors.textSecondary }}>/</span>
          <span style={{ color: colors.accent, fontWeight: "500" }}>
            {scan.name}
          </span>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={onExport}
            style={{
              height: "38px",
              padding: "0 16px",
              border: `1px solid ${colors.border}`,
              borderRadius: "8px",
              backgroundColor: "transparent",
              color: colors.text,
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            {isMobile ? "📄" : "Export Report"}
          </button>
          <button
            onClick={onStop}
            style={{
              height: "38px",
              padding: "0 16px",
              border: "none",
              borderRadius: "8px",
              backgroundColor: "#EF4444",
              color: "#FFFFFF",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            {isMobile ? "⏹️" : "Stop Scan"}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          padding: isMobile ? "16px" : "24px",
          backgroundColor: colors.bg,
          overflowY: "auto",
        }}
      >
        {/* Progress Section */}
        <div
          style={{
            backgroundColor: colors.card,
            border: `1px solid ${colors.border}`,
            borderRadius: "12px",
            padding: isMobile ? "20px" : "32px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "auto 1fr",
              gap: "32px",
              alignItems: "center",
              marginBottom: "32px",
            }}
          >
            <ProgressCircle progress={scan.progress} status={scan.status} />
            <div style={{ flex: 1 }}>
              <StepIndicator
                steps={scan.steps}
                currentStep={scan.currentStep}
              />
            </div>
          </div>

          {/* Metadata Row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "20px",
              paddingTop: "24px",
              borderTop: `1px solid ${colors.border}`,
            }}
          >
            <MetadataItem label="Scan Type" value={scan.type} colors={colors} />
            <MetadataItem label="Targets" value={scan.target} colors={colors} />
            <MetadataItem
              label="Started At"
              value={scan.startedAt}
              colors={colors}
            />
            <MetadataItem
              label="Credentials"
              value={scan.credentials}
              colors={colors}
            />
            <MetadataItem label="Files" value={scan.files} colors={colors} />
            <MetadataItem
              label="Checklists"
              value={scan.checklists}
              colors={colors}
            />
          </div>
        </div>

        {/* Split Console Section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 400px",
            gap: "24px",
            marginBottom: "24px",
          }}
        >
          {/* Left: Live Scan Console */}
          <div
            style={{
              backgroundColor: colors.card,
              border: `1px solid ${colors.border}`,
              borderRadius: "12px",
              padding: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "16px",
              }}
            >
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: colors.text,
                  flex: 1,
                }}
              >
                Live Scan Console
              </h3>
              <span
                style={{
                  fontSize: "12px",
                  color: "#10B981",
                  backgroundColor: "#10B98120",
                  padding: "4px 12px",
                  borderRadius: "999px",
                  fontWeight: "500",
                }}
              >
                Running...
              </span>
            </div>

            <div
              style={{
                marginBottom: "16px",
                borderBottom: `1px solid ${colors.border}`,
              }}
            >
              <div style={{ display: "flex", gap: "24px" }}>
                <button
                  onClick={() => setActiveTab("activity")}
                  style={{
                    background: "none",
                    border: "none",
                    padding: "12px 0",
                    fontSize: "14px",
                    fontWeight: activeTab === "activity" ? "600" : "400",
                    color:
                      activeTab === "activity"
                        ? colors.accent
                        : colors.textSecondary,
                    cursor: "pointer",
                    borderBottom:
                      activeTab === "activity"
                        ? `2px solid ${colors.accent}`
                        : "2px solid transparent",
                    transition: "all 0.15s ease",
                  }}
                >
                  Activity Log
                </button>
                <button
                  onClick={() => setActiveTab("verification")}
                  style={{
                    background: "none",
                    border: "none",
                    padding: "12px 0",
                    fontSize: "14px",
                    fontWeight: activeTab === "verification" ? "600" : "400",
                    color:
                      activeTab === "verification"
                        ? colors.accent
                        : colors.textSecondary,
                    cursor: "pointer",
                    borderBottom:
                      activeTab === "verification"
                        ? `2px solid ${colors.accent}`
                        : "2px solid transparent",
                    transition: "all 0.15s ease",
                  }}
                >
                  Verification Loops
                </button>
              </div>
            </div>

            {activeTab === "activity" ? (
              <LogPanel logs={scan.activityLog} />
            ) : (
              <div
                style={{
                  height: "400px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: colors.textSecondary,
                  fontSize: "14px",
                }}
              >
                No verification loops running
              </div>
            )}
          </div>

          {/* Right: Finding Log */}
          <div
            style={{
              backgroundColor: colors.card,
              border: `1px solid ${colors.border}`,
              borderRadius: "12px",
              padding: "20px",
              maxHeight: "600px",
              overflowY: "auto",
            }}
          >
            <h3
              style={{
                fontSize: "16px",
                fontWeight: "600",
                color: colors.text,
                marginBottom: "16px",
              }}
            >
              Finding Log
            </h3>

            {scan.findings.length > 0 ? (
              scan.findings.map((finding) => (
                <FindingCard key={finding.id} finding={finding} />
              ))
            ) : (
              <div
                style={{
                  padding: "48px 24px",
                  textAlign: "center",
                  color: colors.textSecondary,
                  fontSize: "14px",
                }}
              >
                No findings yet
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <StatusBar stats={scan.stats} />
    </div>
  );
}

function MetadataItem({ label, value, colors }) {
  return (
    <div>
      <div
        style={{
          fontSize: "12px",
          color: colors.textSecondary,
          marginBottom: "4px",
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: "14px", fontWeight: "600", color: colors.text }}>
        {value}
      </div>
    </div>
  );
}
