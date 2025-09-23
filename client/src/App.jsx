import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashBoard from "./pages/DashBoard";
import RegisterPage from "./pages/RegisterPage";
import NotFound from "./pages/NotFoundPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<DashBoard />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
