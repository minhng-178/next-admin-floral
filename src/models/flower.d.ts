import { Image } from "@prisma/client";

export interface FlowerPayload {
  name: string;
  categoryId: string;
  price: number;
  stock: number;
  description: string;
  images: Image[];
}
