// ذخیره و بازیابی داده‌ها از localStorage

export const getProducts = () => {
  const data = localStorage.getItem("products");
  return data ? JSON.parse(data) : [];
};

export const addProduct = (product) => {
  const products = getProducts();
  product.id = Date.now().toString();
  products.push(product);
  localStorage.setItem("products", JSON.stringify(products));
  return products;
};

export const deleteProduct = (id) => {
  let products = getProducts();
  products = products.filter((p) => p.id !== id);
  localStorage.setItem("products", JSON.stringify(products));
  return products;
};

export const getUser = () => {
  const data = localStorage.getItem("user");
  return data ? JSON.parse(data) : null;
};

export const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const removeUser = () => {
  localStorage.removeItem("user");
};

export const getCart = (userId) => {
  const data = localStorage.getItem("cart");
  const cart = data ? JSON.parse(data) : [];
  return cart.filter((item) => item.userId === userId);
};

export const addToCart = (userId, product) => {
  const data = localStorage.getItem("cart");
  const cart = data ? JSON.parse(data) : [];
  const item = {
    id: Date.now().toString(),
    userId,
    productId: product.id,
    name: product.name,
    price: product.price,
  };
  cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const removeFromCart = (id) => {
  const data = localStorage.getItem("cart");
  let cart = data ? JSON.parse(data) : [];
  cart = cart.filter((item) => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const getTheme = () => {
  return localStorage.getTheme("theme") || "right";
}

export const setTheme = (theme) => {
  localStorage.setItem("theme", theme)
}