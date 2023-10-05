import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Confetti from "react-confetti";
import { BiVolumeFull, BiVolumeMute } from "react-icons/bi";

import tick from "./assets/tick.mp3";
import celebration from "./assets/celebration.mp3";
import WheelComponent from "./WheelComponent";
import Needle from "./icons/Needle";

const WheelContent = () => {
  const tickRef = useRef(null);
  const celebrationRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [sound, setSound] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [numbers, setNumbers] = useState({
    0: "",
    1: "",
    2: "",

  });

  const segments = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const segments2 = ["0","1"];
  const segColors = ["#FF0000", "#ffffff"];

  const onFinished = (winner, id) => {
    setNumbers((prevState) => {
      return {
        ...prevState,
        [id]: winner,
      };
    });
  };

  useEffect(() => {
    if (sound) {
      tickRef.current.volume = 1;
      celebrationRef.current.volume = 1;
    } else {
      tickRef.current.volume = 0;
      celebrationRef.current.volume = 0;
    }
  }, [sound]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
      <div className="absolute top-5 right-5">
        <button
          className="bg-white rounded-full p-1.5 border-2 border-slate-600"
          onClick={() => {
            setSound(!sound);
          }}
        >
          {sound ? <BiVolumeFull size={24} /> : <BiVolumeMute size={24} />}
        </button>
      </div>
      <div className="hidden">
        <audio id="audio" loop src={tick} ref={tickRef} />
      </div>
      <div className="hidden">
        <audio id="audio" src={celebration} ref={celebrationRef} />
      </div>
      <div className="p-2.5 relative min-h-screen">
        <div className="absolute-center rotate-90">
          <WheelComponent
            segments={segments}
            segColors={segColors}
            winningSegment=""
            onFinished={(winner) => {
              onFinished(winner, 2);
              setShowPopup(true);
              tickRef.current.pause();
              celebrationRef.current.play();
              setStarted(false);
            }}
            // primaryColor="black"
            primaryColoraround="#ffffffb4"
            contrastColor="black"
            buttonText="SPIN"
            isOnlyOnce={false}
            size={300}
            upDuration={50}
            downDuration={450}
            id="canvas1"
            textspace={130}
          />
        </div>
        <div className="absolute-center rotate-90">
          <WheelComponent
            segments={segments}
            segColors={segColors}
            winningSegment=""
            onFinished={(winner) => onFinished(winner, 1)}
            primaryColor="black"
            primaryColoraround="#ffffffb4"
            contrastColor="black"
            buttonText="SPIN"
            isOnlyOnce={false}
            size={260}
            upDuration={50}
            downDuration={400}
            id="canvas2"
            textspace={90}
          />
        </div>
        <div className="absolute-center rotate-90">
          <WheelComponent
            segments={segments2}
            segColors={segColors}
            winningSegment=""
            onFinished={(winner) => onFinished(winner, 0)}
            primaryColor="black"
            primaryColoraround="#ffffffb4"
            contrastColor="black"
            buttonText="SPIN"
            isOnlyOnce={false}
            size={180}
            upDuration={50}
            downDuration={350}
            id="canvas3"
            textspace={40}
          />
        </div>
        
        
        <button
          id="spin"
          className="absolute-center rounded-full cursor-pointer rotate-90"
          disabled={started}
          onClick={() => {
            setNumbers({
              0: "",
              1: "",
              2: "",
            });
            tickRef.current.play();
            setStarted(true);
          }}
        >
          <Needle />
          <span className="absolute-center text-white text-2xl font-bold mt-2 -rotate-90 select-none">
            SPIN
          </span>
          {numbers[0] && (
            <div className="w-0.5 h-60 bg-black absolute -top-60 left-1/2 -translate-x-1/2 z-[999]" />
          )}
        </button>
      </div>
      <div className="flex gap-4 justify-center mb-10 mr-20">
        <div className={numbers[0] ? "numbers-active" : "numbers-inactive"}>
          {numbers[0] ? numbers[0] : "3th Num"}
        </div>
        <div className={numbers[1] ? "numbers-active" : "numbers-inactive"}>
          {numbers[1] ? numbers[1] : "2th Num"}
        </div>
        <div className={numbers[2] ? "numbers-active" : "numbers-inactive"}>
          {numbers[2] ? numbers[2] : "1rd Num"}
        </div>
        
      </div>
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute-center w-full">
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg p-10 m-5 space-y-6 max-w-3xl w-full mx-auto"
              >
                <div className="absolute inset-0 w-full h-full max-w-3xl mx-auto my-5 pointer-events-none">
                  <Confetti width="740" height="340" />
                </div>
                <p className="text-3xl text-slate-700 font-bold text-center w-full">
                  Winner Doorprize
                </p>
                <p className="text-4xl text-black font-bold text-center">
                  {numbers[0] +
                    "  " +
                    numbers[1] +
                    "  " +
                    numbers[2] }
                </p>
                
                <div className="button-wrap">
                  <button
                    className="button"
                    onClick={() => {
                      setShowPopup(false);
                    }}
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WheelContent;
