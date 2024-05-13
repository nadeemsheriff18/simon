import React ,{useState,useEffect ,useRef} from 'react'
import Header from './Header';
import Gamebtn from './Gamebtn';
import './App.css';

const colors=["green","red","yellow","blue"];
const Game = () => {

  const greenRef = useRef(null);
  const redRef = useRef(null);
  const yellowRef = useRef(null);
  const blueRef = useRef(null);

  const [sequence, setSequence]=useState([]);
  const [playing, setPlaying]=useState(false);
  
  const [playingIdx, setPlayingIdx] = useState(0);
  
  
  const handleNextLevel=()=>{
   if(!playing){
    setPlaying(true);
    
    addNewColor();
   }
  };

  const addNewColor=()=>{
    const color= colors[Math.floor(Math.random()*4)];
    const newSequence=[...sequence, color];
    setSequence(newSequence);
  }

  const handleColorClick=(e)=>{
     if(playing) {
      e.target.classList.add("hover");
      setTimeout(()=>{
        e.target.classList.remove("hover");
      const clickedColor= e.target.getAttribute("color");
      if(sequence[playingIdx]===clickedColor){
        if(playingIdx === sequence.length-1){
          setTimeout(()=>{
            setPlayingIdx(0);
            addNewColor();
          },300);
        }
        else{
          setPlayingIdx(playingIdx+1);
         }
      }
     
     else{
         
          resetGame();
     }
    },300);
  }
};
 useEffect(()=>{
  if(sequence.length>0){
    const showSequence=(idx=0)=>{
      let ref=null;
      if (sequence[idx] === "green") ref = greenRef;
        if (sequence[idx] === "red") ref = redRef;
        if (sequence[idx] === "yellow") ref = yellowRef;
        if (sequence[idx] === "blue") ref = blueRef;

        setTimeout(() => {
          ref.current.classList.add("hover");

          setTimeout(() => {
            ref.current.classList.remove("hover");
            if (idx < sequence.length - 1) showSequence(idx + 1);
          }, 300);
        }, 300);
      };

      showSequence();
    }
    
  },[sequence]);



const resetGame=()=>{
  
  
  setSequence([]);
  setPlaying(false);
  setPlayingIdx(0);
}



  return (
    <div>
    <div className='header'>
    <Header />
    </div>
    <div className='container'>
   <button className='info' onClick={handleNextLevel}>{sequence.length===0?"PLAY":`LEVEL ${sequence.length}`}</button>
    <div className='game'>
        <Gamebtn color= "green" className="green" onClick={handleColorClick} ref={greenRef} />
        <Gamebtn color= "red" className="red" onClick={handleColorClick} ref={redRef} />
        <Gamebtn color= "blue" className="blue" onClick={handleColorClick} ref={blueRef} />
        <Gamebtn color= "yellow" className="yellow" onClick={handleColorClick} ref={yellowRef} />
        
    </div>
    
    </div>
    </div>
    
  )

}
export default Game