interface Props {
  viewMode: "list" | "grid";
}

export default function EmployerList({ viewMode }: Props) {
  return (
    <div className={viewMode === "grid" ? "grid grid-cols-3 gap-4 mt-4" : "space-y-4 mt-4"}>
      {/* render employers */}
    </div>
  );
}