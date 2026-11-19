import { Link, NavLink, Route, Routes } from "react-router-dom";
import Browse from "./pages/Browse";
import Saved from "./pages/Saved";
import "./App.css";
import { useEffect, useState } from "react";
import Inquiry from "./pages/Inquiry";
import SpaceDetails from "./pages/SpaceDetails";

function App() {
  const [savedIds, setSavedIds] = useState(() => {
    const storedIds = localStorage.getItem("cowork-saved-ids");

    if (!storedIds) {
      return [];
    }

    try {
      const parsedIds = JSON.parse(storedIds);
      return Array.isArray(parsedIds) ? parsedIds : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cowork-saved-ids", JSON.stringify(savedIds));
  }, [savedIds]);

  function toggleSaved(spaceId) {
    setSavedIds((currentIds) =>
      currentIds.includes(spaceId)
        ? currentIds.filter((id) => id !== spaceId)
        : [...currentIds, spaceId],
    );
  }

  return (
    <>
      <header className="app-header">
        <nav className="navbar" aria-label="Main navigation">
          <Link className="brand" to="/">
            Cowork
          </Link>

          <div className="nav-links">
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              to="/"
              end
            >
              Browse
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              to="/saved"
            >
              Saved
            </NavLink>
          </div>
        </nav>
      </header>

      <div className="page-container">
        <Routes>
          <Route
            path="/"
            element={<Browse savedIds={savedIds} onToggleSaved={toggleSaved} />}
          />

          <Route
            path="/saved"
            element={<Saved savedIds={savedIds} onToggleSaved={toggleSaved} />}
          />

          <Route
            path="/spaces/:spaceId"
            element={
              <SpaceDetails savedIds={savedIds} onToggleSaved={toggleSaved} />
            }
          />
          <Route path="/inquiry/:spaceId" element={<Inquiry />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
