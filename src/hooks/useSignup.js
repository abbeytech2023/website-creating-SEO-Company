import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useSignup() {
  const navigate = useNavigate();
  const {
    mutateAsync: signup,
    isPending,
    error,
  } = useMutation({
    mutationFn: signupApi,

    onSuccess: () => {
      toast.success("Account created successfully");
      navigate("/dashboard");
    },

    onError: (err) => {
      console.error("Signup error:", err);

      if (err?.message === "User already registered") {
        toast.error("Email already taken");
      } else {
        toast.error(
          err?.message || "Unable to create your account. Please try again.",
        );
      }
    },
  });

  return {
    signup,
    isPending,
    error,
  };
}
