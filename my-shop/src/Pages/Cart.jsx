import { useState } from "react";
import { getUser, getCart, removeFromCart } from "../storage";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Cart({darkMode}) {
  const user = getUser();
  const [items, setItems] = useState(user ? getCart(user.id) : []);
  const cardBg = darkMode ? "#1f2937" : "#ffffff";
  const textColor = darkMode ? "#f9fafb" : "#000000";
  const borderColor = darkMode ? "#374151" : "#e5e7eb";
  const navigate = useNavigate();

  const handleRemove = (id) => {
    removeFromCart(id);
    setItems(getCart(user.id));
    toast.success("Removed from cart.");
  };

  const total = items.reduce((sum, item) => {
    const price = Number(String(item.price).replace(/,/g, ""));
    return sum + (price || 0);
  }, 0);

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-stone-500 text-lg">
          Please login to view your cart.
        </p>
      </div>
    );
  }

  return (
    <section className="bg-stone-50 dark:bg-gray-800 min-h-screen py-16 absolute top-1/5 left-0 right-0" style={{
              backgroundColor: cardBg,
              color: textColor,
              borderColor: borderColor,
            }}>
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-3 gap-10">

        {/* CART ITEMS */}
        <div className="lg:col-span-2 space-y-6">

          <h2 className="text-3xl font-semibold text-stone-800 dark:text-stone-100 mb-6" style={{
              backgroundColor: cardBg,
              color: textColor,
              borderColor: borderColor,
            }}>
            Your Books
          </h2>

          {items.length === 0 ? (
            <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center text-stone-500 ">
              Your cart is empty.
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-stone-200 p-5 flex justify-between items-center hover:shadow-sm transition" 
              >
                {/* BOOK INFO */}
                <div className="flex flex-col gap-1">
                  <span className="text-lg font-medium text-stone-800 ">
                    {item.name}
                  </span>

                  <span className="text-stone-500 text-sm">
                    {item.price?.toLocaleString()} Toman
                  </span>
                </div>

                {/* DELETE BUTTON */}
                <button
                  onClick={() => handleRemove(item.id)}
                  className="flex items-center gap-2 text-red-500 hover:text-red-600 transition"
                >
                  {/* Trash SVG */}
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
            ))
          )}
        </div>

        {/* ORDER SUMMARY */}
        <div className="bg-white border border-stone-200 rounded-3xl p-7 h-fit sticky top-8 shadow-sm">

          <h3 className="text-xl font-semibold text-stone-800 mb-6">
            Order Summary
          </h3>

          <div className="flex justify-between text-stone-600 mb-3">
            <span>Books</span>
            <span>{items.length}</span>
          </div>

          <div className="flex justify-between text-stone-600 mb-4">
            <span>Subtotal</span>
            <span>{total.toLocaleString()} Toman</span>
          </div>

          <div className="border-t border-stone-200 my-4"></div>

          <div className="flex justify-between text-lg font-semibold text-stone-800 mb-6">
            <span>Total</span>
            <span>{total.toLocaleString()} Toman</span>
          </div>

          <button onClick={() => navigate("/checkout")}
            className="w-full h-12 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-medium transition"
          >
            Checkout
          </button>

          <p className="text-xs text-stone-400 text-center mt-4 italic">
            “A reader lives a thousand lives before she dies.”
          </p>

        </div>
      </div>
    </section>
  );
}
