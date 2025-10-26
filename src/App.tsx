import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./complex/AppRouter";
import "./App.css";
import { AppHeader } from "./complex/AppHeader/AppHeader.tsx";
import { AuthProvider } from "./auth/AuthProvider.tsx";

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <AppHeader />
          <AppRouter />
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
