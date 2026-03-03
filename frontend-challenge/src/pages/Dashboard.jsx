import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import Sidebar from "../components/Sidebar";
import OrgBar from "../components/OrgBar";
import SeverityCards from "../components/SeverityCards";
import ScanTable from "../components/ScanTable";
import Modal from "../components/Modal";
import Toast from "../components/Toast";
import scanData from "../data/mockScans.json";

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
        onNavigate={setActivePage}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div
        style={{
          marginLeft: window.innerWidth > 768 ? "260px" : "0",
          flex: 1,
          minWidth: 0,
          transition: "margin-left 0.2s ease",
        }}
      >
        <OrgBar
          stats={stats}
          onExport={handleExport}
          onStopScan={handleStopScan}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        />

        <main style={{ padding: window.innerWidth > 768 ? "24px" : "16px" }}>
          <SeverityCards data={totalVulns} />
          <ScanTable
            scans={scanData}
            onRowClick={handleRowClick}
            onNewScan={handleNewScan}
          />
        </main>
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

      {/* Scan Detail Modal */}
      <Modal
        isOpen={showScanDetail}
        onClose={() => setShowScanDetail(false)}
        title={selectedScan?.name || "Scan Details"}
      >
        {selectedScan && (
          <div>
            <div style={{ marginBottom: "20px" }}>
              <div
                style={{
                  fontSize: "14px",
                  color: colors.textSecondary,
                  marginBottom: "8px",
                }}
              >
                Scan Type
              </div>
              <div
                style={{
                  fontSize: "16px",
                  color: colors.text,
                  fontWeight: "500",
                }}
              >
                {selectedScan.type}
              </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <div
                style={{
                  fontSize: "14px",
                  color: colors.textSecondary,
                  marginBottom: "8px",
                }}
              >
                Status
              </div>
              <div
                style={{
                  fontSize: "16px",
                  color: colors.text,
                  fontWeight: "500",
                }}
              >
                {selectedScan.status} - {selectedScan.progress}%
              </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <div
                style={{
                  fontSize: "14px",
                  color: colors.textSecondary,
                  marginBottom: "12px",
                }}
              >
                Vulnerabilities Found
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    padding: "12px",
                    backgroundColor: colors.hover,
                    borderRadius: "8px",
                  }}
                >
                  <div
                    style={{ fontSize: "12px", color: colors.textSecondary }}
                  >
                    Critical Severity
                  </div>
                  <div
                    style={{
                      fontSize: "24px",
                      fontWeight: "700",
                      color: "#EF4444",
                    }}
                  >
                    {selectedScan.vulnerabilities.critical}
                  </div>
                </div>
                <div
                  style={{
                    padding: "12px",
                    backgroundColor: colors.hover,
                    borderRadius: "8px",
                  }}
                >
                  <div
                    style={{ fontSize: "12px", color: colors.textSecondary }}
                  >
                    High Severity
                  </div>
                  <div
                    style={{
                      fontSize: "24px",
                      fontWeight: "700",
                      color: "#F97316",
                    }}
                  >
                    {selectedScan.vulnerabilities.high}
                  </div>
                </div>
                <div
                  style={{
                    padding: "12px",
                    backgroundColor: colors.hover,
                    borderRadius: "8px",
                  }}
                >
                  <div
                    style={{ fontSize: "12px", color: colors.textSecondary }}
                  >
                    Medium Severity
                  </div>
                  <div
                    style={{
                      fontSize: "24px",
                      fontWeight: "700",
                      color: "#F59E0B",
                    }}
                  >
                    {selectedScan.vulnerabilities.medium}
                  </div>
                </div>
                <div
                  style={{
                    padding: "12px",
                    backgroundColor: colors.hover,
                    borderRadius: "8px",
                  }}
                >
                  <div
                    style={{ fontSize: "12px", color: colors.textSecondary }}
                  >
                    Low Severity
                  </div>
                  <div
                    style={{
                      fontSize: "24px",
                      fontWeight: "700",
                      color: "#10B981",
                    }}
                  >
                    {selectedScan.vulnerabilities.low}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div
                style={{
                  fontSize: "14px",
                  color: colors.textSecondary,
                  marginBottom: "8px",
                }}
              >
                Last Scanned
              </div>
              <div
                style={{
                  fontSize: "16px",
                  color: colors.text,
                  fontWeight: "500",
                }}
              >
                {selectedScan.lastScan}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* New Scan Modal */}
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
