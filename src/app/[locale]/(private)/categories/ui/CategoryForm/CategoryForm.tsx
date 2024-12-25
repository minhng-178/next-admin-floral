import React from "react";
import { z } from "zod";
import { Category } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";
import { useZodMapError } from "@/hooks";

export const categorySchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
});
interface CategoryFormProps {
  defaultValues?: Category;
  submitting?: boolean;
  onSubmit: (data: z.infer<typeof categorySchema>) => void;
  onDismiss: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = (props) => {
  const { defaultValues, onSubmit, onDismiss } = props;
  const t = useTranslations();
  const errorMap = useZodMapError();

  const form = useForm<z.infer<typeof categorySchema>>({
    defaultValues: {
      name: defaultValues?.name || "",
      description: defaultValues?.description || "",
    },
    resolver: zodResolver(categorySchema, { errorMap }),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-2 sm:px-0 px-4"
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-2 md:col-span-1">
              <FormLabel>{t("title.name")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t("title.name")}
                  className="text-md"
                  autoFocus
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-2 md:col-span-1">
              <FormLabel>{t("title.description")}</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder={t("title.description")}
                  className="text-md"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end w-full mt-4">
          <Button
            type="button"
            variant={"secondary"}
            onClick={onDismiss}
            className="w-full sm:w-auto mr-2"
          >
            {t("title.cancel")}
          </Button>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full sm:w-auto"
          >
            {t("title.confirm")}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default React.memo(CategoryForm);
