import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import RecipeDetails from "./pages/RecipeDetails";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


