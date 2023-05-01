import React, { Component } from "react";
import { FaPlayCircle } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext } from "react";
import ExerciseContext from "../pages/api/exercise-context";

const Card = (props) => {
  const router = useRouter();

  const { exerName, setExerName } = useContext(ExerciseContext);

  const handleClick = () => {
    setExerName(props.name);
    router.push("/session");
  };

  return (
    <div className="flex p-7">
      <div className="h-80 w-80 rounded-lg shadow-2xl shadow-rgba(3,4,94,0.71)">
        <div className="absolute w-80 text-center mt-20">
          <p className="font-mono font-bold text-5xl text-white">
            {props.name}
          </p>
        </div>
        <div>
          <Image
            className="rounded-t-lg h-56"
            src={props.picsrc}
            alt="dashcardImage"
          />
        </div>
        <div className="mt-3 flex justify-center">
          <button
            className="text-cyan-blue font-bold rounded-3xl p-3 flex justify-center gap-x-2"
            onClick={() => {
              handleClick();
            }}
          >
            <span className="self-center text-2xl">Start Session</span>
            <FaPlayCircle size="50px" color="blue" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
