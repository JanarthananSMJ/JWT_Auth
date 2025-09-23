import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashBoard from "./pages/DashBoard";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<DashBoard />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default App;
