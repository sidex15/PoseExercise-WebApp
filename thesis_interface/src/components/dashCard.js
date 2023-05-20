import React, { Component } from "react";
import { FaPlayCircle } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import ExerciseContext from "../pages/api/exercise-context";
import { Modal, Button, Carousel } from "flowbite-react";

const Card = (props) => {
  const router = useRouter();

  const { exerName, setExerName } = useContext(ExerciseContext);
  const  [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(true);
  };

  const understand = () => {
    setExerName(props.name);
    router.push("/session");
  }

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
      <Modal
          show={show}
          size="5xl"
          popup={true}
          onClose={()=>setShow(false)}
        >
          <Modal.Header>
            Session Guide
          </Modal.Header>
          <Modal.Body>
          <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
            <Carousel slideInterval={5000}>
              <img
                src="https://images2.alphacoders.com/130/1309135.png"
                alt="..."
              />
              <img
                src="https://images6.alphacoders.com/991/991135.jpg"
                alt="..."
              />
              <img
                src="https://images4.alphacoders.com/100/1001620.jpg"
                alt="..."
              />
              <img
                src="https://images5.alphacoders.com/121/1211733.jpg"
                alt="..."
              />
              <img
                src="https://images4.alphacoders.com/122/1226166.jpg"
                alt="..."
              />
            </Carousel>
          </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="flex justify-end w-full gap-3">
            <Button onClick={() => {setShow(false), understand()}}>
              I Understand
            </Button>
            <Button color="gray" onClick={() => setShow(false)}>
              Decline
            </Button>
            </div>
          </Modal.Footer>
        </Modal>
    </div>
  );
};

export default Card;
