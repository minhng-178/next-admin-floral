import { ColumnDef } from "@tanstack/react-table";
import { Payment } from "payment-models";

const usePayments = () => {
  const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "amount",
      header: "Amount",
    },
  ];

  return {
    columns,
  };
};

export default usePayments;
