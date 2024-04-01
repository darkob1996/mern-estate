import { useState } from "react";

import { useSignIn } from "./useSignIn";

export default function SignInForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  console.log(formData);

  const { signin, isSigningIn, error } = useSignIn();

  const handleChange = (e) => {
    const value = e.target.value;
    const field = e.target.id;

    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    signin(formData, {
      onSettled: () => {
        setFormData({ email: "", password: "" });
      },
    });
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="e.g. example@example.com"
        className="border p-3 rounded-lg"
        id="email"
        onChange={handleChange}
        value={formData.email}
      />

      <input
        type="password"
        placeholder="password"
        className="border p-3 rounded-lg"
        id="password"
        onChange={handleChange}
        value={formData.password}
      />

      <button
        disabled={isSigningIn}
        type="submit"
        className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
      >
        Sign in
      </button>
    </form>
  );
}
