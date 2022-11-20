import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/parts/Navbar";
import Home from "./components/pages/Home/Home";
import Table from "./components/pages/Table";

function App() {
  return (
    <>
      <Navbar />
      <div className="container1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/table" element={<Table />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
