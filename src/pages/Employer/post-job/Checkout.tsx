import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { toast } from "sonner";
import PaymentQRSection from "./components/PaymentQRSection";
import OrderSummarySection from "./components/OrderSummarySection";

const planDetails: Record<string, { title: string; price: number }> = {
  basic: { title: "BASIC", price: 19 },
  standard: { title: "STANDARD", price: 39 },
  premium: { title: "PREMIUM", price: 59 },
};

export default function CheckoutPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const planId = searchParams.get("plan") || "standard";
  const selectedPlan = planDetails[planId] || planDetails.standard;

  const [paymentStatus, setPaymentStatus] = useState<"pending" | "success">(
    "pending",
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setPaymentStatus("success");
      toast.success("Payment confirmed successfully!");
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleCancel = () => {
    navigate("/employer/post-job");
  };

  const handleSuccessRedirect = () => {
    navigate("/employer/post-job/create");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl flex flex-col lg:flex-row overflow-hidden max-h-[90vh] lg:max-h-none overflow-y-auto lg:overflow-visible animate-in zoom-in-95 duration-200">
        <button
          onClick={handleCancel}
          className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors hidden lg:block"
        >
          <X size={20} />
        </button>

        <PaymentQRSection
          planPrice={selectedPlan.price}
          paymentStatus={paymentStatus}
        />

        <OrderSummarySection
          planTitle={selectedPlan.title}
          planPrice={selectedPlan.price}
          paymentStatus={paymentStatus}
          onCancel={handleCancel}
          onSuccessRedirect={handleSuccessRedirect}
        />
      </div>
    </div>
  );
}
