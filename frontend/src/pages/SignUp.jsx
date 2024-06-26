import { Link } from "react-router-dom";
import SignUpForm from "../features/users/SignUpForm";

export default function SignUp() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign up</h1>

      <SignUpForm />

      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>

        <Link to="/sign-in">
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
    </div>
  );
}
