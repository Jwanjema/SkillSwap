import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SkillsPage from "./pages/SkillsPage";
import AddSkillPage from "./pages/AddSkillPage";
import ProfilePage from "./pages/ProfilePage";
import FavoritesPage from "./pages/FavoritesPage";
import NavBar from "./components/NavBar";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/add-skill" element={<AddSkillPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="*" element={<h2 style={{ textAlign: "center", marginTop: "2rem" }}>404 - Page Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;