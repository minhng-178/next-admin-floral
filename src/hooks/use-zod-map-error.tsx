import { KeyMapping } from "@/helpers";
import { useTranslations } from "next-intl";

export const useZodMapError = () => {
  const t = useTranslations("zod");
  return KeyMapping.zodMapError(t);
};
