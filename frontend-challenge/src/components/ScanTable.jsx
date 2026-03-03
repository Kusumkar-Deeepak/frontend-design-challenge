import { useTheme } from "../context/ThemeContext";
import { useState, useEffect } from "react";

export default function ScanTable({
  scans,
  onRowClick,
  onNewScan,
  selectedScanId,
}) {
  const { colors, isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showColumnsDropdown, setShowColumnsDropdown] = useState(false);
  const [filters, setFilters] = useState({ status: "", type: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [visibleColumns, setVisibleColumns] = useState({
    name: true,
    type: true,
    status: true,
    progress: true,
    vulnerabilities: true,
    lastScan: true,
  });

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest("[data-dropdown]")) {
        setShowFilterDropdown(false);
        setShowColumnsDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Enhanced filtering
  const filteredScans = scans.filter((scan) => {
    const matchesSearch =
      scan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scan.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scan.status.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = !filters.status || scan.status === filters.status;
    const matchesType = !filters.type || scan.type === filters.type;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Pagination
  const totalPages = Math.ceil(filteredScans.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedScans = filteredScans.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const toggleColumn = (column) => {
    setVisibleColumns((prev) => ({ ...prev, [column]: !prev[column] }));
  };

  return (
    <div>
      {/* Toolbar */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          alignItems: "center",
          marginBottom: "16px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            flex: 1,
            minWidth: "200px",
            position: "relative",
          }}
        >
          <input
            type="text"
            placeholder="Search scans..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 12px 10px 40px",
              border: `1px solid ${colors.border}`,
              borderRadius: "8px",
              backgroundColor: colors.card,
              color: colors.text,
              fontSize: "14px",
              outline: "none",
              transition: "border-color 0.15s ease",
            }}
            onFocus={(e) => (e.target.style.borderColor = colors.accent)}
            onBlur={(e) => (e.target.style.borderColor = colors.border)}
          />
          <span
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "16px",
            }}
          >
            🔍
          </span>
        </div>

        {/* Filter Button with Dropdown */}
        <div style={{ position: "relative" }} data-dropdown>
          <button
            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            style={{
              padding: "10px 16px",
              border: `1px solid ${colors.border}`,
              borderRadius: "8px",
              backgroundColor: colors.card,
              color: colors.text,
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = colors.hover)
            }
            onMouseLeave={(e) => (e.target.style.backgroundColor = colors.card)}
          >
            🎯 Filter
          </button>

          {showFilterDropdown && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 8px)",
                left: 0,
                backgroundColor: colors.card,
                border: `1px solid ${colors.border}`,
                borderRadius: "8px",
                padding: "12px",
                minWidth: "200px",
                zIndex: 100,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                animation: "slideIn 0.2s ease",
              }}
            >
              <div style={{ marginBottom: "12px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "12px",
                    fontWeight: "500",
                    color: colors.textSecondary,
                    marginBottom: "6px",
                  }}
                >
                  Status
                </label>
                <select
                  value={filters.status}
                  onChange={(e) =>
                    setFilters({ ...filters, status: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: `1px solid ${colors.border}`,
                    borderRadius: "6px",
                    backgroundColor: colors.bg,
                    color: colors.text,
                    fontSize: "14px",
                  }}
                >
                  <option value="">All</option>
                  <option value="Completed">Completed</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Failed">Failed</option>
                  <option value="Running">Running</option>
                </select>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "12px",
                    fontWeight: "500",
                    color: colors.textSecondary,
                    marginBottom: "6px",
                  }}
                >
                  Type
                </label>
                <select
                  value={filters.type}
                  onChange={(e) =>
                    setFilters({ ...filters, type: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: `1px solid ${colors.border}`,
                    borderRadius: "6px",
                    backgroundColor: colors.bg,
                    color: colors.text,
                    fontSize: "14px",
                  }}
                >
                  <option value="">All</option>
                  <option value="Greybox">Greybox</option>
                  <option value="Blackbox">Blackbox</option>
                  <option value="Whitebox">Whitebox</option>
                </select>
              </div>

              <button
                onClick={() => {
                  setFilters({ status: "", type: "" });
                  setShowFilterDropdown(false);
                }}
                style={{
                  width: "100%",
                  marginTop: "12px",
                  padding: "8px",
                  border: "none",
                  borderRadius: "6px",
                  backgroundColor: colors.hover,
                  color: colors.text,
                  fontSize: "13px",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Columns Button with Dropdown */}
        <div style={{ position: "relative" }} data-dropdown>
          <button
            onClick={() => setShowColumnsDropdown(!showColumnsDropdown)}
            style={{
              padding: "10px 16px",
              border: `1px solid ${colors.border}`,
              borderRadius: "8px",
              backgroundColor: colors.card,
              color: colors.text,
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = colors.hover)
            }
            onMouseLeave={(e) => (e.target.style.backgroundColor = colors.card)}
          >
            📋 Columns
          </button>

          {showColumnsDropdown && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 8px)",
                right: 0,
                backgroundColor: colors.card,
                border: `1px solid ${colors.border}`,
                borderRadius: "8px",
                padding: "8px",
                minWidth: "180px",
                zIndex: 100,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                animation: "slideIn 0.2s ease",
              }}
            >
              {Object.keys(visibleColumns).map((column) => (
                <label
                  key={column}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "8px",
                    cursor: "pointer",
                    borderRadius: "4px",
                    transition: "background-color 0.15s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = colors.hover)
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "transparent")
                  }
                >
                  <input
                    type="checkbox"
                    checked={visibleColumns[column]}
                    onChange={() => toggleColumn(column)}
                    style={{ marginRight: "8px" }}
                  />
                  <span
                    style={{
                      fontSize: "14px",
                      color: colors.text,
                      textTransform: "capitalize",
                    }}
                  >
                    {column}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={onNewScan}
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
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-1px)";
            e.target.style.boxShadow = "0 4px 12px rgba(14, 116, 144, 0.3)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "none";
          }}
        >
          ➕ New Scan
        </button>
      </div>

      {/* Table */}
      <div
        style={{
          backgroundColor: colors.table,
          border: `1px solid ${colors.border}`,
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              `${visibleColumns.name ? "2fr" : ""} ${visibleColumns.type ? "1fr" : ""} ${visibleColumns.status ? "1fr" : ""} ${visibleColumns.progress ? "1.2fr" : ""} ${visibleColumns.vulnerabilities ? "auto" : ""} ${visibleColumns.lastScan ? "110px" : ""}`.trim(),
            padding: "12px 20px",
            backgroundColor: isDark ? "#1A1A1A" : "#F9FAFB",
            borderBottom: `1px solid ${colors.border}`,
            fontSize: "12px",
            fontWeight: "500",
            color: colors.textSecondary,
            textTransform: "uppercase",
            letterSpacing: "0.04em",
          }}
        >
          {visibleColumns.name && <div>Scan Name</div>}
          {visibleColumns.type && <div>Type</div>}
          {visibleColumns.status && <div>Status</div>}
          {visibleColumns.progress && <div>Progress</div>}
          {visibleColumns.vulnerabilities && <div>Vulnerabilities</div>}
          {visibleColumns.lastScan && (
            <div style={{ textAlign: "right" }}>Last Scan</div>
          )}
        </div>

        {/* Rows */}
        {paginatedScans.map((scan) => {
          const isSelected = selectedScanId === scan.id;
          return (
            <div
              key={scan.id}
              onClick={() => onRowClick(scan)}
              style={{
                display: "grid",
                gridTemplateColumns:
                  `${visibleColumns.name ? "2fr" : ""} ${visibleColumns.type ? "1fr" : ""} ${visibleColumns.status ? "1fr" : ""} ${visibleColumns.progress ? "1.2fr" : ""} ${visibleColumns.vulnerabilities ? "auto" : ""} ${visibleColumns.lastScan ? "110px" : ""}`.trim(),
                padding: "14px 20px",
                borderBottom: `1px solid ${colors.border}`,
                borderLeft: isSelected
                  ? `3px solid ${colors.accent}`
                  : "3px solid transparent",
                backgroundColor: isSelected
                  ? isDark
                    ? "#1A3A3A"
                    : "#E6F7F4"
                  : "transparent",
                cursor: "pointer",
                transition: "all 0.15s",
                alignItems: "center",
              }}
              onMouseEnter={(e) => {
                if (!isSelected)
                  e.currentTarget.style.backgroundColor = colors.hover;
              }}
              onMouseLeave={(e) => {
                if (!isSelected)
                  e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              {visibleColumns.name && (
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: colors.text,
                  }}
                >
                  {scan.name}
                </div>
              )}

              {visibleColumns.type && (
                <div style={{ fontSize: "14px", color: colors.textSecondary }}>
                  {scan.type}
                </div>
              )}

              {visibleColumns.status && (
                <div>
                  <StatusChip status={scan.status} />
                </div>
              )}

              {visibleColumns.progress && (
                <div>
                  <ProgressBar progress={scan.progress} colors={colors} />
                </div>
              )}

              {visibleColumns.vulnerabilities && (
                <div style={{ display: "flex", gap: "8px" }}>
                  <VulnBadge
                    count={scan.vulnerabilities.critical}
                    color="#EF4444"
                  />
                  <VulnBadge
                    count={scan.vulnerabilities.high}
                    color="#F97316"
                  />
                  <VulnBadge
                    count={scan.vulnerabilities.medium}
                    color="#F59E0B"
                  />
                  <VulnBadge count={scan.vulnerabilities.low} color="#10B981" />
                </div>
              )}

              {visibleColumns.lastScan && (
                <div
                  style={{
                    fontSize: "14px",
                    color: colors.textSecondary,
                    textAlign: "right",
                  }}
                >
                  {scan.lastScan}
                </div>
              )}
            </div>
          );
        })}

        {/* Empty State */}
        {paginatedScans.length === 0 && (
          <div
            style={{
              padding: "48px 24px",
              textAlign: "center",
              color: colors.textSecondary,
            }}
          >
            No scans found
          </div>
        )}
      </div>

      {/* Table Footer with Pagination */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "16px",
          padding: "12px 0",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div style={{ fontSize: "14px", color: colors.textSecondary }}>
          Showing {startIndex + 1} to{" "}
          {Math.min(startIndex + itemsPerPage, filteredScans.length)} of{" "}
          {filteredScans.length} scans
        </div>

        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            style={{
              padding: "8px 12px",
              border: `1px solid ${colors.border}`,
              borderRadius: "6px",
              backgroundColor: currentPage === 1 ? colors.hover : colors.card,
              color: currentPage === 1 ? colors.textSecondary : colors.text,
              fontSize: "14px",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
              transition: "all 0.15s ease",
            }}
          >
            Previous
          </button>

          <div style={{ display: "flex", gap: "4px" }}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                style={{
                  minWidth: "36px",
                  padding: "8px",
                  border: `1px solid ${colors.border}`,
                  borderRadius: "6px",
                  backgroundColor:
                    currentPage === page ? colors.accent : colors.card,
                  color: currentPage === page ? "#FFFFFF" : colors.text,
                  fontSize: "14px",
                  fontWeight: currentPage === page ? "600" : "400",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages}
            style={{
              padding: "8px 12px",
              border: `1px solid ${colors.border}`,
              borderRadius: "6px",
              backgroundColor:
                currentPage === totalPages ? colors.hover : colors.card,
              color:
                currentPage === totalPages ? colors.textSecondary : colors.text,
              fontSize: "14px",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
              transition: "all 0.15s ease",
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

function StatusChip({ status }) {
  const styles = {
    Completed: { bg: "#DEF7EC", text: "#03543F", hoverBg: "#C6F1E0" },
    Scheduled: { bg: "#E5E7EB", text: "#374151", hoverBg: "#D1D5DB" },
    Failed: { bg: "#FDE8E8", text: "#9B1C1C", hoverBg: "#FBD5D5" },
    Running: { bg: "#E0E7FF", text: "#3730A3", hoverBg: "#C7D2FE" },
  };

  const style = styles[status] || styles.Scheduled;

  return (
    <span
      style={{
        display: "inline-block",
        padding: "4px 10px",
        borderRadius: "999px",
        backgroundColor: style.bg,
        color: style.text,
        fontSize: "12px",
        fontWeight: "500",
        transition: "background-color 0.15s ease",
        cursor: "default",
      }}
      onMouseEnter={(e) => (e.target.style.backgroundColor = style.hoverBg)}
      onMouseLeave={(e) => (e.target.style.backgroundColor = style.bg)}
    >
      {status}
    </span>
  );
}

function ProgressBar({ progress, colors }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        maxWidth: "120px",
      }}
    >
      <div
        style={{
          flex: 1,
          height: "6px",
          backgroundColor: colors.border,
          borderRadius: "3px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            backgroundColor: colors.accent,
            borderRadius: "3px",
            animation: "progressFill 0.6s ease-out",
          }}
        ></div>
      </div>
      <span
        style={{
          fontSize: "12px",
          color: colors.textSecondary,
          minWidth: "35px",
        }}
      >
        {progress}%
      </span>
    </div>
  );
}

function VulnBadge({ count, color }) {
  return (
    <div
      style={{
        minWidth: "28px",
        height: "28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: color + "20",
        color: color,
        borderRadius: "6px",
        fontSize: "12px",
        fontWeight: "700",
      }}
    >
      {count}
    </div>
  );
}
