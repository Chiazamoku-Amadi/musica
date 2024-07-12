import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
