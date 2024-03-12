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
      updatedAt: true,
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

export function getFiveProperty() {
  return prisma.property.findMany({
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
      updatedAt: true,
      createdAt: true,
      images: {
        select: {
          url: true,
        },
      },
    },
    take: 5,
    orderBy: { updatedAt: "desc" },
  });
}

export function getProperty({ propertyId }: { propertyId: Property["id"] }) {
  return prisma.property.findMany({
    where: { id: propertyId },
    orderBy: { updatedAt: "desc" },
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
