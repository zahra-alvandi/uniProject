import { useState } from "react";
import { getUser, getProducts, addProduct, deleteProduct } from "../storage";
import toast from "react-hot-toast";

export default function Admin() {
  const user = getUser();
  const [products, setProducts] = useState(getProducts());
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name || !price) return;

    const updated = addProduct({
      name,
      price: Number(price),
      image: image || "",
    });

    setProducts(updated);
    setName("");
    setPrice("");
    setImage("");
    toast.success("Product added");
  };

  const handleDelete = (id) => {
    const updated = deleteProduct(id);
    setProducts(updated);
    toast.success("Product removed");
  };

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-stone-50 dark:bg-stone-950">
        <p className="text-stone-500 dark:text-stone-400 text-lg font-medium">
          Unauthorized access
        </p>
      </div>
    );
  }

  return (
    <section className="bg-stone-50 dark:bg-stone-950 min-h-screen py-16 absolute top-1/5 left-0 right-0">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-stone-800 dark:text-stone-200 mb-10">
          Admin Panel
        </h2>

        {/* ADD PRODUCT */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 mb-12 shadow-sm">
          <h3 className="text-lg font-medium mb-6 text-stone-700 dark:text-stone-200">
            Add New Book
          </h3>

          <form onSubmit={handleAdd} className="grid md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Book title"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="md:col-span-2 p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-200 outline-none focus:border-amber-600 transition"
            />

            <input
              type="text"
              placeholder="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-200 outline-none focus:border-amber-600 transition"
            />

            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-200 outline-none focus:border-amber-600 transition"
            />

            <button
              type="submit"
              className="md:col-span-4 h-12 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-medium transition"
            >
              Add Book
            </button>
          </form>
        </div>

        {/* PRODUCT LIST */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-stone-800 dark:text-stone-200 mb-4">
            Book List
          </h3>

          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 flex justify-between items-center hover:shadow-sm transition"
            >
              <div className="flex items-center gap-4">
                <img
                  src="/images/defaultPic.png"
                  alt={product.name}
                  className="w-12 h-16 object-cover rounded"
                />

                <div className="flex flex-col">
                  <span className="font-medium text-stone-800 dark:text-stone-200">
                    {product.name}
                  </span>

                  <span className="text-stone-500 dark:text-stone-400 text-sm">
                    {product.price?.toLocaleString()} Toman
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleDelete(product.id)}
                className="flex items-center gap-2 text-red-500 hover:text-red-600 transition"
                aria-label={`Delete ${product.name}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 7h12M9 7V4h6v3m-7 4v6m4-6v6m4-6v6M5 7l1 12a2 2 0 002 2h8a2 2 0 002-2l1-12"
                  />
                </svg>
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
