import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Input } from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      login(data.student);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-200 px-4">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-2xl text-ink-800 mb-1 text-center">
          CampusFlow
        </h1>
        <p className="text-sm text-ink-400 text-center mb-8">
          Sign in to your student hub.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-cream-50 border border-ink-100 rounded-lg p-6 space-y-4 shadow-subtle"
        >
          <Input
            label="College email"
            type="email"
            placeholder="you@college.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" className="w-full" size="md" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </Button>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </form>

        <p className="text-sm text-ink-400 text-center mt-5">
          New to CampusFlow?{" "}
          <Link to="/register" className="text-clay-600 hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
