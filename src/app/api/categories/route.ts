import { ENetworkStatus } from "@/enums";
import { db } from "@/lib/prisma";
import { Category, Prisma } from "@prisma/client";
import { PagingResponse } from "base-models";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams;
    const search = params.get("search");
    const page = params.get("page");
    const pageSize = params.get("pageSize");

    const pageNum = parseInt(page as string, 10) || 1;
    const size = parseInt(pageSize as string, 10) || 10;
    const skip = (pageNum - 1) * size;

    const where = search
      ? {
          OR: [
            {
              name: {
                contains: Array.isArray(search) ? search.join(" ") : search,
                mode: Prisma.QueryMode.insensitive,
              },
            },
          ],
        }
      : {};

    const [categories, total] = await Promise.all([
      db.category.findMany({
        where,
        skip,
        take: size,
        orderBy: { createdAt: "desc" },
      }),
      db.category.count({ where }),
    ]);

    const responsePaging: PagingResponse<Category> = {
      items: categories,
      pagination: {
        page: pageNum,
        pageSize: size,
        totalItems: total,
        totalPages: Math.ceil(total / size),
        hasPreviousPage: pageNum > 1,
        hasNextPage: pageNum * size < total,
      },
    };

    return NextResponse.json(
      {
        message: "Categories fetched successfully",
        success: true,
        status: ENetworkStatus.OK,
        data: responsePaging,
      },
      { status: 200 }
    );
  } catch (e: any) {
    return NextResponse.json(
      { error: e || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, description, status } = await req.json();

    if (!name) {
      return NextResponse.json(
        {
          message: "Category name is required",
          success: false,
          status: ENetworkStatus.BAD_REQUEST,
          data: null,
        },
        { status: 400 }
      );
    }

    const existingCategory = await db.category.findUnique({ where: { name } });

    if (existingCategory) {
      return NextResponse.json(
        {
          message: "Category already exists",
          success: false,
          status: ENetworkStatus.BAD_REQUEST,
          data: null,
        },
        { status: 400 }
      );
    }

    const category = await db.category.create({
      data: { name, description, status: status ?? true },
    });

    return NextResponse.json(
      {
        message: "Category created successfully",
        success: true,
        status: ENetworkStatus.OK,
        data: category,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error?.message || "Error creating category",
        success: false,
        status: ENetworkStatus.INTERNAL_SERVER_ERROR,
        data: null,
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, name, description, status } = await req.json();

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

    const updatedCategory = await db.category.update({
      where: { id: Number(id) },
      data: { name, description, status },
    });

    return NextResponse.json(
      {
        message: "Category updated successfully",
        success: true,
        status: ENetworkStatus.OK,
        data: updatedCategory,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error?.message || "Error updating category",
        success: false,
        status: ENetworkStatus.INTERNAL_SERVER_ERROR,
        data: null,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");

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

    await db.category.delete({ where: { id: Number(id) } });
    return NextResponse.json(
      {
        message: "Category deleted successfully",
        success: true,
        status: ENetworkStatus.OK,
        data: null,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error?.message || "Error deleting category",
        success: false,
        status: ENetworkStatus.INTERNAL_SERVER_ERROR,
        data: null,
      },
      { status: 500 }
    );
  }
}
