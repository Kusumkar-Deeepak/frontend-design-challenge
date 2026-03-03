import { useState } from "react";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  const [currentPage, setCurrentPage] = useState("signup");

  const handleLogin = () => {
    setCurrentPage("dashboard");
  };

  return (
    <ThemeProvider>
      {currentPage === "signup" ? (
        <SignUp onLogin={handleLogin} />
      ) : (
        <Dashboard />
      )}
    </ThemeProvider>
  );
}

export default App;
