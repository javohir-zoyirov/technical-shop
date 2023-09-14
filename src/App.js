import React, { useState } from "react";
import { Categotries } from "./data/category";
import { Routes, Route } from "react-router-dom";
import ApiContext from "./context/context";
import { CategotriesPage } from "./components/categoriesPage";
import { ProductData } from "./data/productData";
import { BrendData } from "./data/brendData";
import { LoginPage } from "./components/login/loginPage";
import { SearchPage } from "./components/search";
import { Header } from "./components/header";
import { ProductPage } from "./components/product";
import { Registr } from "./components/registr";
function App() {
  const [categoriesData, setCategoriesData] = useState([...Categotries]);
  const [productData, setProductData] = useState([...ProductData]);
  const [brandData, setBrandData] = useState([...BrendData]);
  const [searchValue, setSearchValue] = useState("");
  const [activCategory, setActivCategory] = useState(1);
  const [basket, setBasket] = useState([]);
  const [count, setCount] = useState(1);
  return (
    <>
      <ApiContext.Provider
        value={{
          categoriesData,
          setCategoriesData,
          productData,
          brandData,
          setSearchValue,
          searchValue,
          activCategory,
          setActivCategory,
          basket,
          setBasket,
          count,
          setCount,
        }}
      >
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route index element={<CategotriesPage />} />
          <Route path="header" element={<Header />} />
          <Route path="main" element={<CategotriesPage />} />
          <Route
            path="search"
            element={<SearchPage searchValue={searchValue} />}
          />
          <Route path="products" element={<ProductPage />} />
          <Route path="register" element={<Registr />} />
        </Routes>
      </ApiContext.Provider>
    </>
  );
}

export default App;
