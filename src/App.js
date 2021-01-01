import React, { useState } from "react";
import "./styles.css";
import quizSections from "./quizSections";

export default function App() {
  const [angles, setInput] = useState([]);
  const [message, setMessage] = useState("");
  const [currentSelection, setSelection] = useState("1");
  const [angleString, setAngleString] = useState("");
  const [triangle, setTriangle] = useState("");
  const [triangleMessage, setTriangleMessage] = useState("");
  const [thirdAngle, setThirdAngle] = useState(0);
  const [userthirdAngle, setUserThirdAngle] = useState("");
  const [temp, setTemp] = useState("");


  function changeSection(value) {
    setInput([]);
    setMessage("");
    setAngleString("");
    setTriangle("");
    setTriangleMessage("");
    setUserThirdAngle("");
    setThirdAngle("");
    setSelection(value);
  }

  function handleInput(e) {
    setInput((angles) => [...angles, Number(e.target.value)]);
    setTemp("");
  }

  function handleChange(e) {
    setTemp(e.target.value)
  }

  function handleClick() {
    let total = angles.reduce((total, a) => total + a);
    if (total === 180) {
      setMessage("You have correctly entered angles of a triangle");
    } else {
      setMessage("The angles you entered does not make a triangle");
    }
  }

  function randomAngleGenerator() {
    let one = Math.floor(Math.random() * 90) + 1;
    let two = Math.floor(Math.random() * 89) + 1;
    let three = 180 - (one + two);
    let maxAngle = Math.max(one, two, three);
    calculateTriange(maxAngle);
    setAngleString(`${one} , ${two} , ${three}`);
    setTriangleMessage("");
  }

  function calculateTriange(maxAngle) {
    if (maxAngle >= 90) {
      if (maxAngle === 90) {
        setTriangle("right");
      } else {
        setTriangle("obtuse");
      }
    } else {
      setTriangle("acute");
    }
  }

  function handleTriangleType(e) {
    if (e.target.id === triangle) {
      setTriangleMessage(`${e.target.id} angled triangle is Correct answer 🤓`);
    } else {
      setTriangleMessage(`${e.target.id} angled triangle is Wrong answer 🙁`);
    }
  }

  function setActiveChoice() {
    if (triangleMessage) {
      return true;
    } else {
      return false;
    }
  }

  function guessThirdAngle() {
    let one = Math.floor(Math.random() * 90) + 1;
    let two = Math.floor(Math.random() * 89) + 1;
    let three = 180 - (one + two);
    setAngleString(`${one} , ${two}`);
    setThirdAngle(three);
    setTriangleMessage("");
    setUserThirdAngle("");
  }

  function inputThirdAngle(e){
    setUserThirdAngle(Number(e.target.value));
  }

  function checkThirdAngle(){
    if(thirdAngle === Number(userthirdAngle)) {
      setTriangleMessage("You are right")
    } else {
      setTriangleMessage("You entered wrong angle");
    }
  }

  function isoscelesGenerator(){
    let one = Math.floor(Math.random() * 90) + 1;
    let sum = 180 - one;
    let each = sum / 2;
    setAngleString(`${one}, ${each}`);
    setThirdAngle(each);
    setTriangleMessage("");
    setUserThirdAngle("");
  }

  function equilateralGenerator(){
    let each = 180 / 3;
    setAngleString(`${each}, ${each}`);
    setThirdAngle(each);
    setTriangleMessage("");
    setUserThirdAngle("");
  }

  function calculateHypotenuse() {
    let hyp = Math.sqrt((angles[0]*angles[0]) + (angles[1] * angles[1]));
    setTriangleMessage(`Hypotenuse: ${hyp}`)
  }

  function calculateArea() {
    let area = 0.5 * angles[0] * angles[1];
    setTriangleMessage(`Area of Triangle is: ${area} sq units`)
  }

  function clear() {
    setTemp("");
    setInput([]);
    setTriangleMessage("");
  }

  return (
    <div className="App">
      <h1>Fun with Geometry</h1>
      <h2>An interactive way to learn geometry</h2>
      {quizSections.map((section) => {
        return (
          <button
            key={section.value}
            style={{ display: "block", margin: "10px auto" }}
            onClick={() => changeSection(section.value)}
          >
            {section.message}
          </button>
        );
      })}
      {currentSelection === "1" ? (
        <>
          <input 
            type="text" 
            onBlur={handleInput} 
            onChange={handleChange}
            value={angles[0] ? angles[0] : temp}
          />
          <input 
            type="text" 
            onBlur={handleInput} 
            onChange={handleChange}
            value={angles.length === 0 ? "" : angles[1] ? angles[1] : temp}
          />
          <input 
            type="text" 
            onBlur={handleInput} 
            onChange={handleChange}
            value={angles.length <= 1 ? "" : angles[2] ? angles[2] : temp}
          />
          <button onClick={handleClick}>Check</button>
          <h2>{message}</h2>
          <button onClick={clear}>Clear</button>
        </>
      ) : (
        ""
      )}
      {currentSelection === "2" ? (
        <>
          <h4>What will be the type of triangle having these angles?</h4>
          <button onClick={() => randomAngleGenerator()}>Play</button>
          <h3>{angleString}</h3>
          {angleString ? (
            <>
              <button
                id="acute"
                onClick={handleTriangleType}
                disabled={setActiveChoice()}
              >
                Acute Angled Triangle
              </button>
              <button
                id="right"
                onClick={handleTriangleType}
                disabled={setActiveChoice()}
              >
                Right Angled Triangle
              </button>
              <button
                id="obtuse"
                onClick={handleTriangleType}
                disabled={setActiveChoice()}
              >
                Obtuse Angled Triangle
              </button>
            </>
          ) : (
            ""
          )}
          <h2>{triangleMessage}</h2>
        </>
      ) : (
        ""
      )}
      {currentSelection === "3" ? (
        <>
          <button onClick={() => guessThirdAngle()}>Play</button>
          <h2>{angleString}</h2>
          <input type="text" value={userthirdAngle} onChange={inputThirdAngle} />
          <button onClick={checkThirdAngle}>Check</button>
          <h3>{triangleMessage}</h3>
        </>
      ) : (
        ""
      )}
      {
        currentSelection === "4" ?
        <>
          <button onClick={isoscelesGenerator}>Play</button>
          <h2>{angleString}</h2>
          <input type="text" value={userthirdAngle} onChange={inputThirdAngle} />
          <button onClick={checkThirdAngle}>Check</button>
          <h3>{triangleMessage}</h3>
        </> :
        ""
      }
      {
        currentSelection === "5" ?
        <>
          <button onClick={equilateralGenerator}>Play</button>
          <h2>{angleString}</h2>
          <input type="text" value={userthirdAngle} onChange={inputThirdAngle} />
          <button onClick={checkThirdAngle}>Check</button>
          <h3>{triangleMessage}</h3>
        </> :
        ""
      }
      {
        currentSelection === "6" ? 
        <>
          <input 
            placeholder={"Side A"} 
            onBlur={handleInput} 
            onChange={handleChange}
            value={angles[0] ? angles[0] : temp}
          />
          <input 
            placeholder={"Side B"} 
            onBlur={handleInput} 
            onChange={handleChange}
            value={angles.length === 0 ? "" : angles[1] ? angles[1] : temp}
          />
          <button onClick={calculateHypotenuse}>Calculate Hypotenuse</button>
          <h2>{triangleMessage}</h2>
          <button onClick={clear}>Clear</button>
        </> : 
        ""
      }
       {
        currentSelection === "7" ? 
        <>
          <input 
            placeholder={"Base"} 
            onBlur={handleInput} 
            onChange={handleChange}
            value={angles[0] ? angles[0] : temp}
          />
          <input 
            placeholder={"Height"} 
            onBlur={handleInput} 
            onChange={handleChange}
            value={angles.length === 0 ? "" : angles[1] ? angles[1] : temp}
          />
          <button onClick={calculateArea}>Calculate Area</button>
          <h2>{triangleMessage}</h2>
          <button onClick={clear}>Clear</button>
        </> : 
        ""
      }
    </div>
  );
}
