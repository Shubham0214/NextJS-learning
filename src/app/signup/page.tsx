"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false); // ✅ Added this line

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Sign Up Success", response.data);
      toast.success("Signup successful! Redirecting to login...");
      router.push("/login"); // ✅ Optional redirect after success
    } catch (error: any) {
      console.error("Sign Up Failed", error);
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email && user.password && user.username) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-semibold mb-4">
        {loading ? "Processing..." : "Sign Up"}
      </h1>
      <hr className="w-1/2 mb-4" />

      <label htmlFor="username">Username</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none"
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />

      <label htmlFor="email">E-mail</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none"
        id="email"
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />

      <label htmlFor="password">Password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />

      <button
        onClick={onSignup}
        disabled={buttonDisabled || loading}
        className={`p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none ${
          buttonDisabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading
          ? "Creating Account..."
          : buttonDisabled
          ? "No Sign Up"
          : "Sign Up"}
      </button>

      <Link href="/login" className="text-blue-600 underline">
        Visit Login
      </Link>
    </div>
  );
}
