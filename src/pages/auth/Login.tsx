import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useLogin } from "../../hooks/useAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: loginUser, isPending } = useLogin();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter your email and password.");
      return;
    }

    loginUser({ email, password });
  };

  return (
    <div className="w-full max-w-md mx-auto mt-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign in</h1>
        <p className="text-gray-500">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-medium hover:underline"
          >
            Create Account
          </Link>
        </p>
      </div>

      <form onSubmit={handleLogin} className="flex flex-col gap-5">
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex items-center justify-between -mt-1">
          <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-gray-300"
            />
            <span>Remember Me</span>
          </label>
          <Link
            to="/forgot-password"
            className="text-blue-600 font-medium hover:underline"
          >
            Forgot password
          </Link>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full mt-2 py-3 px-4 bg-blue-600 text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-blue-700 disabled:opacity-70 transition-all"
        >
          {isPending ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <>
              Sign In <ArrowRight size={20} />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
