import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInFailure, signInStart, signInSuccess } from "./userSlice";

import { useSignIn } from "./useSignIn";
import OAuth from "../../ui/OAuth";

export default function SignInForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const { signin, isSigningIn, error } = useSignIn();

  const handleChange = (e) => {
    const value = e.target.value;
    const field = e.target.id;

    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.status === "fail") {
        throw new Error(data.message);
      }

      dispatch(signInSuccess(data.data.user));
    } catch (err) {
      dispatch(signInFailure(err.message));
    }

    // signin(formData, {
    //   onSettled: () => {
    //     setFormData({ email: "", password: "" });
    //   },
    // });
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
        disabled={loading}
        type="submit"
        className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
      >
        Sign in
      </button>

      <OAuth />
    </form>
  );
}
