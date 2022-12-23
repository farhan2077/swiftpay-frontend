import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Transaction from "./pages/Transaction";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/transactions/:vehicleId" element={<Transaction />} />
      </Routes>
    </div>
  );
}

export default App;
