import { useQuery } from "@tanstack/react-query";

const useUser = () => {
  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => {},
  });

  return { currentUser, isLoading, error };
};

export default useUser;
