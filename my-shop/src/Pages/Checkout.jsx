import { useState } from "react";
import { getUser, getCart } from "../storage";
import toast from "react-hot-toast";

export default function Checkout({ darkMode }) {
  const user = getUser();
  const cartItems = user ? getCart(user.id) : [];

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
  });

  const total = cartItems.reduce((sum, item) => {
    const price = Number(String(item.price).replace(/,/g, ""));
    return sum + (price || 0);
  }, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address) {
      toast.error("Please fill in the required fields.");
      return;
    }
    toast.success("Your order has been placed successfully!");
    setForm({ name: "", phone: "", address: "", notes: "" });
  };

  return (
    <div
      className={`min-h-screen p-4 md:p-8 ${darkMode ? "bg-gray-900" : "bg-gray-50"} absolute top-1/5 left-0 right-0`}
    >
      <div className="max-w-4xl mx-auto">
        <h2
          className={`text-2xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}
        >
          Checkout
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Shipping Information */}
          <div
            className={`p-6 rounded-xl border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
          >
            <h3
              className={`font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}
            >
              Shipping Information
            </h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name *"
                value={form.name}
                onChange={handleChange}
                required
                className={`p-3 rounded-lg border outline-none ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-100 border-gray-200 text-gray-900"}`}
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number *"
                value={form.phone}
                onChange={handleChange}
                required
                className={`p-3 rounded-lg border outline-none ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-100 border-gray-200 text-gray-900"}`}
              />
              <textarea
                name="address"
                placeholder="Full Address *"
                value={form.address}
                onChange={handleChange}
                required
                rows="3"
                className={`p-3 rounded-lg border outline-none resize-y ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-100 border-gray-200 text-gray-900"}`}
              />
              <textarea
                name="notes"
                placeholder="Notes (optional)"
                value={form.notes}
                onChange={handleChange}
                rows="2"
                className={`p-3 rounded-lg border outline-none resize-y ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-100 border-gray-200 text-gray-900"}`}
              />
              <button
                type="submit"
                className="py-3 bg-emerald-600 text-white border-none rounded-lg cursor-pointer font-bold hover:bg-emerald-700 transition-colors"
              >
                Place Order
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div
            className={`p-6 rounded-xl border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
          >
            <h3
              className={`font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}
            >
              Order Summary
            </h3>
            {cartItems.length === 0 ? (
              <p className={darkMode ? "text-gray-400" : "text-gray-500"}>
                Your cart is empty.
              </p>
            ) : (
              <>
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className={`flex justify-between py-3 border-b ${darkMode ? "border-gray-700 text-white" : "border-gray-200 text-gray-900"}`}
                  >
                    <span>{item.name}</span>
                    <span
                      className={darkMode ? "text-gray-400" : "text-gray-500"}
                    >
                      {Number(
                        String(item.price).replace(/,/g, ""),
                      ).toLocaleString()}{" "}
                      Toman
                    </span>
                  </div>
                ))}
                <div
                  className={`flex justify-between pt-4 mt-2 border-t-2 font-bold text-lg ${darkMode ? "border-white text-white" : "border-gray-900 text-gray-900"}`}
                >
                  <span>Total</span>
                  <span>{total.toLocaleString()} Toman</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
