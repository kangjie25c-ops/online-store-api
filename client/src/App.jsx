import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔥 fetch API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/products");

        if (!res.ok) {
          throw new Error("Failed to fetch");
        }

        const json = await res.json();


        setProducts(json.data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 🔥 filter
  const filteredProducts =
    category === "All"
      ? products
      : products.filter((p) => p.category === category);

  // 🟡 loading
  if (loading) return <h2>Loading...</h2>;

  // 🔴 error
  if (error) return <h2>Error: {error}</h2>;

  return (
    <div className="container">
      <h1>Welcome to My Store</h1>

      <div className="top-bar">
        <h2>Products</h2>

        <div className="controls">
          <select onChange={(e) => setCategory(e.target.value)}>
            <option value="All">All Categories</option>
            <option value="Consoles">Consoles</option>
            <option value="Games">Games</option>
            <option value="Accessories">Accessories</option>
            <option value="Subscriptions">Subscriptions</option>
          </select>

          <button className="add-new">Add New</button>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="grid">
          {filteredProducts.map((product) => (
            <div className="card" key={product._id}>
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
          ))}
        </div>
      )}
    </div>
  );
}

export default App;