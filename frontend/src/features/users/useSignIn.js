import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { signin as signInApi } from "../../services/apiUsers";

export const useSignIn = () => {
  const navigate = useNavigate();

  const {
    mutate: signin,
    isLoading: isSigningIn,
    error,
  } = useMutation({
    mutationFn: signInApi,
    onSuccess: (data) => {
      toast.success("You have successfully signed in.");

      setTimeout(() => {
        navigate("/");
      }, 3000);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { signin, isSigningIn, error };
};
