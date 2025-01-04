"use client";
import Spinner from "@/components/Spinner";
import { signIn } from "next-auth/react"; // استيراد دالة signin
import { useRouter } from "next/router";
import { useState } from "react";

export default function Signin() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
      });
      // alert("Stop");
      if (!result.error) {
        router.push("/");
      } else {
        setError("Invalid email or password");
        setTimeout(() => {
          setError("");
        }, 4000);
      }
    } catch {
      setError("Sign-in failed try again");
      setTimeout(() => {
        setError("");
      }, 4000);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setError("");
      }, 4000);
    }
  };

  return (
    <div className="flex flex-center full-h">
      <div className="loginform">
        <div className="heading">Sign In - Create Admin</div>

        {loading ? (
          <div className="flex flex-center w-100 flex-col">
            <Spinner /> Checking...
          </div>
        ) : (
          <>
            <form className="form" onSubmit={handleSubmit}>
              <input
                type="email"
                onChange={handleChange}
                className="input"
                name="email"
                placeholder="Enter email address"
                required
              />
              <input
                type="password"
                onChange={handleChange}
                className="input"
                name="password"
                placeholder="Password"
                required
              />
              <button className="login-button" type="submit" disabled={loading}>
                {loading ? "Loading..." : "Sign In"}
              </button>
              {error && <p>{error}</p>}
            </form>
            <span className="agreement">
              <a target="_blank" href="#">
                Learn Admin licence agreement
              </a>
            </span>
          </>
        )}
      </div>
    </div>
  );
}
