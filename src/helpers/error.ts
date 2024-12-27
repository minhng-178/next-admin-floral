import { z } from "zod";
import { toast } from "sonner";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export function getErrorMessage(err: unknown) {
  const unknownError = "Oops! Something went wrong. Please try again later.";

  if (err instanceof z.ZodError) {
    const errors = err.issues.map((issue) => {
      return issue.message;
    });
    return errors.join("\n");
  } else if (err instanceof Error) {
    return err.message;
  } else if (isRedirectError(err)) {
    throw err;
  } else {
    return unknownError;
  }
}

export function showErrorToast(err: unknown) {
  const errorMessage = getErrorMessage(err);
  return toast.error(errorMessage);
}
