import React, {useState} from "react";
import "./styles.css";
import quizSections from  "./quizSections"

export default function App() {
  const [angles, setInput] = useState([]);
  const [message, setMessage] = useState("");
  const [currentSelection, setSelection] = useState("1");
  const [randomAngles, setRandomAngles] = useState([]);

  function handleInput(e){
    setInput(angles => [...angles, Number(e.target.value)]);
  }

  function handleClick() {
    let total = angles.reduce((total, a) => total + a);
    if(total === 180){
      setMessage("You have correctly entered angles of a triangle")
    } else {
      setMessage("The angles you entered does not make a triangle")
    }
  }

  function randomAngleGenerator() {
      let one = Math.floor(Math.random() * 90) + 1
      let two = Math.floor(Math.random() * 89) + 1
      let three = 180 - (one + two);
      let tempArr = [one, two, three];
      setRandomAngles(randomAngles => [...randomAngles,...tempArr]);
      console.log(randomAngles)
  }

  return (
    <div className="App">
      <h1>Fun with Geometry</h1>
      <h2>An interactive way to learn geometry</h2>
      {
        quizSections.map(section => {
          return(
            <button 
              key={section.value}
              style={{display: "block", margin: "10px auto"}}
              onClick={() => setSelection(section.value)}
            >
              {section.message}
            </button>
          )
        })
      }
      {
        currentSelection === "1" ? 
        <>
          <input type="text" onBlur={handleInput} />
          <input type="text" onBlur={handleInput} />
          <input type="text" onBlur={handleInput} />
          <button onClick={handleClick}>?</button>
          <h2>{message}</h2>
        </> : 
        ""
      }
      {
        currentSelection === "2" ?
        <>
          <h4>What will be the type of triangle having these angles?</h4>
          <button onClick={randomAngleGenerator}>Play</button>
        </> :
        ""
      }
    </div>
  );
}
