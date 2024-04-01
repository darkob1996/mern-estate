import { Link } from "react-router-dom";
import SignInForm from "../features/users/SignInForm";

export default function SignIn() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign in</h1>

      <SignInForm />

      <div className="flex gap-2 mt-5">
        <p>Don't have an account?</p>

        <Link to="/sign-up">
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
    </div>
  );
}
