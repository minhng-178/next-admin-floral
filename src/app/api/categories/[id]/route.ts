import { ENetworkStatus } from "@/enums";
import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET({ params }: { params: Promise<{ id: string }> }) {
  console.log("params", params);

  try {
    const id = (await params).id;

    if (!id) {
      return NextResponse.json(
        {
          message: "Category ID is required",
          success: false,
          status: ENetworkStatus.BAD_REQUEST,
          data: null,
        },
        { status: 400 }
      );
    }

    const category = await db.category.findUnique({
      where: { id: Number(id) },
    });

    if (!category) {
      return NextResponse.json(
        {
          message: "Category not found",
          success: false,
          status: ENetworkStatus.NOT_FOUND,
          data: null,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Category fetched successfully",
        success: true,
        status: ENetworkStatus.OK,
        data: category,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error?.message || "Error fetching category",
        success: false,
        status: ENetworkStatus.INTERNAL_SERVER_ERROR,
        data: null,
      },
      { status: 500 }
    );
  }
}
