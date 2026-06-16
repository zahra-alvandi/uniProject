import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { setUser } from "../storage";
import toast from "react-hot-toast";
import "../App.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const savedUser = localStorage.getItem("registeredUser");

    if (!savedUser) {
      toast.error("No users have registered.");
      return;
    }

    const user = JSON.parse(savedUser);

    if (user.email === email && user.password === password) {
      setUser({ email: user.email, id: user.id });
      toast.success("Welcome");
      navigate("/");
    } else {
      toast.error("Incorrect email or password.");
    }
  };

  return (
    <div className="relative min-h-[100dvh] bg-stone-50 px-4 md:px-8 overflow-hidden">
      <img
        src={`${import.meta.env.BASE_URL}images/loginBg.png`}
        className="absolute inset-0 h-full w-full object-cover"
        alt="bookstore background"
      />

      <div className="absolute inset-0 bg-white/25"></div>

      <div className="relative z-10 flex min-h-[100dvh] items-center justify-center px-4 py-8">
        <div className="grid w-full max-w-full md:max-w-6xl overflow-hidden rounded-3xl border border-stone-200 bg-white/75 shadow-xl backdrop-blur-md md:grid-cols-2">
          <div className="hidden md:block">
            <img
              src={`${import.meta.env.BASE_URL}images/loginPic.png`}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>

          <div className="p-4 md:p-12">
            <div className="w-full max-w-md mx-auto mt-10 md:mt-20 px-0 sm:px-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-stone-900">
                Welcome back
              </h2>

              <p className="mt-2 text-sm text-stone-500 mb-5">
                Sign in to continue exploring your library.
              </p>

              {/* فرم جمع‌تر و وسط‌چین */}
              <div className="w-full max-w-sm mx-auto">
                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                  {/* Email */}
                  <div className="flex items-center gap-2 h-12 w-full rounded-xl border border-stone-200 bg-white px-3 md:px-4 text-stone-900 focus-within:border-amber-300 focus-within:ring-2 focus-within:ring-amber-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5 shrink-0"
                    >
                      <rect x="3.5" y="6" width="17" height="12" rx="2.5" />
                      <path d="M4 7l8 6 8-6" />
                    </svg>

                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex-1 min-w-0 bg-transparent outline-none text-sm md:text-base text-stone-800 placeholder:text-stone-400"
                    />
                  </div>

                  {/* Password */}
                  <div className="flex items-center gap-2 h-12 w-full rounded-xl border border-stone-200 bg-white px-3 md:px-4 text-stone-900 focus-within:border-amber-300 focus-within:ring-2 focus-within:ring-amber-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5 shrink-0"
                    >
                      <rect x="5" y="11" width="14" height="9" rx="2.5" />
                      <path d="M8 11V8.5a4 4 0 0 1 8 0V11" />
                    </svg>

                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="flex-1 min-w-0 bg-transparent outline-none text-sm md:text-base text-stone-800 placeholder:text-stone-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="h-11 w-full rounded-xl bg-stone-900 text-white text-sm md:text-base font-medium hover:bg-stone-800 transition active:scale-[0.98]"
                  >
                    Sign In
                  </button>
                </form>
              </div>

              <p className="text-center mt-6 text-sm text-gray-500">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-black underline font-medium"
                >
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
