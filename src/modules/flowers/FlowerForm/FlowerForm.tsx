import { FileUploader, PreviewFile } from "@/components/common";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useZodMapError } from "@/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Flower } from "@prisma/client";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { CloudinaryResponse } from "upload";
import { z } from "zod";

export const flowerSchema = z.object({
  name: z.string().min(1),
  price: z.number().positive().min(1),
  stock: z.number().positive().max(100000),
  description: z.string().min(1).optional(),
  images: z.array(z.instanceof(File)).optional(),
});

interface FlowerFormProps {
  defaultValues?: Flower;
  submitting?: boolean;
  isLoading?: boolean;
  progresses?: Record<string, number>;
  uploadedFiles?: CloudinaryResponse[];
  onSubmit: (data: z.infer<typeof flowerSchema>) => void;
  onDismiss: () => void;
}

const FlowerForm: React.FC<FlowerFormProps> = (props) => {
  const {
    defaultValues,
    submitting,
    isLoading,
    progresses,
    uploadedFiles,
    onSubmit,
    onDismiss,
  } = props;

  const errorMap = useZodMapError();
  const t = useTranslations();
  const form = useForm<z.infer<typeof flowerSchema>>({
    defaultValues: {
      name: defaultValues?.name || "",
      description: defaultValues?.description || "",
      price: defaultValues?.price || 0,
      stock: defaultValues?.stock || 0,
      images: [],
    },
    resolver: zodResolver(flowerSchema, { errorMap }),
  });

  useEffect(() => {
    form.reset({
      name: defaultValues?.name || "",
      description: defaultValues?.description || "",
      price: defaultValues?.price || 0,
      stock: defaultValues?.stock || 0,
    });
  }, [defaultValues, form]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col h-full gap-3 p-3"
      >
        <div className="flex-1">
          <div className="grid gap-4">
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
              name="price"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>{t("title.price")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder={t("title.price")}
                      className="text-md"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="stock"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>{t("title.stock")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder={t("title.stock")}
                      className="text-md"
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
                <FormItem className="col-span-2">
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
            <FormField
              name="images"
              control={form.control}
              render={({ field }) => (
                <div className="space-y-6">
                  <FormItem className="w-full">
                    <FormLabel>{t("title.image")}</FormLabel>
                    <FormControl>
                      <FileUploader
                        value={field.value}
                        onValueChange={field.onChange}
                        maxFileCount={4}
                        maxSize={4 * 1024 * 1024}
                        progresses={progresses}
                        disabled={submitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  {uploadedFiles && uploadedFiles.length > 0 ? (
                    <PreviewFile uploadedFiles={uploadedFiles} />
                  ) : null}
                </div>
              )}
            />
          </div>
        </div>
        <div className="flex w-full">
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
            disabled={form.formState.isSubmitting || submitting}
            className="w-full sm:w-auto"
          >
            {t("title.confirm")}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default React.memo(FlowerForm);
