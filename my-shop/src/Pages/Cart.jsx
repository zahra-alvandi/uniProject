import { useState } from "react";
import { getUser, getCart, removeFromCart } from "../storage";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Cart({ defaultProducts }) {
  const user = getUser();
  const [items, setItems] = useState(user ? getCart(user.id) : []);

  const handleRemove = (id) => {
    removeFromCart(id);
    setItems(getCart(user.id));
    toast.success("Removed from cart.");
  };

  const total = items.reduce(
    (sum, item) => sum + Number(item.price.replace(/,/g, "")),
    0,
  );

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-white transition-colors">
        <p className="text-sm text-slate-400">To view cart, login first!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-white transition-colors">
      <div className="w-full max-w-xl mx-auto bg-white rounded-2xl ring-1 ring-slate-100 shadow-xl shadow-slate-200/60 p-6 sm:p-10">
        <div className="flex items-baseline justify-between mb-8 sm:mb-10">
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-slate-900 pb-2 border-b-2 border-amber-500">
            Shopping Cart
          </h2>

          {items.length > 0 && (
            <span className="text-xs text-slate-400 tracking-wide">
              {items.length} {items.length === 1 ? "item" : "items"}
            </span>
          )}
        </div>

        {items.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <svg
              viewBox="0 0 48 32"
              fill="none"
              className="w-12 h-8 mx-auto mb-4 text-slate-300"
            >
              <path
                d="M24 5C19.5 2 12.5 2 8 4v22c4.5-2 11.5-2 16 1V5z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path
                d="M24 5c4.5-3 11.5-3 16-1v22c-4.5-2-11.5-2-16 1V5z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>

            <p className="text-slate-400 text-sm">Your cart is empty.</p>
          </div>
        ) : (
          <>
            <div className="divide-y divide-slate-100">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="group flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4 sm:py-5 px-2 -mx-2 rounded-lg transition-colors hover:bg-slate-50"
                >
                  <div className="flex items-center gap-4">
                    {/* <img
                      src={item.img}
                      alt={item.name}
                      className="w-14 h-20 object-cover rounded-md shadow-sm ring-1 ring-slate-200"
                    /> */}

                    <div>
                      <h3 className="font-medium text-slate-900 text-[15px]">
                        {item.name}
                      </h3>

                      <p className="text-xs text-slate-400 mt-1">Book</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-5 sm:gap-7">
                    <span className="text-[15px] text-slate-500 whitespace-nowrap">
                      {Number(item.price.replace(/,/g, "")).toLocaleString()}
                      <span className="text-xs text-slate-400 uppercase tracking-wide">
                        Toman
                      </span>
                    </span>

                    <button
                      onClick={() => handleRemove(item.id)}
                      aria-label="Delete"
                      className="bg-transparent border-none cursor-pointer p-1.5 -m-1.5 text-slate-400 hover:text-red-500 rounded-full transition-colors"
                    >
                      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
                        <path
                          d="M3 5h14M8 5V3.5A1.5 1.5 0 019.5 2h1A1.5 1.5 0 0112 3.5V5m-7 0v10.5A1.5 1.5 0 006.5 17h7a1.5 1.5 0 001.5-1.5V5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-slate-50 rounded-xl px-4 py-5">
              <div className="flex items-baseline justify-between">
                <span className="text-sm sm:text-base font-medium text-slate-500">
                  Total Amount
                </span>

                <span className="text-xl sm:text-2xl font-bold text-slate-900">
                  {total.toLocaleString()}{" "}
                  <span className="text-sm sm:text-base font-medium text-amber-600">
                    Toman
                  </span>
                </span>
              </div>

              <Link to="/checkout">
                <button
                  className="
                  w-full
                  mt-5
                  py-3
                  rounded-xl
                  bg-slate-900
                  text-white
                  font-medium
                  hover:bg-slate-800
                  transition-colors
                "
                >
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
