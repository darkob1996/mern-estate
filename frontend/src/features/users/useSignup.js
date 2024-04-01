import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { signup as signUpApi } from "../../services/apiUsers";

export const useSignUp = () => {
  const {
    mutate: signup,
    isLoading: isSigningUp,
    error,
  } = useMutation({
    mutationFn: signUpApi,
    onSuccess: (data) => {
      toast.success("You have successfully signed up.");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { signup, isSigningUp, error };
};
