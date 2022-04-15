import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import { Route, Routes } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
     
    </div>
  );
}

export default App;
