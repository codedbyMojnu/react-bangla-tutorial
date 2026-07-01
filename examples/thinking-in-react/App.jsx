import FilterableProductTable from "./FilterableProductTable";
import PRODUCTS from "./products.json";
import "./style.css";

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}
