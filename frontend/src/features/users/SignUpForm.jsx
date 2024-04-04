import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSignUp } from "./useSignup";
import OAuth from "../../ui/OAuth";

export default function SignUpForm() {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({});
  const navigate = useNavigate();

  // const { signup, isSigningUp } = useSignUp();

  const handleChange = (e) => {
    const value = e.target.value;
    const field = e.target.id;

    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        setError(data.message);
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      setError(null);
      navigate("/sign-in");

      // signup(formData);
    } catch (err) {
      setError(data.message);
      setIsLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="username"
        className="border p-3 rounded-lg"
        id="username"
        onChange={handleChange}
      />

      <input
        type="email"
        placeholder="email"
        className="border p-3 rounded-lg"
        id="email"
        onChange={handleChange}
      />

      <input
        type="password"
        placeholder="password"
        className="border p-3 rounded-lg"
        id="password"
        onChange={handleChange}
      />

      <button
        // disabled={isSigningUp}
        type="submit"
        className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
      >
        Sign up
      </button>

      <OAuth />
    </form>
  );
}
