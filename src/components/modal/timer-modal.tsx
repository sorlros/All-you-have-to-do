"use client";

import { useTimer } from "@/app/hooks/use-timer";
import { Dialog, DialogContent } from "../ui/dialog";
import TimeCarousel from "../time-carousel";
import { Button } from "../ui/button";
import DayCarousel from "../day-carousel";
import useTimerStore from "@/app/hooks/use-timer-store";
import { useEffect } from "react";
import { FaSun } from "react-icons/fa";
import { MdNightlight } from "react-icons/md";

const TimerModal = () => {
  const timerModal = useTimer();
  const isOpen = useTimer((state) => state.isOpen);

  const { content, setContent, time, day } = useTimerStore();

  useEffect(() => {
    console.log("time&day", time, day);
    console.log("content", content);
  }, [time, day, content]);

  const handleSubmit = () => {
    if (content === "" || time === "" || day === "") {
      console.log("At least one of content, time, or day is empty");
      alert("AAA");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={timerModal.onClose}>
      <DialogContent className="w-full h-[70vh] p-6 overflow-hidden flex flex-col bg-white">
        <div className="">
          <Button
            variant="secondary"
            size="sm"
            className="hover:bg-slate-400 active:bg-slate-700"
          >
            <FaSun className="text-orange-600 mr-2" />
            AM
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="hover:bg-slate-400 active:bg-slate-700"
          >
            <MdNightlight className="text-yellow-400 mr-2" />
            PM
          </Button>
        </div>
        <TimeCarousel />
        <DayCarousel />
        <Button
          type="submit"
          variant="outline"
          size="lg"
          className="flex text-center"
          onClick={() => {
            handleSubmit();
          }}
        >
          알람 저장하기
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default TimerModal;
