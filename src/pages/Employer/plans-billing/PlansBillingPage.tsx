import { useState, useMemo } from "react";
import { toast } from "sonner";
import CurrentPlanCard from "./components/CurrentPlanCard";
import NextInvoiceCard from "./components/NextInvoiceCard";
import PlanBenefitsCard from "./components/PlanBenefitsCard";
import InvoicesTable, { type Invoice } from "./components/InvoicesTable";

const mockInvoices: Invoice[] = [
  {
    id: "#487441",
    date: "Dec 7, 2019 23:26",
    plan: "Premium",
    amount: "$999 USD",
  },
  {
    id: "#653518",
    date: "Dec 7, 2019 23:26",
    plan: "Standard",
    amount: "$999 USD",
  },
  {
    id: "#267400",
    date: "Dec 7, 2019 23:26",
    plan: "Premium",
    amount: "$999 USD",
  },
  {
    id: "#651535",
    date: "Dec 7, 2019 23:26",
    plan: "Premium",
    amount: "$999 USD",
  },
  {
    id: "#449003",
    date: "Dec 7, 2019 23:26",
    plan: "Premium",
    amount: "$999 USD",
  },
  {
    id: "#558612",
    date: "Dec 7, 2019 23:26",
    plan: "Premium",
    amount: "$999 USD",
  },
  {
    id: "#112233",
    date: "Nov 7, 2019 23:26",
    plan: "Premium",
    amount: "$999 USD",
  },
  {
    id: "#445566",
    date: "Oct 7, 2019 23:26",
    plan: "Standard",
    amount: "$599 USD",
  },
];

const ITEMS_PER_PAGE = 6;

export default function PlansBillingPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const [currentPlan, setCurrentPlan] = useState({
    isActive: true,
    name: "Premium",
    description:
      "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere.",
    amount: "$59.00 USD",
    dueDate: "Nov 28, 2021",
    packageStarted: "Jan 28, 2021",
  });

  const totalPages = Math.ceil(mockInvoices.length / ITEMS_PER_PAGE);

  const currentInvoices = useMemo(() => {
    return mockInvoices.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE,
    );
  }, [currentPage]);

  const handleChangePlan = () => toast.info("Redirecting to Pricing page...");

  const handleCancelPlan = () => {
    if (!currentPlan.isActive) {
      toast.info("Your plan is already canceled.");
      return;
    }

    const confirmCancel = window.confirm(
      "Are you sure you want to cancel your Premium plan? You will lose access to premium features at the end of your billing cycle.",
    );
    if (confirmCancel) {
      setCurrentPlan((prev) => ({
        ...prev,
        isActive: false,
        name: "Canceled (Pending Downgrade)",
        description:
          "Your plan has been canceled and will be downgraded to Free at the end of the current billing cycle.",
      }));
      toast.success("Your plan has been canceled successfully.");
    }
  };

  const handlePayNow = () => {
    if (!currentPlan.isActive) {
      toast.error("Cannot process payment for a canceled plan.");
      return;
    }

    if (isProcessing) return;

    setIsProcessing(true);
    toast.loading("Processing your payment...", { id: "payment-toast" });

    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Payment successful! Thank you.", { id: "payment-toast" });
    }, 2000);
  };

  const handleDownloadInvoice = (id: string) => {
    const invoice = mockInvoices.find((inv) => inv.id === id);
    if (!invoice) return;

    const dummyContent = `INVOICE RECEIPT\n\nInvoice ID: ${invoice.id}\nDate: ${invoice.date}\nPlan: ${invoice.plan}\nAmount Paid: ${invoice.amount}\n\nThank you for choosing our service!`;

    const blob = new Blob([dummyContent], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Invoice_${invoice.id.replace("#", "")}.pdf`);

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    toast.success(`Invoice ${id} downloaded successfully.`);
  };

  return (
    <div className="w-full max-w-360 mx-auto animate-in fade-in duration-500 pb-16">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-4 flex flex-col gap-8">
          <div className="flex-1">
            <CurrentPlanCard
              planName={currentPlan.name}
              description={currentPlan.description}
              onChangePlan={handleChangePlan}
              onCancelPlan={handleCancelPlan}
            />
          </div>
          <div className="flex-1">
            <NextInvoiceCard
              amount={currentPlan.amount}
              dueDate={currentPlan.dueDate}
              packageStarted={currentPlan.packageStarted}
              onPayNow={handlePayNow}
            />
          </div>
        </div>

        <div className="xl:col-span-8 flex flex-col gap-8">
          <div className="flex-1">
            <PlanBenefitsCard />
          </div>
        </div>

        <div className="xl:col-span-12 mt-4">
          <InvoicesTable
            invoices={currentInvoices}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            onDownload={handleDownloadInvoice}
          />
        </div>
      </div>
    </div>
  );
}
