import { Modal, Button, Carousel } from "flowbite-react";
import { useState } from "react";
import Router from "next/router";
import jumpjackp1 from '@/gifs/jumpjack-preview1.gif'
import jumpjackp2 from '@/gifs/jumpjack-preview2.gif'
import jumpjackp3 from '@/gifs/jumpjack-preview3.gif'
import jumpjackp4 from '@/gifs/jumpjack-preview4.gif'
import plankp1 from '@/gifs/plank-preview1.gif'
import plankp2 from '@/gifs/plank-preview2.gif'
import plankp3 from '@/gifs/plank-preview3.gif'
import plankp4 from '@/gifs/plank-preview4.gif'
import pushupp1 from '@/gifs/pushup-preview1.gif'
import pushupp2 from '@/gifs/pushup-preview2.gif'
import pushupp3 from '@/gifs/pushup-preview3.gif'
import pushupp4 from '@/gifs/pushup-preview4.gif'
import situpp1 from '@/gifs/situps-preview1.gif'
import situpp2 from '@/gifs/situps-preview2.gif'
import situpp3 from '@/gifs/situps-preview3.gif'
import situpp4 from '@/gifs/situps-preview4.gif'
import squatp1 from '@/gifs/squat-preview1.gif'
import squatp2 from '@/gifs/squat-preview2.gif'
import squatp3 from '@/gifs/squat-preview3.gif'
import squatp4 from '@/gifs/squat-preview4.gif'
import Image from "next/image";


const Guides = ({name}) => {

    const [guide, setGuide] = useState(true);

    const router = Router;

    function handleGuide() {
    setGuide(false);
    router.push('/dashboard')
    }

    const pushprev = (
        <Carousel slideInterval={5000}>
            <Image src={pushupp1} alt="..."/>
            <Image src={pushupp2} alt="..."/>
            <Image src={pushupp3} alt="..."/>
            <Image src={pushupp4} alt="..." />
        </Carousel>
    )

    const sitprev = (
        <Carousel slideInterval={5000}>
            <Image src={situpp1} alt="..."/>
            <Image src={situpp2} alt="..."/>
            <Image src={situpp3} alt="..."/>
            <Image src={situpp4} alt="..." />
        </Carousel>
    )

    const jumpjackprev = (
        <Carousel slideInterval={5000}>
            <Image src={jumpjackp1} alt="..."/>
            <Image src={jumpjackp2} alt="..."/>
            <Image src={jumpjackp3} alt="..."/>
            <Image src={jumpjackp4} alt="..." />
        </Carousel>
    )

    const squatprev = (
        <Carousel slideInterval={5000}>
            <Image src={squatp1} alt="..."/>
            <Image src={squatp2} alt="..."/>
            <Image src={squatp3} alt="..."/>
            <Image src={squatp4} alt="..." />
        </Carousel>
    )

    const plankprev = (
        <Carousel slideInterval={5000}>
            <Image src={plankp1} alt="plankp1"/>
            <Image src={plankp2} alt="plankp2"/>
            <Image src={plankp3} alt="plankp3"/>
            <Image src={plankp4} alt="plankp4" />
        </Carousel>
    )

    const waifus = (
        <Carousel slideInterval={3000}>
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
    )   

    return ( <Modal
        show={guide}
        size="5xl"
        popup={true}
        onClose={()=>handleGuide()}
      >
        <Modal.Header>
          {name} Sample Clips
        </Modal.Header>
        <Modal.Body>
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
            {name === "PUSH-UPS" ? pushprev : name === "SIT-UPS" ? sitprev : name === "JUMPING JACK" ? jumpjackprev : name === "SQUATS" ? squatprev : name === "PLANKING" ? plankprev : waifus}
        </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex justify-end w-full gap-3">
          <Button onClick={ () => {setGuide(false)} }>
            I Understand
          </Button>
          <Button color="gray" onClick={ () => handleGuide() }>
            Decline
          </Button>
          </div>
        </Modal.Footer>
      </Modal> );
}
 
export default Guides;