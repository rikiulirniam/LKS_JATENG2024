import logo from "./logo.svg";
import "./App.css";
import { AuthProvider } from "./Auth";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import "./assets/css/bootstrap.css";
import "./assets/css/style.css";
import SignUp from "./pages/SignUp";
import Index from "./pages/Index";
import ListUser from "./pages/ListUser";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/index" element={<Index />} />
          <Route path="/list-user" element={<ListUser />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
