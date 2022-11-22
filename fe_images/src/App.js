import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";
import ProductsList from "./components/ProductsList";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductsList />}></Route>
        <Route path="add" element={<AddProduct />}></Route>
        <Route path="edit/:id" element={<EditProduct />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
