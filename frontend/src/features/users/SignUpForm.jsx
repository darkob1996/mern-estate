import { useState } from "react";

import { useSignUp } from "./useSignup";

export default function SignUpForm() {
  const [formData, setFormData] = useState({});

  const { signup, isSigningUp } = useSignUp();

  const handleChange = (e) => {
    const value = e.target.value;
    const field = e.target.id;

    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    signup(formData);
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
        disabled={isSigningUp}
        type="submit"
        className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
      >
        Sign up
      </button>
    </form>
  );
}
