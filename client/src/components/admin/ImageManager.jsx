import { Label } from "../ui/label";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ImageManager = ({
  images,
  setImages,
  newImages,
  setNewImages,
  deleteImageIds,
  setDeleteImageIds,
}) => {
  const handleOnChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages((prev) => [...prev, ...files]); // แค่เก็บไฟล์
  };

  const handleMarkDelete = (id) => {
    setDeleteImageIds((prev) => [...prev, id]);
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  return (
    <div>
      <Carousel opts={{ align: "start" }} className="w-full max-w-lg">
        <CarouselContent>
          {images.map((img, index) => {
            const key = img.id ?? `${img.url}-${index}`;
            return (
              <CarouselItem key={key} className="md:basis-1/2 lg:basis-1/3">
                <div className="relative p-1">
                  <img
                    src={img.url}
                    className="w-full h-24 object-cover rounded"
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-0 bg-red-600 text-white w-5 h-5 text-xs rounded-full"
                    onClick={() => handleMarkDelete(img.id)}
                  >
                    X
                  </button>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        {images.length > 3 && (
          <>
            <CarouselPrevious
              type="button"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 text-gray-800 rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-white"
            />
            <CarouselNext
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 text-gray-800 rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-white"
            />
          </>
        )}

      </Carousel>

      <div className="my-2">
        <Label className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-2xl hover:bg-blue-600">
          Upload Images
          <input
            type="file"
            multiple
            onChange={handleOnChange}
            className="hidden" // ซ่อน input จริง
          />
        </Label>
        <div className="mt-2 flex gap-2 flex-wrap">
          {newImages.map((file, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="w-24 h-24 object-cover rounded"
              />
              <button
                type="button"
                className="absolute top-0 right-0 bg-red-600 text-white w-5 h-5 text-xs rounded-full"
                onClick={() =>
                  setNewImages((prev) => prev.filter((_, i) => i !== index))
                }
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageManager;
