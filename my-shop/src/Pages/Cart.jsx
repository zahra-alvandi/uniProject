import { useState } from "react";
import { getUser, getCart, removeFromCart } from "../storage";
import toast from "react-hot-toast";

export default function Cart() {
  const user = getUser();
  const [items, setItems] = useState(user ? getCart(user.id) : []);

  const handleRemove = (id) => {
    removeFromCart(id);
    setItems(getCart(user.id));
    toast.success("Removed from cart.");
  };

  const total = items.reduce((sum, item) => sum + (item.price || 0), 0);

  if (!user) {
    return (
      <div className="text-center py-20 relative">
        <p className="text-gray-500 absolute top-40 left-0 right-0 mx-auto">To view cart, login first!</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto my-12 px-4">
      <h2 className="text-2xl font-bold mb-8">Shopping cart</h2>
      {items.length === 0 ? (
        <p className="text-gray-400">Your cart is empty.</p>
      ) : (
        <>
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-center py-5 border-b border-gray-100">
              <span className="font-medium">{item.name}</span>
              <div className="flex items-center gap-6">
                <span className="text-gray-500">{item.price?.toLocaleString()} Toman</span>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="bg-transparent border-none cursor-pointer text-red-400 hover:text-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          <div className="text-left mt-6 text-lg font-bold">
           Total amount: {total.toLocaleString()} Toman
          </div>
        </>
      )}
    </div>
  );
}