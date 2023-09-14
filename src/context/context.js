import { createContext } from "react";

const ApiContext = createContext({
  categoriesData: [],
  setCategoriesData: (categoriesData) => {},
  brandData: [],
  searchValue: "",
  setSearchValue: (searchValue) => {},
  activCategory: {},
  setActivCategory: (activCategory) => {},
  basket: {},
  setBasket: (basket) => {},
  count: 1,
  setCount: (count) => {},
});

export default ApiContext;
