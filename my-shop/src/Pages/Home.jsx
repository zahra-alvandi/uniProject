import { useState } from "react";
import { getProducts, getUser, addToCart } from "../storage";
import toast from "react-hot-toast";
import "../App.css";

const defaultProducts = [
  {
    id: 1,
    name: "classic English Novels Collection",
    price: "500,000",
    img: "images/product-1.png",
  },
  {
    id: 2,
    name: "Modern English Fiction Set",
    price: "700,000",
    img: "images/product-2.png",
  },
  {
    id: 3,
    name: "Contemporary Literature Bundle ",
    price: "300,000",
    img: "images/product-3.png",
  },
  {
    id: 4,
    name: "Premium English Novel Pack",
    price: "600,000",
    img: "images/product-4.png",
  },
  {
    id: 5,
    name: "Inspiring Fiction Collection",
    price: "900,000",
    img: "images/product-5.png",
  },
  {
    id: 6,
    name: "Romance & Drama Novel Set",
    price: "750,000",
    img: "images/product-6.png",
  },
  {
    id: 7,
    name: "Adventure & Fantasy Book Bundle ",
    price: "450,000",
    img: "images/product-7.png",
  },
  {
    id: 8,
    name: "World Literature Collection ",
    price: "670,000",
    img: "images/product-8.png",
  },
  {
    id: 9,
    name: "Mystery & Thriller Novel Collection",
    price: "950,000",
    img: "images/product-9.png",
  },
  {
    id: 10,
    name: "Sci‑Fi & Dystopian Fiction Set ",
    price: "1,000,000",
    img: "images/product-10.png",
  },
  {
    id: 11,
    name: "Vintage Classic Novel Collection",
    price: "1,500,000",
    img: "images/product-11.png",
  },
  {
    id: 12,
    name: "Modern Bestseller Fiction Pack",
    price: "850,000",
    img: "images/product-12.png",
  },
];

export default function Home({ darkMode }) {
  const savedProducts = getProducts();
  const products = savedProducts.length > 0 ? savedProducts : defaultProducts;
  const cardBg = darkMode ? "#1f2937" : "#ffffff";
  const textColor = darkMode ? "#f9fafb" : "#000000";
  const borderColor = darkMode ? "#374151" : "#e5e7eb";

  const handleAddToCart = (product) => {
    const user = getUser();
    if (!user) {
      toast.error("Please login first.");
      return;
    }
    addToCart(user.id, product);
    toast.success(`${product.name} Added to cart!`);
  };

  return (
    <div>
      <svg className="hidden">
        <symbol
          id="star"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
            clip-rule="evenodd"
          />
        </symbol>
        <symbol
          id="shopping-cart"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          />
        </symbol>
        <symbol
          id="arrows-right-left"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="size-5"
        >
          <path
            fill-rule="evenodd"
            d="M13.2 2.24a.75.75 0 0 0 .04 1.06l2.1 1.95H6.75a.75.75 0 0 0 0 1.5h8.59l-2.1 1.95a.75.75 0 1 0 1.02 1.1l3.5-3.25a.75.75 0 0 0 0-1.1l-3.5-3.25a.75.75 0 0 0-1.06.04Zm-6.4 8a.75.75 0 0 0-1.06-.04l-3.5 3.25a.75.75 0 0 0 0 1.1l3.5 3.25a.75.75 0 1 0 1.02-1.1l-2.1-1.95h8.59a.75.75 0 0 0 0-1.5H4.66l2.1-1.95a.75.75 0 0 0 .04-1.06Z"
            clip-rule="evenodd"
          />
        </symbol>
      </svg>
      <div className="relative">
        <img
          src="/images/banner.png"
          className="hidden md:block bg-cover w-full"
          alt=""
        />
        <img
          src="/images/banner-mobile.png"
          className="md:hidden bg-cover w-full"
          alt=""
        />
        <p className="hidden md:block absolute text-4xl lg:top-56 top-[56px] md:left-64  text-white w-96">
          Dive Into Stories That Inspire, Excite, and Move You
        </p>
      </div>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-8">
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              backgroundColor: cardBg,
              color: textColor,
              borderColor: borderColor,
            }}
            className="p-2 md:p-5 rounded-2xl bg-white border border-gray-300 hover:shadow-md hover:scale-105 transition-all"
          >
            <div className="w-full h-52 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden text-gray-400 mb-4">
              <img
                src={product.img}
                className="w-full h-full object-cover"
                alt=""
              />
            </div>
            <h3
              className="text-md line-clamp-1 font-medium mb-2 text-gray-900"
              style={{
                backgroundColor: cardBg,
                color: textColor,
                borderColor: borderColor,
              }}
            >
              {product.name}
            </h3>
            <p
              className="text-gray-600 mb-4"
              style={{
                backgroundColor: cardBg,
                color: textColor,
                borderColor: borderColor,
              }}
            >
              {product.price?.toLocaleString()} Toman
            </p>
            {/* cart btn and rate */}
            <div className="flex items-center justify-between mt-2.5 border-t border-gray-300 dark:border-gray-600 pt-2">
              <div class="flex items-center gap-x-2.5 md:gap-x-4">
                <button onClick={() => handleAddToCart(product)}>
                  <span className="flex items-center justify-center w-[26px] h-[26px] md:w-9 md:h-9 rounded-full text-gray-400 bg-gray-200 hover:bg-teal-600 hover:text-white transition-all cursor-pointer dark:bg-gray-600 dark:hover:bg-emerald-500">
                    <svg class="w-4 h-4 md:w-[22px] md:h-[22px]">
                      <use href="#shopping-cart"></use>
                    </svg>
                  </span>
                </button>
                <span class="block rounded-full text-gray-400 hover:text-teal-600 dark:hover:text-emerald-500 transition-all cursor-pointer">
                  <svg class="w-4 h-4 md:w-4.5 md:h-4.5 lg:w-6 lg:h-6">
                    <use href="#arrows-right-left"></use>
                  </svg>
                </span>
              </div>
              <div class="flex text-yellow-400">
                <svg className="w-4 h-4 md:w-4.5 md:h-4.5 lg:w-6 lg:h-6 text-gray-300 dark:text-gray-500">
                  <use href="#star"></use>
                </svg>
                <svg className="w-4 h-4 md:w-4.5 md:h-4.5 lg:w-6 lg:h-6 text-gray-300 dark:text-gray-500">
                  <use href="#star"></use>
                </svg>
                <svg class="w-4 h-4 md:w-4.5 md:h-4.5 lg:w-6 lg:h-6">
                  <use href="#star"></use>
                </svg>
                <svg class="w-4 h-4 md:w-4.5 md:h-4.5 lg:w-6 lg:h-6">
                  <use href="#star"></use>
                </svg>
                <svg class="w-4 h-4 md:w-4.5 md:h-4.5 lg:w-6 lg:h-6">
                  <use href="#star"></use>
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* section 2 */}
      <div className="mt-8 mb-10 md:my-20">
        <div className="container mx-auto">
          <div className="text-white">
            <div className="flex flex-col items-center pr-7 md:pr-12 md:justify-center md:items-end bg-zinc-700 rounded-2xl h-[124px] md:h-[348px] bg-category w-full">
              <h5 className="text-2xl/6 md:text-4xl/6 leading-6 mb-4 md:mb-7">
                Different type of books
              </h5>
              <span className="md:text-xl/6">
                you can live a new life with books!
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* footer */}
      <footer className="bg-stone-50 border-t border-stone-200 text-stone-700 dark:bg-stone-950 dark:border-stone-800 dark:text-stone-300">
        <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 lg:px-8">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <img
                  src="/images/footerLogo.png"
                  alt="ChapterOne"
                  className="h-32 w-auto"
                />
                <span className="text-lg font-semibold text-stone-900 dark:text-white">
                  Book Store
                </span>
              </div>

              <p className="max-w-sm text-sm leading-6 text-stone-600 dark:text-stone-400">
                A simple place for people who enjoy books. Discover new titles,
                old favorites, and everything in between.
              </p>

              <div className="pt-2">
                <h3 className="text-sm font-medium text-stone-900 dark:text-white">
                  Subscribe to our newsletter
                </h3>

                <p className="mt-1 text-sm text-stone-500">
                  New arrivals, reading picks, and occasional discounts.
                </p>

                <form className="mt-4 flex max-w-sm gap-3">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-amber-700 dark:border-stone-700 dark:bg-stone-900"
                  />

                  <button className="rounded-xl bg-amber-800 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-amber-700">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>

            <div className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center gap-8 xl:col-span-2 xl:mt-0">
              <div>
                <h3 className="text-sm font-semibold text-stone-900 dark:text-white">
                  Shop
                </h3>

                <ul className="mt-5 space-y-3 text-sm">
                  <li>
                    <a
                      href="#"
                      className="hover:text-amber-700 transition-colors"
                    >
                      Best Sellers
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-amber-700 transition-colors"
                    >
                      New Releases
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-amber-700 transition-colors"
                    >
                      Deals
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-amber-700 transition-colors"
                    >
                      Gift Cards
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-stone-900 dark:text-white">
                  Categories
                </h3>

                <ul className="mt-5 space-y-3 text-sm">
                  <li>
                    <a
                      href="#"
                      className="hover:text-amber-700 transition-colors"
                    >
                      Fiction
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-amber-700 transition-colors"
                    >
                      Fantasy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-amber-700 transition-colors"
                    >
                      History
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-amber-700 transition-colors"
                    >
                      Children
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-stone-900 dark:text-white">
                  Help
                </h3>

                <ul className="mt-5 space-y-3 text-sm">
                  <li>
                    <a
                      href="#"
                      className="hover:text-amber-700 transition-colors"
                    >
                      Shipping
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-amber-700 transition-colors"
                    >
                      Returns
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-amber-700 transition-colors"
                    >
                      Track Order
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-amber-700 transition-colors"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-stone-900 dark:text-white">
                  Follow
                </h3>

                <ul className="mt-5 space-y-3 text-sm">
                  <li>
                    <a
                      href="#"
                      className="hover:text-amber-700 transition-colors"
                    >
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-amber-700 transition-colors"
                    >
                      Pinterest
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-amber-700 transition-colors"
                    >
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-amber-700 transition-colors"
                    >
                      Goodreads
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-stone-200 pt-6 text-sm text-stone-500 dark:border-stone-800 md:flex-row">
            <p>© 2026 Book Store. All rights reserved.</p>

            <div className="flex items-center gap-4">
              <a
                href="#"
                className="hover:text-stone-900 dark:hover:text-white"
              >
                Privacy Policy
              </a>

              <a
                href="#"
                className="hover:text-stone-900 dark:hover:text-white"
              >
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
