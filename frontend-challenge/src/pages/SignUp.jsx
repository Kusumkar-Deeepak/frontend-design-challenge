import AuthCard from "../components/AuthCard";
import FeatureList from "../components/FeatureList";

function SignUp() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen relative overflow-hidden">
      {/* Base linear gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #0B1F2E 0%, #0E2F3A 30%, #114A4F 55%, #0F766E 100%)",
        }}
      ></div>

      {/* Orange radial glow - bottom right */}
      <div
        className="absolute rounded-full"
        style={{
          bottom: "-250px",
          right: "-250px",
          width: "700px",
          height: "700px",
          backgroundColor: "#F97316",
          opacity: 0.5,
          filter: "blur(220px)",
          pointerEvents: "none",
        }}
      ></div>

      {/* Dark vignette overlay for depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.2) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)",
          pointerEvents: "none",
        }}
      ></div>

      {/* Left section -content */}
      <div
        className="w-full lg:w-1/2 text-white flex flex-col"
        style={{
          padding: "clamp(20px, 5vw, 40px) clamp(20px, 5vw, 60px)",
          minHeight: "100vh",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* logo at top */}
        <div className="flex items-center gap-2 relative z-10">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: "#14B8A6" }}
          ></div>
          <span style={{ fontSize: "17px", fontWeight: "600" }}>aps</span>
        </div>

        <div
          className="relative z-10"
          style={{
            maxWidth: "500px",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginTop: "40px",
          }}
        >
          {/* main headiing */}
          <h1
            className="font-bold"
            style={{
              fontSize: "clamp(20px, 3.8vw, 36px)",
              lineHeight: "1.15",
              marginBottom: "40px",
              fontWeight: "700",
            }}
          >
            Expert level Cybersecurity
            <br />
            in <span style={{ color: "#14B8A6" }}>hours</span> not weeks.
          </h1>

          {/* whats included section */}
          <div>
            <p
              className="font-medium"
              style={{
                color: "#CBD5E1",
                fontSize: "16px",
                marginBottom: "14px",
                fontWeight: "600",
              }}
            >
              What's included
            </p>
            <FeatureList />
          </div>
        </div>

        {/* trustpilot rating at bottom */}
        <div
          className="relative z-10"
          style={{ marginTop: "auto", paddingTop: "40px" }}
        >
          <div className="flex items-center gap-2 mb-1">
            <svg
              className="w-4 h-4"
              style={{ color: "#10B981" }}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span
              style={{ fontSize: "14px", color: "#9CA3AF", fontWeight: "400" }}
            >
              Trustpilot
            </span>
          </div>
          <div style={{ fontSize: "14px", fontWeight: "400" }}>
            <span style={{ color: "#FFFFFF", fontWeight: "500" }}>
              Rated 4.5/5.0
            </span>{" "}
            <span style={{ color: "#9CA3AF" }}>(100k+ reviews)</span>
          </div>
        </div>
      </div>

      {/* Right side - form */}
      <div
        className="w-full lg:w-1/2 flex items-center justify-center"
        style={{
          minHeight: "100vh",
          padding: "clamp(20px, 4vw, 40px) clamp(16px, 3vw, 20px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <AuthCard />
      </div>
    </div>
  );
}

export default SignUp;
