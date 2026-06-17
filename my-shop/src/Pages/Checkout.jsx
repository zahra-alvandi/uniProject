import { useState } from "react";
import { getUser, getCart, removeFromCart } from "../storage";
import toast from "react-hot-toast";

const initialForm = {
  fullName: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
  paymentMethod: "cod",
  notes: "",
};

export default function Checkout() {
  const user = getUser();
  const [items, setItems] = useState(user ? getCart(user.id) : []);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);

  const total = items.reduce((sum, item) => sum + (Number(item.price) || 0), 0);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.fullName.trim()) next.fullName = "Full name is required.";
    if (!form.phone.trim()) next.phone = "Phone number is required.";
    else if (!/^[0-9+\s-]{8,15}$/.test(form.phone.trim()))
      next.phone = "Enter a valid phone number.";
    if (!form.address.trim()) next.address = "Address is required.";
    if (!form.city.trim()) next.city = "City is required.";
    if (!form.postalCode.trim()) next.postalCode = "Postal code is required.";
    else if (!/^[0-9]{5,10}$/.test(form.postalCode.trim()))
      next.postalCode = "Enter a valid postal code.";
    return next;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      toast.error("Please check the highlighted fields.");
      return;
    }

    items.forEach((item) => removeFromCart(item.id));
    setItems([]);
    setOrderPlaced(true);
    toast.success("Order placed successfully.");
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4 bg-slate-50">
        <p className="text-sm text-slate-400">To checkout, login first!</p>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4 bg-slate-50">
        <div className="w-full max-w-md text-center bg-white rounded-2xl ring-1 ring-slate-100 shadow-lg p-10">
          <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-5">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-6 h-6 text-amber-600"
            >
              <path
                d="M5 13l4 4L19 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <h2 className="font-serif text-2xl font-semibold text-slate-900 mb-2">
            Order placed
          </h2>

          <p className="text-sm text-slate-500 mb-8">
            Thanks, {form.fullName.split(" ")[0]}. We’ll contact you at{" "}
            {form.phone}.
          </p>

          <a
            href="/"
            className="inline-block bg-slate-900 text-white text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-slate-800 transition"
          >
            Back to shop
          </a>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4 bg-slate-50">
        <p className="text-sm text-slate-400">
          Your cart is empty. Add some books before checking out.
        </p>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 py-16 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto md:py-10">
        {/* Header */}
        <div className="mb-10 pt-8">
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-slate-900 inline-block pb-2 border-b-2 border-amber-500">
            Checkout
          </h2>
          <p className="text-sm text-slate-500 mt-3">
            Complete your order and get your books delivered
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="order-2 lg:order-1 lg:col-span-2 space-y-8"
          >
            {/* Shipping */}
            <div className="bg-white rounded-2xl ring-1 ring-slate-100 shadow-sm p-6 sm:p-8">
              <h3 className="text-sm font-semibold text-slate-900 mb-5">
                Shipping details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Full name" error={errors.fullName}>
                  <input
                    value={form.fullName}
                    onChange={handleChange("fullName")}
                    className={inputClass(errors.fullName)}
                  />
                </Field>

                <Field label="Phone number" error={errors.phone}>
                  <input
                    value={form.phone}
                    onChange={handleChange("phone")}
                    className={inputClass(errors.phone)}
                  />
                </Field>

                <div className="sm:col-span-2">
                  <Field label="Address" error={errors.address}>
                    <input
                      value={form.address}
                      onChange={handleChange("address")}
                      className={inputClass(errors.address)}
                    />
                  </Field>
                </div>

                <Field label="City" error={errors.city}>
                  <input
                    value={form.city}
                    onChange={handleChange("city")}
                    className={inputClass(errors.city)}
                  />
                </Field>

                <Field label="Postal code" error={errors.postalCode}>
                  <input
                    value={form.postalCode}
                    onChange={handleChange("postalCode")}
                    className={inputClass(errors.postalCode)}
                  />
                </Field>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-2xl ring-1 ring-slate-100 shadow-sm p-6 sm:p-8">
              <h3 className="text-sm font-semibold text-slate-900 mb-5">
                Payment method
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <PaymentOption
                  value="cod"
                  current={form.paymentMethod}
                  onChange={handleChange("paymentMethod")}
                  title="Cash on delivery"
                  description="Pay when delivered"
                />

                <PaymentOption
                  value="card"
                  current={form.paymentMethod}
                  onChange={handleChange("paymentMethod")}
                  title="Card payment"
                  description="Pay online"
                />
              </div>
            </div>

            {/* Notes */}
            <div className="bg-white rounded-2xl ring-1 ring-slate-100 shadow-sm p-6 sm:p-8">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">
                Order notes
              </h3>

              <textarea
                value={form.notes}
                onChange={handleChange("notes")}
                rows={3}
                className={inputClass(false) + " resize-none"}
                placeholder="Optional..."
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto bg-slate-900 text-white text-sm font-medium px-8 py-3 rounded-xl hover:bg-slate-800 active:scale-[0.98] transition"
            >
              Place order
            </button>
          </form>

          {/* SUMMARY */}
          <aside className="order-1 lg:order-2 lg:col-span-1">
            <div className="bg-white rounded-2xl ring-1 ring-slate-100 shadow-lg p-6 lg:sticky lg:top-24">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">
                Order summary
              </h3>

              <div className="divide-y divide-slate-100">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between py-3">
                    <span className="text-sm text-slate-700">{item.name}</span>

                    <span className="text-sm text-slate-500">
                      {Number(item.price.replace(/,/g, "")).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex justify-between bg-slate-50 rounded-xl p-4">
                <span className="text-sm text-slate-500 font-medium">
                  Total
                </span>

                <span className="text-lg font-bold text-slate-900">
                  {total.toLocaleString()}{" "}
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

/* helpers */
function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700 mb-1 block">
        {label}
      </span>
      {children}
      {error && (
        <span className="text-xs text-red-500 mt-1 block">{error}</span>
      )}
    </label>
  );
}

function PaymentOption({ value, current, onChange, title, description }) {
  const selected = current === value;

  return (
    <label
      className={`flex gap-3 p-4 rounded-xl border cursor-pointer transition ${
        selected
          ? "border-amber-500 bg-amber-50"
          : "border-slate-200 hover:border-slate-300"
      }`}
    >
      <input
        type="radio"
        value={value}
        checked={selected}
        onChange={onChange}
        className="accent-amber-600 mt-1"
      />

      <div>
        <p className="text-sm font-medium text-slate-900">{title}</p>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
    </label>
  );
}

function inputClass(error) {
  return `
    w-full rounded-lg border px-3 py-2 text-sm
    focus:outline-none focus:ring-2 focus:ring-amber-500/30
    ${error ? "border-red-300" : "border-slate-200 focus:border-amber-500"}
  `;
}
