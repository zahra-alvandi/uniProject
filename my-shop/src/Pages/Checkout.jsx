import { useState } from "react";
import { getUser, getCart } from "../storage";
import toast from "react-hot-toast";

export default function Checkout() {
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

    setForm({
      name: "",
      phone: "",
      address: "",
      notes: "",
    });
  };

  return (
    <section className="min-h-screen bg-stone-50 dark:bg-gray-900 absolute top-1/5 left-0 right-0 p-4 md:p-8 text-stone-900 dark:text-stone-100">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Checkout</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Shipping Information */}
          <div className="p-6 rounded-2xl border border-stone-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
            <h3 className="text-xl font-semibold mb-5">Shipping Information</h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name *"
                value={form.name}
                onChange={handleChange}
                required
                className="p-3 rounded-xl border border-stone-200 dark:border-gray-600 bg-stone-100 dark:bg-gray-700 text-stone-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number *"
                value={form.phone}
                onChange={handleChange}
                required
                className="p-3 rounded-xl border border-stone-200 dark:border-gray-600 bg-stone-100 dark:bg-gray-700 text-stone-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
              />

              <textarea
                name="address"
                placeholder="Full Address *"
                value={form.address}
                onChange={handleChange}
                required
                rows="3"
                className="p-3 rounded-xl border border-stone-200 dark:border-gray-600 bg-stone-100 dark:bg-gray-700 text-stone-900 dark:text-white outline-none resize-none focus:ring-2 focus:ring-emerald-500"
              />

              <textarea
                name="notes"
                placeholder="Notes (optional)"
                value={form.notes}
                onChange={handleChange}
                rows="2"
                className="p-3 rounded-xl border border-stone-200 dark:border-gray-600 bg-stone-100 dark:bg-gray-700 text-stone-900 dark:text-white outline-none resize-none focus:ring-2 focus:ring-emerald-500"
              />

              <button
                type="submit"
                className="h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition"
              >
                Place Order
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="p-6 rounded-2xl border border-stone-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
            <h3 className="text-xl font-semibold mb-5">Order Summary</h3>

            {cartItems.length === 0 ? (
              <p className="text-stone-500 dark:text-gray-400">
                Your cart is empty.
              </p>
            ) : (
              <>
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center border-b border-stone-200 dark:border-gray-700 pb-3"
                    >
                      <span className="font-medium">{item.name}</span>

                      <span className="text-stone-500 dark:text-gray-400">
                        {Number(
                          String(item.price).replace(/,/g, ""),
                        ).toLocaleString()}{" "}
                        Toman
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-6 pt-5 border-t-2 border-stone-300 dark:border-gray-600 text-lg font-bold">
                  <span>Total</span>

                  <span>{total.toLocaleString()} Toman</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
