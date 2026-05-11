import { useState } from "react";
import { getUser, getProducts, addProduct, deleteProduct } from "../storage";
import toast from "react-hot-toast";

export default function Admin() {
  const user = getUser();
  const [products, setProducts] = useState(getProducts());
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("")

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name || !price) return;
    const updated = addProduct({ name, price: Number(price), image: image || "" });
    setProducts(updated);
    setName("");
    setPrice("");
    setImage("")
    toast.success("Product added");
  };

  const handleDelete = (id) => {
    const updated = deleteProduct(id);
    setProducts(updated);
    toast.success("Product removed");
  };

  if (!user) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Unauthorized access</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto my-12 px-4">
      <h2 className="text-2xl font-bold mb-8"> Admin</h2>

      <form onSubmit={handleAdd} className="flex gap-4 mb-10">
        <input
          type="text"
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="flex-2 p-3 border border-gray-200 rounded-lg outline-none focus:border-black transition-colors"
        />
        <input
          type="text"
          placeholder="Product image link"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="flex-1 p-3 border border-gray-200 rounded-lg outline-none focus:border-black transition-colors"
        />
        <input
          type="number"
          placeholder="Price (toman)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="flex-1 p-3 border border-gray-200 rounded-lg outline-none focus:border-black transition-colors"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-black text-white border-none rounded-lg cursor-pointer hover:bg-gray-800 transition-colors whitespace-nowrap"
        >
          Add
        </button>
      </form>

      <h3 className="text-xl font-bold mb-4">Product List</h3>
      {products.map((product) => (
        <div
          key={product.id}
          className="flex justify-between items-center py-5 border-b border-gray-100"
        >
          <span className="font-medium">{product.name}</span>
          <div className="flex items-center gap-6">
            <span className="text-gray-500">
              {product.price?.toLocaleString()} Toman
            </span>
            <button
              onClick={() => handleDelete(product.id)}
              className="bg-transparent border-none cursor-pointer text-red-400 hover:text-red-600 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
