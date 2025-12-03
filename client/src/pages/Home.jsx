import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import useStore from "@/store/store";
import { useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Home = () => {
  const rooms = useStore((s) => s.rooms);
  const getRooms = useStore((s) => s.getRooms);

  useEffect(() => {
    getRooms();
  }, []);

  const latestRooms = rooms
    .slice()
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 10); // เก็บหลายห้องเผื่อเลื่อน

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <motion.h1
        className="text-5xl font-extrabold text-green-900 text-center mb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Discover Your Green Stay
      </motion.h1>

      {/* Carousel */}
      <div className="relative">
        <Carousel>
          <CarouselContent className="p-8">
            {latestRooms.map((room, index) => (
              <CarouselItem
                key={room.name}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <Card className="relative rounded-3xl overflow-hidden shadow-lg border-green-200 border-2 transform hover:scale-105 transition-transform duration-300">
                    {index === 0 && (
                      <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
                        New
                      </div>
                    )}
                    <img
                      src={room.images[0].url}
                      alt={room.name}
                      className="w-full h-64 object-cover"
                    />
                    <CardContent className="bg-green-100 text-green-900">
                      <h2 className="text-2xl font-semibold mb-2">
                        {room.name}
                      </h2>
                      <p>{room.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 bg-green-700 text-white p-2 rounded-full shadow-lg hover:bg-green-800">
            ◀
          </CarouselPrevious>
          <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 bg-green-700 text-white p-2 rounded-full shadow-lg hover:bg-green-800">
            ▶
          </CarouselNext>
        </Carousel>
      </div>
    </div>
  );
};

export default Home;
