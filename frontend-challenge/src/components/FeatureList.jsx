export default function FeatureList() {
  const features = [
    "Effortlessly spider and map targets to uncover hidden security flaws.",
    "Deliver high-quality, validated findings in hours, not weeks.",
    "Generate professional, enterprise-grade security reports automatically.",
  ];

  return (
    <ul>
      {features.map((item, idx) => (
        <li
          key={idx}
          className="flex items-start gap-3"
          style={{ marginBottom: "20px" }}
        >
          {/* chek icon */}
          <svg
            className="w-5 h-5 shrink-0"
            style={{ color: "#10B981", marginTop: "2px" }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span
            style={{
              color: "#E2E8F0",
              fontSize: "16px",
              lineHeight: "1.6",
              fontWeight: "400",
            }}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}
