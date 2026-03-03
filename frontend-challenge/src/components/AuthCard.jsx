import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthInput from "./AuthInput";
import SocialButton from "./SocialButton";

function AuthCard() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(true);
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    navigate("/dashboard");
  };

  return (
    <div
      style={{
        width: "440px",
        maxWidth: "90%",
        padding: "32px 40px",
        borderRadius: "20px",
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3)",
        transition: "all 0.3s ease",
      }}
    >
      {/* header */}
      <h2
        className="font-bold text-center"
        style={{
          fontSize: "28px",
          color: "#111827",
          fontWeight: "700",
        }}
      >
        {isSignUp ? "Sign up" : "Log in"}
      </h2>

      <p
        className="text-center"
        style={{
          fontSize: "14px",
          color: "#6B7280",
          marginTop: "6px",
          fontWeight: "400",
        }}
      >
        {isSignUp ? "Already have an account? " : "Don't have an account? "}
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          style={{
            color: "#14B8A6",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
          className="hover:underline"
        >
          {isSignUp ? "Log in" : "Sign up"}
        </button>
      </p>

      {/* form */}
      <form onSubmit={handleSubmit} style={{ marginTop: "24px" }}>
        {isSignUp && (
          <>
            <div style={{ marginBottom: "14px" }}>
              <AuthInput
                placeholder="First name*"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
              />
            </div>
            <div style={{ marginBottom: "14px" }}>
              <AuthInput
                placeholder="Last name*"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />
            </div>
          </>
        )}
        <div style={{ marginBottom: "14px" }}>
          <AuthInput
            type="email"
            placeholder="Email address*"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        <div className="relative" style={{ marginBottom: "14px" }}>
          <AuthInput
            type={showPassword ? "text" : "password"}
            placeholder="Password (8+ characters)*"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            <svg
              className="w-5 h-5"
              style={{ color: "#9CA3AF" }}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              {showPassword ? (
                <>
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </>
              ) : (
                <>
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* checkbox for terms - only show on signup */}
        {isSignUp && (
          <div className="flex items-start gap-3" style={{ marginTop: "14px" }}>
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 w-4 h-4 rounded"
              style={{ accentColor: "#14B8A6" }}
            />
            <label
              style={{
                fontSize: "14px",
                color: "#4B5563",
                lineHeight: "1.5",
                fontWeight: "400",
              }}
            >
              I agree to Aps's{" "}
              <span
                style={{ color: "#14B8A6" }}
                className="cursor-pointer hover:underline"
              >
                Terms & Conditions
              </span>{" "}
              and acknowledge the{" "}
              <span
                style={{ color: "#14B8A6" }}
                className="cursor-pointer hover:underline"
              >
                Privacy Policy
              </span>
            </label>
          </div>
        )}

        {/* primery button */}
        <button
          type="submit"
          className="w-full text-white font-medium rounded-full transition-all duration-200"
          style={{
            backgroundColor: "#0D9488",
            height: "48px",
            marginTop: "20px",
            fontWeight: "500",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#0F766E")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#0D9488")}
        >
          {isSignUp ? "Create account" : "Sign in"}
        </button>
      </form>

      {/* social login btns */}
      <div className="flex" style={{ marginTop: "20px", gap: "12px" }}>
        <SocialButton label="Apple" bgColor="#000000" />
        <SocialButton label="Google" bgColor="#E5E7EB" textColor="#111827" />
        <SocialButton label="Meta" bgColor="#2563EB" />
      </div>
    </div>
  );
}

export default AuthCard;
