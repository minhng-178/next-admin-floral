import { PostView } from "@/components/common";
import { usePayments } from "./logic";
import { useTranslations } from "next-intl";

export default function PaymentPage() {
  const { columns } = usePayments();
  const t = useTranslations();

  return (
    <PostView
      columns={columns}
      data={[]}
      showAdd
      showSearch
      showRefresh
      breadcrumb={[{ title: t("common.payments"), url: "/payments" }]}
    />
  );
}
