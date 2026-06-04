import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { EmployerService } from "../services/employerService";

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export const useSetupEmployer = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (formData: FormData) => EmployerService.setupProfile(formData),
    onSuccess: () => {
      toast.success("Employer profile created successfully!");
      navigate("/employer/dashboard");
    },
    onError: (error: unknown) => {
      const apiError = error as ApiError;
      const message =
        apiError.response?.data?.message || "Failed to setup profile.";
      toast.error(message);
      console.error("Setup Profile Error:", error);
    },
  });
};
