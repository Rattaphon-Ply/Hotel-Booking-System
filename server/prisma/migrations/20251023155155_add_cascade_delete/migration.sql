-- DropForeignKey
ALTER TABLE "public"."RoomAmenity" DROP CONSTRAINT "RoomAmenity_amenityId_fkey";

-- DropForeignKey
ALTER TABLE "public"."RoomAmenity" DROP CONSTRAINT "RoomAmenity_roomId_fkey";

-- AddForeignKey
ALTER TABLE "RoomAmenity" ADD CONSTRAINT "RoomAmenity_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomAmenity" ADD CONSTRAINT "RoomAmenity_amenityId_fkey" FOREIGN KEY ("amenityId") REFERENCES "Amenity"("id") ON DELETE CASCADE ON UPDATE CASCADE;
