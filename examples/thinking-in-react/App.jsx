import FilterableProductTable from "./FilterableProductTable";
import PRODUCTS from "./products.json";
import "./style.css";

export default function App() {
  return (
    <div className="app">
      <div className="app-header">
        <h1>🛒 Product Inventory</h1>
        <p>Browse and filter our available products</p>
      </div>
      <FilterableProductTable products={PRODUCTS} />
    </div>
  );
}
