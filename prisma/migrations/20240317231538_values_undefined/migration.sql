-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Property" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "price" REAL,
    "area" REAL,
    "bedrooms" INTEGER,
    "bathrooms" INTEGER,
    "amenities" TEXT,
    "latitude" REAL,
    "longitude" REAL,
    "status" TEXT,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
INSERT INTO "new_Property" ("address", "amenities", "area", "bathrooms", "bedrooms", "city", "createdAt", "description", "id", "latitude", "longitude", "name", "price", "status", "type", "updatedAt") SELECT "address", "amenities", "area", "bathrooms", "bedrooms", "city", "createdAt", "description", "id", "latitude", "longitude", "name", "price", "status", "type", "updatedAt" FROM "Property";
DROP TABLE "Property";
ALTER TABLE "new_Property" RENAME TO "Property";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
