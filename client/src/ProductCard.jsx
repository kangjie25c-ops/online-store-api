function ProductCard({ product }) {
  return (
    <div className="card">
      <h3>{product.name}</h3>

      <div className="row">
        <span className="price">${product.price}</span>
        <span className="tag">{product.category}</span>
      </div>

      <button className="add">Add To Cart</button>

      <div className="actions">
        <button className="edit">Edit</button>
        <button className="delete">Delete</button>
      </div>
    </div>
  );
}

export default ProductCard;