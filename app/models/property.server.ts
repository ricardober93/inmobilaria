import type { Property } from "@prisma/client";

import { prisma } from "~/db.server";

export function getAllProperty() {
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
    },
  });
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

export function createProperty({
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
  latitude,
  status,
}: Property) {
  return prisma.property.create({
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
      latitude,
      status,
    },
  });
}
