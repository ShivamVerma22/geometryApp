import React, {useState} from "react";
import "./styles.css";
import quizSections from  "./quizSections"

export default function App() {
  const [angles, setInput] = useState([]);
  const [message, setMessage] = useState("");
  const [currentSelection, setSelection] = useState("1");
  const [angleString, setAngleString] = useState("");
  const [triangle, setTriangle] = useState("");
  const [triangleMessage, setTriangleMessage] = useState("");

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
      let maxAngle = Math.max(one, two, three)
      calculateTriange(maxAngle)
      setAngleString(`${one} , ${two} , ${three}`);
      setTriangleMessage("")
  }

  function calculateTriange(maxAngle) {
    if(maxAngle >= 90){
      if(maxAngle === 90){
        setTriangle("right")
      } else {
        setTriangle("obtuse")
      }
    } else {
      setTriangle("acute")
    }
  }

  function handleTriangleType(e) {
    if(e.target.checked === true){
      if(e.target.value === triangle){
        setTriangleMessage(`${e.target.value} angled triangle is Correct answer 🤓`)
      } else {
        setTriangleMessage(`${e.target.value} angled triangle is Wrong answer 🙁`)
      }
    }
  }

  function setActiveChoice() {
    if(triangleMessage){
      return true
    } else {
      return false
    }
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
          <button onClick={() => randomAngleGenerator()}>Play</button>
          <h3>{angleString}</h3>
          { angleString ? 
            <>
              <input type="radio" id="acute" name="triangle" value="acute" onChange={handleTriangleType} 
              disabled={setActiveChoice()} 
              />
              <label>Acute Angled Triangle</label>
              <input type="radio" id="right" name="triangle" value="right" onChange={handleTriangleType} 
              disabled={setActiveChoice()} 
              />
              <label>Right Angled Triangle</label>
              <input type="radio" id="obtuse" name="triangle" value="obtuse" onChange={handleTriangleType} 
              disabled={setActiveChoice()} 
              />
              <label>Obtuse Angled Triangle</label>
            </> : 
            ""
          }
          <h2>{triangleMessage}</h2>
        </> :
        ""
      }
    </div>
  );
}
