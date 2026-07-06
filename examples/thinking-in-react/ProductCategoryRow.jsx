export default function ProductCategoryRow({ category }) {
  return (
    <tr className="category-row">
      <th colSpan="3">{category}</th>
    </tr>
  );
}
