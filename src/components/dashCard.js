import React, { Component } from "react";
import { FaPlayCircle } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
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
      <div className="relative flex flex-col laptop:h-80 laptop:w-80 tablet:h-64 tablet:w-64 h-56 w-56 rounded-lg shadow-2xl shadow-rgba(3,4,94,0.71)">
        <div className="absolute w-full laptop:h-56 tablet:h-44 h-36 flex justify-center items-center">
          <p className="font-mono font-bold laptop:text-5xl tablet:text-4xl text-3xl text-white">
            {props.name}
          </p>
        </div>
        <div>
          <Image
            className="rounded-t-lg laptop:h-56 tablet:h-44 h-36"
            src={props.picsrc}
            alt="dashcardImage"
          />
        </div>
        <div className="flex justify-center items-center h-full">
          <button
            className="text-cyan-blue font-bold rounded-3xl p-3 flex justify-center gap-x-2"
            onClick={() => {
              handleClick();
            }}
          >
            <span className="self-center text-2xl">Start Session</span>
            <FaPlayCircle className="laptop:h-12 laptop:w-12 tablet:h-10 tablet:w-10 h-8 w-8" color="blue" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
