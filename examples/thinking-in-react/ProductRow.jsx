export default function ProductRow({ product }) {
  const isInStock = product.stocked;

  return (
    <tr className="product-row">
      <td className={isInStock ? "" : "out-of-stock"}>{product.name}</td>
      <td>{product.price}</td>
      <td>
        <span className={`badge ${isInStock ? "badge-in" : "badge-out"}`}>
          {isInStock ? "✓ In Stock" : "✗ Out of Stock"}
        </span>
      </td>
    </tr>
  );
}
