export type FormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export type FormType = "create" | "update" | undefined;

export type FormMappingValues = {
  title: string;
  children: React.ReactNode;
};
