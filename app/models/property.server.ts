import type { Property, Image } from "@prisma/client";


import { prisma } from "~/db.server";

export async function getAllProperty({
  skip = 0,
  take = 10,
}: {
  skip: number;
  take: number;
}) {
  const products = await prisma.property.findMany({
    select: {
      id: true,
      address: true,
      city: true,
      type: true,
      name: true,
      description: true,
      price: true,
      area: true,
      bedrooms: true,
      bathrooms: true,
      amenities: true,
      latitude: true,
      status: true,
      longitude: true,
      createdAt: true,
      images: {
        select: {
          id: true,
          url: true,
        },
      },
    },
    skip,
    take,
    orderBy: { updatedAt: "desc" },
  });

  const count = await prisma.property.count();
  return {
    products,
    count,
  };
}

export function getSixProperty({ type }: { type: string }) {
  return prisma.property.findMany({
    where: {
      type: {
        contains: type,
      },
    },
    select: {
      id: true,
      address: true,
      city: true,
      type: true,
      name: true,
      description: true,
      price: true,
      area: true,
      bedrooms: true,
      bathrooms: true,
      amenities: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      longitude: true,
      latitude: true,
      images: {
        select: {
          url: true,
        },
      },
    },
    take: 6,
    orderBy: { updatedAt: "desc" },
  });
}

export function getProperty({ propertyId }: { propertyId: Property["id"] }) {
  return prisma.property.findUniqueOrThrow({
    where: { id: propertyId },
    select: {
      images: {
        select: {
          url: true,
        },
      },
      id: true,
      address: true,
      city: true,
      type: true,
      name: true,
      description: true,
      price: true,
      area: true,
      amenities: true,
      bathrooms: true,
      status: true,
      bedrooms: true,
    },
  });
}

export async function searchProperty({ search }: { search: string }) {
  return await prisma.property.findMany({
    where: {
      OR: [
        {
          type: {
            contains: search,
          },
        },
      ],
    },
    select: {
      id: true,
      address: true,
      city: true,
      type: true,
      name: true,
      description: true,
      price: true,
      area: true,
      bedrooms: true,
      bathrooms: true,
      amenities: true,
      latitude: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      longitude: true,
      images: {
        select: {
          url: true,
        },
      },
    },
  });
}

export async function createProperty({
  address,
  city,
  type,
  name,
  description,
  price,
  area,
  bedrooms,
  bathrooms,
  amenities,
  status,
  images,
}: Pick<
  Property,
  | "address"
  | "city"
  | "type"
  | "name"
  | "description"
  | "price"
  | "area"
  | "bedrooms"
  | "bathrooms"
  | "amenities"
  | "status"
> & {
  images: Pick<Image, "url">[];
}) {
  const product = await prisma.property.create({
    data: {
      address,
      city,
      type,
      name,
      description,
      price,
      area,
      bedrooms,
      bathrooms,
      amenities,
      status,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  images.forEach(async (image: Pick<Image, "url">) => {
    await prisma.image.create({
      data: {
        url: image.url,
        propertyId: product.id,
      },
    });
  });

  return product;
}
