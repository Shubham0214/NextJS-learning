"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      const response = await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      setError(false);
    } catch (err: any) {
      console.error(err.response?.data || err.message);
      setError(true);
      setVerified(false);
    }
  };

  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get("token");
    if (urlToken) {
      setToken(urlToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl mb-4">Verify Email</h1>

      {verified && (
        <div className="p-4 bg-green-500 text-white rounded">
          Email verified successfully!{" "}
          <Link className="underline ml-2" href="/login">
            Login now
          </Link>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-500 text-white rounded">
          Verification failed or token expired.
        </div>
      )}

      {!verified && !error && (
        <div className="p-2 bg-yellow-100 text-black rounded">
          Verifying your token...
        </div>
      )}
    </div>
  );
}
