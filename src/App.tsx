import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Reshaped } from "reshaped";
import "reshaped/themes/slate/theme.css";
import { AppRoutes, Home } from "./pages";

const App = () => {
  return (
    <Reshaped theme="slate">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/app/*" element={<AppRoutes />} />
        </Routes>
      </BrowserRouter>
    </Reshaped>
  );
};

export default App