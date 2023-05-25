import { useState } from "react"

const PostQuestions = (props) => {

    const [selectedValue, setSelectedValue] = useState('')

    const Choices = [
        { title: props.choice1 },
        { title: props.choice2 },
        { title: props.choice3 }
    ]

    const handleChange = (e) => {
        setSelectedValue(e.target.value)
    }

    const handleSubmit = () => {
        if(selectedValue!=''){
            props.submit(props.id, selectedValue)
        }
    }

    return ( 
        <div className="w-screen h-screen flex justify-center items-center ">
            <div className="bg-black w-full h-full opacity-75"></div>
            <div className="bg-white flex flex-col items-center laptopL:px-8 mobileM:py-3 absolute laptopL:w-3/6 w-3/4">
                <p className="font-mono font-bold text-cyan-blue desktop:text-5xl tablet:text-4xl text-xl text-center">{props.question}</p>
                {Choices.map((choice, index) => (
                    <div key={index} className='border-2 border-cyan-blue bg-#D9D9D9 p-2 pl-5 w-4/5 flex justify-start items-center gap-4 mt-3'>
                        <input type="radio" value={choice.title} checked={selectedValue === choice.title} onChange={handleChange} className="scale-150"/>
                        <label className="font-mono font-bold text-cyan-blue desktop:text-4xl tablet:text-3xl text-xl">{choice.title}</label>
                    </div>
                ))}
                <div className="flex justify-end mt-5 gap-11">
                    <button type="submit" className="bg-cyan-blue font-bold rounded-3xl text-white p-4 desktop:text-2xl desktop:w-40 tablet:w-32 w-28" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
            
        </div> 
    );
}
 
export default PostQuestions;