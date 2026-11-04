"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import GoogleButton from "./GoogleButton";

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const requested = params.get("redirect") || "/";
  // only allow same-site paths (prevents open redirects)
  const redirect = requested.startsWith("/") && !requested.startsWith("//") ? requested : "/";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const form = new FormData(e.currentTarget);
    setLoading(true);
    const { error } = await authClient.signIn.email({
      email: String(form.get("email")),
      password: String(form.get("password")),
    });
    setLoading(false);
    if (error) {
      const message = error.message || "Invalid email or password";
      setError(message);
      toast.error(message);
      return;
    }
    toast.success("Welcome back to BookNook!");
    router.push(redirect);
    router.refresh();
  };

  return (
    <section className="page-wrap flex justify-center py-12">
      <div className="w-full max-w-md rounded-box border border-base-300 bg-base-100 p-8 shadow-sm">
        <h1 className="section-title text-center">Login to BookNook</h1>
        <p className="mt-2 text-center opacity-70">Welcome back, reader.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="form-control block">
            <span className="mb-1 block text-sm font-medium">Email</span>
            <input name="email" type="email" required placeholder="you@example.com" className="input input-bordered w-full" />
          </label>
          <label className="form-control block">
            <span className="mb-1 block text-sm font-medium">Password</span>
            <input name="password" type="password" required placeholder="Your password" className="input input-bordered w-full" />
          </label>
          <div className="text-right">
            <button
              type="button"
              className="link link-primary text-sm"
              onClick={() => toast.info("Password reset is not available yet. Please contact support.")}
            >
              Forgot password?
            </button>
          </div>
          {error && <p role="alert" className="rounded-field bg-error/10 px-3 py-2 text-sm text-error">{error}</p>}
          <button className="btn btn-primary w-full" disabled={loading}>
            {loading && <span className="loading loading-spinner loading-sm" />} Login
          </button>
        </form>

        <div className="divider my-6">OR</div>
        <GoogleButton callbackURL={redirect} />

        <p className="mt-6 text-center text-sm">
          New to BookNook?{" "}
          <Link href={`/register`} className="link link-primary font-semibold">Create an account</Link>
        </p>
      </div>
    </section>
  );
}
