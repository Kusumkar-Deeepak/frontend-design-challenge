import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import Sidebar from "../components/Sidebar";
import OrgBar from "../components/OrgBar";
import SeverityCards from "../components/SeverityCards";
import ScanTable from "../components/ScanTable";
import ScanDetail from "./ScanDetail";
import Modal from "../components/Modal";
import Toast from "../components/Toast";
import scanData from "../data/mockScans.json";
import scanDetailData from "../data/mockScanDetail.json";

export default function Dashboard() {
  const { colors } = useTheme();
  const [activePage, setActivePage] = useState("dashboard");
  const [showStopModal, setShowStopModal] = useState(false);
  const [showScanDetail, setShowScanDetail] = useState(false);
  const [showNewScanModal, setShowNewScanModal] = useState(false);
  const [selectedScan, setSelectedScan] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  });

  // Calculate stats
  const stats = {
    total: scanData.length,
    scheduled: scanData.filter((s) => s.status === "Scheduled").length,
    rescans: 12,
    failed: scanData.filter((s) => s.status === "Failed").length,
  };

  // Calculate total vulnerabilities
  const totalVulns = scanData.reduce(
    (acc, scan) => ({
      critical: acc.critical + scan.vulnerabilities.critical,
      high: acc.high + scan.vulnerabilities.high,
      medium: acc.medium + scan.vulnerabilities.medium,
      low: acc.low + scan.vulnerabilities.low,
    }),
    { critical: 0, high: 0, medium: 0, low: 0 },
  );

  const handleExport = () => {
    setToast({
      visible: true,
      message: "Report exported successfully!",
      type: "success",
    });
  };

  const handleStopScan = () => {
    setShowStopModal(true);
  };

  const confirmStopScan = () => {
    setShowStopModal(false);
    setToast({ visible: true, message: "Scan stopped", type: "error" });
  };

  const handleRowClick = (scan) => {
    setSelectedScan(scan);
    setShowScanDetail(true);
  };

  const handleBackToList = () => {
    setShowScanDetail(false);
    setSelectedScan(null);
  };

  const handlePageChange = (page) => {
    setActivePage(page);
    setShowScanDetail(false);
    setSelectedScan(null);
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  };

  const handleNewScan = () => {
    setShowNewScanModal(true);
  };

  const handleNewScanSubmit = (scanData) => {
    setShowNewScanModal(false);
    setToast({
      visible: true,
      message: "New scan created successfully!",
      type: "success",
    });
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: colors.bg,
      }}
    >
      <Sidebar
        activePage={activePage}
        onNavigate={handlePageChange}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div
        style={{
          marginLeft: window.innerWidth > 768 ? "260px" : "0",
          flex: 1,
          minWidth: 0,
          transition: "margin-left 0.2s ease",
          position: "relative",
          display: "flex",
        }}
      >
        {/* Main Dashboard Content */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            transition: "all 0.3s ease",
            opacity: showScanDetail ? 0.5 : 1,
          }}
        >
          {activePage !== "scans" && (
            <OrgBar
              stats={stats}
              onExport={handleExport}
              onStopScan={handleStopScan}
              onMenuClick={() => setSidebarOpen(!sidebarOpen)}
              currentPage={activePage}
            />
          )}

          <main
            style={{
              padding:
                activePage === "scans"
                  ? "0"
                  : window.innerWidth > 768
                    ? "24px"
                    : "16px",
              animation: "fadeIn 0.3s ease",
            }}
          >
            {activePage === "dashboard" && (
              <>
                <SeverityCards data={totalVulns} />
                <ScanTable
                  scans={scanData}
                  onRowClick={handleRowClick}
                  onNewScan={handleNewScan}
                  selectedScanId={selectedScan?.id}
                />
              </>
            )}

            {activePage === "scans" && (
              <ScanDetail
                scan={scanDetailData}
                onBack={() => setActivePage("dashboard")}
                onExport={handleExport}
                onStop={handleStopScan}
              />
            )}

            {[
              "projects",
              "schedule",
              "notifications",
              "settings",
              "support",
            ].includes(activePage) && (
              <div
                style={{
                  padding: "48px 24px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "64px",
                    marginBottom: "16px",
                  }}
                >
                  {activePage === "projects" && "📁"}
                  {activePage === "schedule" && "📅"}
                  {activePage === "notifications" && "🔔"}
                  {activePage === "settings" && "⚙️"}
                  {activePage === "support" && "💬"}
                </div>
                <h2
                  style={{
                    fontSize: "24px",
                    fontWeight: "600",
                    color: colors.text,
                    marginBottom: "8px",
                    textTransform: "capitalize",
                  }}
                >
                  {activePage}
                </h2>
                <p
                  style={{
                    fontSize: "14px",
                    color: colors.textSecondary,
                  }}
                >
                  This section is coming soon
                </p>
              </div>
            )}
          </main>
        </div>

        {/* Side Panel for Scan Detail */}
        <div
          style={{
            position: "fixed",
            right: showScanDetail ? "0" : "-100%",
            top: 0,
            width:
              window.innerWidth > 1200
                ? "65%"
                : window.innerWidth > 768
                  ? "75%"
                  : "100%",
            maxWidth: "900px",
            minWidth: window.innerWidth > 768 ? "600px" : "100%",
            height: "100vh",
            backgroundColor: colors.bg,
            boxShadow: showScanDetail
              ? "-4px 0 24px rgba(0, 0, 0, 0.15)"
              : "none",
            transition: "right 0.3s ease",
            zIndex: 1001,
            overflowY: "auto",
          }}
        >
          {showScanDetail && (
            <ScanDetail
              scan={scanDetailData}
              onBack={handleBackToList}
              onExport={handleExport}
              onStop={handleStopScan}
            />
          )}
        </div>

        {/* Overlay */}
        {showScanDetail && (
          <div
            onClick={handleBackToList}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              zIndex: 1000,
              animation: "fadeIn 0.3s ease",
              marginLeft: window.innerWidth > 768 ? "260px" : "0",
            }}
          />
        )}
      </div>

      {/* Stop Scan Confirmation Modal */}
      <Modal
        isOpen={showStopModal}
        onClose={() => setShowStopModal(false)}
        title="Stop Running Scan"
      >
        <p
          style={{
            color: colors.textSecondary,
            marginBottom: "24px",
            lineHeight: "1.6",
          }}
        >
          Are you sure you want to stop the current scan? This action cannot be
          undone and you will lose all progress.
        </p>
        <div
          style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}
        >
          <button
            onClick={() => setShowStopModal(false)}
            style={{
              padding: "10px 20px",
              border: `1px solid ${colors.border}`,
              borderRadius: "8px",
              backgroundColor: "transparent",
              color: colors.text,
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = colors.hover)
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "transparent")
            }
          >
            Cancel
          </button>
          <button
            onClick={confirmStopScan}
            style={{
              padding: "10px 20px",
              border: "none",
              borderRadius: "8px",
              backgroundColor: "#EF4444",
              color: "#FFFFFF",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#DC2626")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#EF4444")}
          >
            Stop Scan
          </button>
        </div>
      </Modal>

      {/* Toast Notification */}
      <Modal
        isOpen={showNewScanModal}
        onClose={() => setShowNewScanModal(false)}
        title="Create New Scan"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "500",
                color: colors.text,
                marginBottom: "8px",
              }}
            >
              Scan Name
            </label>
            <input
              type="text"
              placeholder="e.g., Web App Servers"
              style={{
                width: "100%",
                padding: "10px 12px",
                border: `1px solid ${colors.border}`,
                borderRadius: "8px",
                backgroundColor: colors.card,
                color: colors.text,
                fontSize: "14px",
                outline: "none",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "500",
                color: colors.text,
                marginBottom: "8px",
              }}
            >
              Scan Type
            </label>
            <select
              style={{
                width: "100%",
                padding: "10px 12px",
                border: `1px solid ${colors.border}`,
                borderRadius: "8px",
                backgroundColor: colors.card,
                color: colors.text,
                fontSize: "14px",
                outline: "none",
              }}
            >
              <option>Greybox</option>
              <option>Blackbox</option>
              <option>Whitebox</option>
            </select>
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "500",
                color: colors.text,
                marginBottom: "8px",
              }}
            >
              Target URL
            </label>
            <input
              type="text"
              placeholder="https://example.com"
              style={{
                width: "100%",
                padding: "10px 12px",
                border: `1px solid ${colors.border}`,
                borderRadius: "8px",
                backgroundColor: colors.card,
                color: colors.text,
                fontSize: "14px",
                outline: "none",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "flex-end",
              marginTop: "8px",
            }}
          >
            <button
              onClick={() => setShowNewScanModal(false)}
              style={{
                padding: "10px 20px",
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
              Cancel
            </button>
            <button
              onClick={handleNewScanSubmit}
              style={{
                padding: "10px 20px",
                border: "none",
                borderRadius: "8px",
                backgroundColor: colors.accent,
                color: "#FFFFFF",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              Create Scan
            </button>
          </div>
        </div>
      </Modal>

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.visible}
        onClose={() => setToast({ ...toast, visible: false })}
      />
    </div>
  );
}

// Helper Components
function StatItem({ label, value, colors, isError = false }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px 0",
      }}
    >
      <span style={{ fontSize: "14px", color: colors.textSecondary }}>
        {label}
      </span>
      <span
        style={{
          fontSize: "16px",
          fontWeight: "600",
          color: isError ? "#EF4444" : colors.text,
        }}
      >
        {value}
      </span>
    </div>
  );
}

function ActionButton({ label, icon, onClick, colors, primary = false }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        padding: "12px 16px",
        backgroundColor: primary ? colors.accent : colors.bg,
        color: primary ? "#FFFFFF" : colors.text,
        border: primary ? "none" : `1px solid ${colors.border}`,
        borderRadius: "8px",
        fontSize: "14px",
        fontWeight: "500",
        cursor: "pointer",
        transition: "all 0.15s ease",
        textAlign: "left",
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}
      onMouseEnter={(e) => {
        if (primary) {
          e.target.style.backgroundColor = "#0BB597";
          e.target.style.transform = "translateY(-2px)";
          e.target.style.boxShadow = "0 4px 12px rgba(12, 200, 168, 0.3)";
        } else {
          e.target.style.backgroundColor = colors.hover;
        }
      }}
      onMouseLeave={(e) => {
        if (primary) {
          e.target.style.backgroundColor = colors.accent;
          e.target.style.transform = "translateY(0)";
          e.target.style.boxShadow = "none";
        } else {
          e.target.style.backgroundColor = colors.bg;
        }
      }}
    >
      <span style={{ fontSize: "18px" }}>{icon}</span>
      <span>{label}</span>
    </button>
  );
}
