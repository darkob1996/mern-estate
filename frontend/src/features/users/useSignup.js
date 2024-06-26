import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { signup as signUpApi } from "../../services/apiUsers";
import { useNavigate } from "react-router-dom";

export const useSignUp = () => {
  const navigate = useNavigate();

  const {
    mutate: signup,
    isLoading: isSigningUp,
    error,
  } = useMutation({
    mutationFn: signUpApi,
    onSuccess: (data) => {
      toast.success("You have successfully signed up.");

      setTimeout(() => {
        navigate("/sign-in");
      }, 3000);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { signup, isSigningUp, error };
};
