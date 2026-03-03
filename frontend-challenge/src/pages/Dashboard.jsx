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
  const [selectedScan, setSelectedScan] = useState(null);
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

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar activePage={activePage} onNavigate={setActivePage} />

      <div style={{ marginLeft: "260px", flex: 1 }}>
        <OrgBar
          stats={stats}
          onExport={handleExport}
          onStopScan={handleStopScan}
        />

        <main style={{ padding: "24px" }}>
          <SeverityCards data={totalVulns} />
          <ScanTable scans={scanData} onRowClick={handleRowClick} />
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
            }}
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
            }}
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
