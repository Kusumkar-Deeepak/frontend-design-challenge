const AuthInput = ({ type = "text", placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full border transition-all duration-200"
      style={{
        height: "48px",
        padding: "0 16px",
        borderRadius: "12px",
        borderColor: "#E5E7EB",
        fontSize: "15px",
        color: "#111827",
        backgroundColor: "#FFFFFF",
        fontWeight: "400",
      }}
      onFocus={(e) => {
        e.target.style.outline = "none";
        e.target.style.borderColor = "#14B8A6";
        e.target.style.boxShadow = "0 0 0 3px rgba(20, 184, 166, 0.1)";
      }}
      onBlur={(e) => {
        e.target.style.borderColor = "#E5E7EB";
        e.target.style.boxShadow = "none";
      }}
    />
  );
};

export default AuthInput;
