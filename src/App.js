import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./Pages/HomePage";
import SearchPage from "./Pages/SearchPage";
import AddPage from "./Pages/AddPage";
import CameraPage from "./Pages/CameraPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/add" element={<AddPage />} />
                {/* <Route path="/camera" element={<CameraPage />} /> */}
            </Routes>
        </Router>
    );
}

export default App;
