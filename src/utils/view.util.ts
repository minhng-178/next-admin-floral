import { PHONE_NUMBER_PATTERN, VN_DATE_FORMAT_PATTERN } from "@/constants";
import dayjs from "dayjs";

export default class ViewUtil {
  static displayValue = (value: string | undefined | null): string => {
    return value || "-";
  };

  static displayDate = (
    value: string | Date | undefined | null,
    format = VN_DATE_FORMAT_PATTERN
  ): string => {
    return value ? dayjs(value).format(format) : "-";
  };

  static displayPhone = (
    phoneNumber: string | number | undefined | null
  ): string => {
    if (phoneNumber === undefined || phoneNumber === null) {
      return "-";
    }
    const cleanedPhoneNumber = phoneNumber.toString().replace(/\D/g, "");
    const formattedPhoneNumber = cleanedPhoneNumber.replace(
      PHONE_NUMBER_PATTERN,
      "$1 $2 $3"
    );
    return formattedPhoneNumber;
  };

  static displayRangeDate = (
    value: {
      from: string | number | undefined;
      to: string | number | undefined;
    },
    format = VN_DATE_FORMAT_PATTERN
  ): string => {
    return value?.from
      ? `${dayjs(value.from).format(format)} - ${dayjs(value.to).format(
          format
        )}`
      : "-";
  };

  static displayNumber = (
    number: number | string | undefined | null
  ): string => {
    if (!number) return "0";
    const num =
      typeof number === "string" ? parseInt(number.toString(), 10) : number;
    return num?.toLocaleString("en-US");
  };

  static displayDimension = (dimension: any): string => {
    if (!dimension) return "-";
    return `${dimension?.length} x ${dimension?.width} x ${dimension?.height}`;
  };

  static displayLocaleText =
    (locale: string) =>
    (value: { [key: string]: string } | undefined | null): string => {
      return ViewUtil.displayValue(value?.[locale]);
    };
}
