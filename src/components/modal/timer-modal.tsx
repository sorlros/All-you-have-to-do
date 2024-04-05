"use client";

import { useTimer } from "@/app/hooks/use-timer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { IoMdClose } from "react-icons/io";
import { useCallback, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "../ui/dialog";

const TimerModal = () => {
  const timerModal = useTimer();
  const isOpen = useTimer((state) => state.isOpen);
  // const [isLoading, setIsLoading] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={timerModal.onClose}>
      <DialogContent className="h-[70vh] p-0 overflow-hidden">
        <Carousel
          opts={{
            align: "start",
          }}
          orientation="vertical"
          className="w-full max-w-[30%]"
        >
          <CarouselContent className="-mt-1 h-[100px]">
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className="pt-1">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex items-center justify-center p-6">
                      <span className="text-3xl font-semibold">
                        {index + 1}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <Carousel
          opts={{
            align: "start",
          }}
          orientation="vertical"
          className="w-full max-w-[30%]"
        >
          <CarouselContent className="-mt-1 h-[100px]">
            {Array.from({ length: 59 }).map((_, index) => (
              <CarouselItem key={index} className="pt-1">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex items-center justify-center p-6">
                      <span className="text-3xl font-semibold">
                        {index + 1}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </DialogContent>
    </Dialog>
  );
};

export default TimerModal;
