import { Route, BrowserRouter, Routes } from "react-router-dom";
import InputPersonal from "./calculator/InputPersonal";
import Calculator from "./components/calculator/Calculator";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InputPersonal />}></Route>
        <Route path="/calculator" element={<Calculator />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
