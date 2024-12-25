import { z } from "zod";
import { useTranslations } from "next-intl";

const hasInclusiveType = [
  "inclusive",
  "inclusive_one",
  "inclusive_other",
  "inclusive_with_path",
  "inclusive_with_path_one",
  "inclusive_with_path_other",
  "not_inclusive",
  "not_inclusive_one",
  "not_inclusive_other",
  "not_inclusive_with_path",
  "not_inclusive_with_path_one",
  "not_inclusive_with_path_other",
].reverse();

const keyMapping = {
  zodMapError(t: ReturnType<typeof useTranslations>): z.ZodErrorMap {
    return (issue, ctx) => {
      let key = "";
      const mapIssueValue = (
        baseKey: string,
        value: number | bigint | undefined,
        suffix: string
      ) => {
        if (value !== undefined) {
          return (
            t(`${baseKey}`, {
              [suffix]: value?.toString(),
              path: issue.path.join("."),
            }) ?? ctx.defaultError
          );
        }
        return ctx.defaultError;
      };

      switch (issue.code) {
        case "too_small":
          const inclusiveType = Object.keys(issue).find(
            (item) => hasInclusiveType.indexOf(item) !== -1
          );
          key = `${issue.code}.${issue.type}.${inclusiveType}`;
          return {
            message: mapIssueValue(key, issue?.minimum, "minimum"),
          };
        case "too_big":
          const inclusiveBigType = Object.keys(issue).find(
            (item) => hasInclusiveType.indexOf(item) !== -1
          );
          key = `${issue.code}.${issue.type}.${inclusiveBigType}`;
          return { message: mapIssueValue(key, issue?.maximum, "maximum") };
        case "invalid_string":
          key = `${issue?.code}.${issue.validation}`;
          break;
        default:
          key = issue.code;
      }

      return {
        message: t(key, issue as any) ?? ctx.defaultError,
      };
    };
  },
};

export default keyMapping;
