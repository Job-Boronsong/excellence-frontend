import React, { useState } from "react";
import API from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await API.post("auth/token/", { email, password });
      localStorage.setItem("token", res.data.access);
      alert("✅ Logged in successfully!");
      window.location.href = "/dashboard"; // Redirect after login
    } catch (err) {
      setError("❌ Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-slate-900">
      <form
        onSubmit={loginUser}
        className="bg-white dark:bg-slate-800 shadow-md rounded-xl p-6 w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-slate-100">
          Admin Login
        </h2>

        {error && (
          <p className="text-red-500 text-center text-sm">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 dark:border-slate-600 rounded px-3 py-2 dark:bg-slate-700 dark:text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 dark:border-slate-600 rounded px-3 py-2 dark:bg-slate-700 dark:text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
