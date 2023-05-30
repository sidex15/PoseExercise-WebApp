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
            <Image src={pushupp1} alt="..." className="h-auto object-contain"/>
            <Image src={pushupp2} alt="..." className="h-auto object-contain"/>
            <Image src={pushupp3} alt="..." className="h-auto object-contain"/>
            <Image src={pushupp4} alt="..." className="h-auto object-contain"/>
        </Carousel>
    )

    const sitprev = (
        <Carousel slideInterval={5000}>
            <Image src={situpp1} alt="..." className="h-auto object-contain"/>
            <Image src={situpp2} alt="..." className="h-auto object-contain"/>
            <Image src={situpp3} alt="..." className="h-auto object-contain"/>
            <Image src={situpp4} alt="..." className="h-auto object-contain"/>
        </Carousel>
    )

    const jumpjackprev = (
        <Carousel slideInterval={5000}>
            <Image src={jumpjackp1} alt="..."className="h-auto object-contain"/>
            <Image src={jumpjackp2} alt="..."className="h-auto object-contain"/>
            <Image src={jumpjackp3} alt="..."className="h-auto object-contain"/>
            <Image src={jumpjackp4} alt="..."className="h-auto object-contain"/>
        </Carousel>
    )

    const squatprev = (
        <Carousel slideInterval={5000}>
            <Image src={squatp1} alt="..." className="object-contain"/>
            <Image src={squatp2} alt="..." className="object-contain"/>
            <Image src={squatp3} alt="..." className="object-contain"/>
            <Image src={squatp4} alt="..." className="object-contain"/>
        </Carousel>
    )

    const plankprev = (
        <Carousel slideInterval={5000}>
            <Image src={plankp1} alt="plankp1" className="h-auto object-contain"/>
            <Image src={plankp2} alt="plankp2" className="h-auto object-contain"/>
            <Image src={plankp3} alt="plankp3" className="h-auto object-contain"/>
            <Image src={plankp4} alt="plankp4" className="h-auto object-contain"/>
        </Carousel>
    )

    const waifus = (
        <Carousel slideInterval={3000}>
              <img
                src="https://images2.alphacoders.com/130/1309135.png"
                alt="..."
                className="h-auto"
              />
              <img
                src="https://images6.alphacoders.com/991/991135.jpg"
                alt="..."
                className="h-auto"
              />
              <img
                src="https://images4.alphacoders.com/100/1001620.jpg"
                alt="..."
                className="h-auto"
              />
              <img
                src="https://images5.alphacoders.com/121/1211733.jpg"
                alt="..."
                className="h-auto"
              />
              <img
                src="https://images4.alphacoders.com/122/1226166.jpg"
                alt="..."
                className="h-auto"
              />
            </Carousel>
    )   

    return ( <Modal
        show={guide}
        size="2xl"
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
            Go back
          </Button>
          </div>
        </Modal.Footer>
      </Modal> );
}
 
export default Guides;