import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ConnectAccount from "./pages/ConnectAccount";
import ChoosePlan from "./pages/ChoosePlan";
import Success from "./pages/Success";
import VerifyEmail from "./pages/VerifyEmail";

import "./App.css";
import "./Reset.css";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<ConnectAccount />} />
            <Route path="/verify" element={<VerifyEmail />} />
            <Route path="/plans" element={<ChoosePlan />} />
            <Route path="/success" element={<Success />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
