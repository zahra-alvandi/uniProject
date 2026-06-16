import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const user = {
      id: Date.now().toString(),
      email,
      password,
    };
    localStorage.setItem("registeredUser", JSON.stringify(user));
    toast.success("Registration was successful.");
    navigate("/login");
  };

  return (
    <div class="relative min-h-screen overflow-hidden bg-stone-50">
      <img
        src={`${import.meta.env.BASE_URL}images/registerBg.png`}
        className="absolute inset-0 h-full w-full object-cover"
        alt="bookstore background"
      />
      <div class="absolute inset-0 bg-white/25"></div>

      <div class="relative z-10 flex min-h-screen items-center justify-center px-4 py-8">
        <div class="grid w-full max-w-6xl overflow-hidden rounded-3xl border border-stone-200 bg-white/75 shadow-xl backdrop-blur-md md:grid-cols-2">
          <div class="hidden md:block">
            <img
              src={`${import.meta.env.BASE_URL}images/registerPic.png`}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>

          <div className="p-4 md:p-12">
            <div className="w-full max-w-md mx-auto mt-12 md:mt-20 px-0 sm:px-6 md:p-8">
              <h2 className="text-center text-2xl font-bold mb-6">
                Registration
              </h2>

              <div className="w-full max-w-sm mx-auto">
                <form onSubmit={handleRegister} className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 h-12 w-full rounded-xl border border-stone-200 bg-white px-3 md:px-4 text-stone-900 outline-none focus-within:border-amber-300 focus-within:ring-2 focus-within:ring-amber-200">
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
                  <div className="flex items-center gap-2 h-12 w-full rounded-xl border border-stone-200 bg-white px-3 md:px-4 text-stone-900 outline-none focus-within:border-amber-300 focus-within:ring-2 focus-within:ring-amber-200">
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
                    className="h-11 w-full rounded-xl bg-black text-white text-sm md:text-base font-medium hover:bg-gray-800 transition active:scale-[0.98]"
                  >
                    Registration
                  </button>
                </form>
              </div>

              <p className="text-center mt-6 text-sm text-gray-500">
                Do you have an account?{" "}
                <Link to="/login" className="text-black underline font-medium">
                  Enter
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
