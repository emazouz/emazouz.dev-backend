import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function SignUp() {
  const { data: session, status } = useSession();
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const router = useRouter();
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Password do not match");
      return;
    }

    const res = await fetch("/api/auth/signup", {
      method: "Post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (data.error) {
      setError("Error happend here");
      setTimeout(() => {
        setError("");
      }, 3000);
    } else {
      router.push("/auth/signin");
    }
  };

  return (
    <>
      <div className="flex flex-center full-h">
        <div className="loginform">
          <div className="heading"> Sing Up Create Admin</div>

          <form className="form" onSubmit={handleSubmit}>
            <input
              type="email"
              onChange={handleChange}
              className="input"
              name="email"
              placeholder="enter email address"
            />
            <input
              type="password"
              onChange={handleChange}
              className="input"
              name="password"
              placeholder="password"
            />
            <input
              type="password"
              onChange={handleChange}
              className="input"
              name="confirmPassword"
              placeholder="ConfirmPassword"
            />
            <button className="login-button" type="submit">
              Sign Up
            </button>
            {error && <h3>{error}</h3>}
          </form>
          <span className="agreement">
              <a target="_blank" href="#">
                Learn Admin licence agreement
              </a>
            </span>
        </div>
      </div>
    </>
  );
}
