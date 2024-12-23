import { InboxIcon } from "@/assets/icons";
import { useTranslations } from "next-intl";

interface EmptyViewProps {
  title?: string;
  description?: string;
}

export default function EmptyView({
  title,
  description,
}: EmptyViewProps): React.ReactElement {
  const t = useTranslations();

  return (
    <div className="flex flex-col items-center justify-center h-[50vh] gap-6">
      <div className="flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full dark:bg-gray-800">
        <InboxIcon className="w-10 h-10 text-gray-500 dark:text-gray-400" />
      </div>
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold tracking-tight">
          {title || t("common.no-data-found")}
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          {description || t("common.no-data-available-yet")}
        </p>
      </div>
    </div>
  );
}
