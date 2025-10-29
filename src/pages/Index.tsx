import { useState } from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return isAuthenticated ? (
    <Dashboard onLogout={() => setIsAuthenticated(false)} />
  ) : (
    <Login onLogin={() => setIsAuthenticated(true)} />
  );
};

export default Index;
