import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Reshaped, ToastProvider } from "reshaped";
import "reshaped/themes/slate/theme.css";
import { AppRoutes, Home } from "./pages";

const App = () => {
  return (
    <Reshaped theme="slate">
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/app/*" element={<AppRoutes />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </Reshaped>
  );
};

export default App