import React, { useState } from "react";
import "./styles.css";
import quizSections from "./quizSections";

export default function App() {
  const [angles, setInput] = useState([]);
  const [message, setMessage] = useState("");
  const [currentSelection, setSelection] = useState(quizSections[0]);
  const [angleString, setAngleString] = useState("");
  const [triangle, setTriangle] = useState("");
  const [triangleMessage, setTriangleMessage] = useState("");
  const [thirdAngle, setThirdAngle] = useState(0);
  const [userthirdAngle, setUserThirdAngle] = useState("");
  const [temp, setTemp] = useState("");
  const [errormessage, setErrormessage] = useState("");

  function changeSection(value) {
    setInput([]);
    setMessage("");
    setAngleString("");
    setTriangle("");
    setTriangleMessage("");
    setUserThirdAngle("");
    setThirdAngle("");
    setSelection(value);
    setErrormessage("");
  }

  function handleInput(e) {
    if (e.target.value !== "") {
      setTemp("");
      if (!isNaN(e.target.value)) {
        setInput((angles) => [...angles, Number(e.target.value)]);
        setErrormessage("");
      } else {
        setErrormessage(`Input should be only number`);
      }
    } else {
      setErrormessage(`Input cannot be empty`);
    }
  }

  function handleChange(e) {
    setTemp(e.target.value);
  }

  function handleClick() {
    if (angles.length > 0) {
      let total = angles.reduce((total, a) => total + a);
      if (total === 180) {
        setMessage("You have correctly entered angles of a triangle");
      } else {
        setMessage("The angles you entered does not make a triangle");
      }
    } else {
      setErrormessage("Inputs not given");
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
      setTriangleMessage(`${e.target.id} angled triangle is correct answer`);
    } else {
      setTriangleMessage(`${e.target.id} angled triangle is wrong answer`);
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
    setErrormessage("");
  }

  function inputThirdAngle(e) {
    setUserThirdAngle(e.target.value);
  }

  function checkThirdAngle() {
    if (userthirdAngle !== "") {
      if (!isNaN(userthirdAngle)) {
        setErrormessage("")
        if (thirdAngle === Number(userthirdAngle)) {
          setTriangleMessage("You are right");
        } else {
          setTriangleMessage("You entered wrong angle");
        }
      } else {
        setErrormessage("Input should be only number");
      }
    } else {
      setErrormessage("Input cannot be empty");
    }
  }

  function isoscelesGenerator() {
    let one = Math.floor(Math.random() * 90) + 1;
    let sum = 180 - one;
    let each = sum / 2;
    setAngleString(`${one}, ${each}`);
    setThirdAngle(each);
    setTriangleMessage("");
    setUserThirdAngle("");
  }

  function equilateralGenerator() {
    let each = 180 / 3;
    setAngleString(`${each}, ${each}`);
    setThirdAngle(each);
    setTriangleMessage("");
    setUserThirdAngle("");
  }

  function calculateHypotenuse() {
    if(angles.length > 0){
      let hyp = Math.sqrt(angles[0] * angles[0] + angles[1] * angles[1]);
      setTriangleMessage(`Hypotenuse: ${hyp}`);
    } else{
      setErrormessage("Inputs not given")
    }
  }

  function calculateArea() {
    if(angles.length > 0){
      let area = 0.5 * angles[0] * angles[1];
      setTriangleMessage(`Area of Triangle is: ${area} sq units`);
    } else{
      setErrormessage("Inputs not given");
    }
  }

  function clear() {
    setTemp("");
    setInput([]);
    setTriangleMessage("");
    setErrormessage("");
  }

  return (
    <div className="content">
      <h1>Fun Learning Triangles</h1>
      <h2>An interactive fun way to learn about triangles.</h2>
      <section className="quiz-section">
        {quizSections.map((section) => {
          return (
            <button
              className="quiz-section__btn"
              key={section.value}
              style={{ display: "block", margin: "10px auto" }}
              onClick={() => changeSection(section)}
            >
              {section.message}
            </button>
          );
        })}
      </section>
      <div className="playarea">
        <h2 className="selected">{currentSelection.message}</h2>
        <h3 className="error">{errormessage}</h3>
        {currentSelection.value === "1" ? (
          <>
            <h3 className="heading">
              Enter measure of 3 angles and see whether they form a perfect
              triangle or not?
            </h3>
            <input
              className="input"
              disabled={angles[0] ? true : false}
              type="text"
              onBlur={handleInput}
              onChange={handleChange}
              placeholder="Angle A"
              value={angles[0] ? angles[0] : temp}
            />
            <input
              className="input"
              disabled={angles[1] ? true : false}
              type="text"
              onBlur={handleInput}
              onChange={handleChange}
              placeholder="Angle B"
              value={angles.length === 0 ? "" : angles[1] ? angles[1] : temp}
            />
            <input
              className="input"
              disabled={angles[2] ? true : false}
              type="text"
              onBlur={handleInput}
              onChange={handleChange}
              placeholder="Angle C"
              value={angles.length <= 1 ? "" : angles[2] ? angles[2] : temp}
            />
            <h2 className="message">{message}</h2>
            <button className="btn btn--submit" onClick={handleClick}>
              Check
            </button>
            <button className="btn btn--clear" onClick={clear}>
              Clear
            </button>
          </>
        ) : (
          ""
        )}
        {currentSelection.value === "2" ? (
          <>
            <h3 className="heading">
              What will be the type of triangle having these angles?
            </h3>
            <h2>{angleString}</h2>
            {angleString ? (
              <>
                <button
                  className="btn btn--option"
                  id="acute"
                  onClick={handleTriangleType}
                  disabled={setActiveChoice()}
                >
                  Acute Angled Triangle
                </button>
                <button
                  className="btn btn--option"
                  id="right"
                  onClick={handleTriangleType}
                  disabled={setActiveChoice()}
                >
                  Right Angled Triangle
                </button>
                <button
                  className="btn btn--option"
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
            <h2 className="message">{triangleMessage}</h2>
            <button
              className="btn btn--submit"
              onClick={() => randomAngleGenerator()}
            >
              {angleString !== "" ? "Play Again" : "Play"}
            </button>
          </>
        ) : (
          ""
        )}
        {currentSelection.value === "3" ? (
          <>
            <h3 className="heading">
              Given two angles. Guess the third one to form a perfect triangle
            </h3>
            <h2 className="heading">{angleString}</h2>
            {angleString ? (
              <>
                <input
                  className="input"
                  placeholder="Third Angle"
                  value={userthirdAngle}
                  type="text"
                  onChange={inputThirdAngle}
                />
                <button className="btn btn--clear" onClick={checkThirdAngle}>
                  Check
                </button>
              </>
            ) : (
              ""
            )}
            <h3 className="message">{triangleMessage}</h3>
            <button
              className="btn btn--submit"
              onClick={() => guessThirdAngle()}
            >
              {angleString !== "" ? "Play Again" : "Play"}
            </button>
          </>
        ) : (
          ""
        )}
        {currentSelection.value === "4" ? (
          <>
            <h3 className="heading">
              Given two angles of an Isosceles Triangle. Guess the third one
            </h3>
            <h2 className="heading">{angleString}</h2>
            {angleString ? (
              <>
                <input
                  type="text"
                  className="input"
                  placeholder="Third Angle"
                  value={userthirdAngle}
                  onChange={inputThirdAngle}
                />
                <button className="btn btn--clear" onClick={checkThirdAngle}>
                  Check
                </button>
              </>
            ) : (
              ""
            )}
            <h3 className="message">{triangleMessage}</h3>
            <button
              className="btn btn--submit"
              onClick={() => isoscelesGenerator()}
            >
              {angleString !== "" ? "Play Again" : "Play"}
            </button>
          </>
        ) : (
          ""
        )}
        {currentSelection.value === "5" ? (
          <>
            <h3 className="heading">
              Given two angles of an Equilateral Triangle. Guess the third one
            </h3>
            <h2 className="heading">{angleString}</h2>
            {angleString ? (
              <>
                <input
                  type="text"
                  className="input"
                  placeholder="Third Angle"
                  value={userthirdAngle}
                  onChange={inputThirdAngle}
                />
                <button className="btn btn--clear" onClick={checkThirdAngle}>
                  Check
                </button>
              </>
            ) : (
              ""
            )}
            <h3 className="message">{triangleMessage}</h3>
            <button
              className="btn btn--submit"
              onClick={() => equilateralGenerator()}
            >
              {angleString !== "" ? "Play Again" : "Play"}
            </button>
          </>
        ) : (
          ""
        )}
        {currentSelection.value === "6" ? (
          <>
            <h3 className="heading">
              Enter two sides of a triangle and find hypotenuse
            </h3>
            <input
              className="input"
              placeholder={"Side A"}
              disabled={angles[0] ? true : false}
              onBlur={handleInput}
              onChange={handleChange}
              value={angles[0] ? angles[0] : temp}
            />
            <input
              className="input"
              placeholder={"Side B"}
              disabled={angles[1] ? true : false}
              onBlur={handleInput}
              onChange={handleChange}
              value={angles.length === 0 ? "" : angles[1] ? angles[1] : temp}
            />
            <h2 className="message">{triangleMessage}</h2>
            <button className="btn btn--submit" onClick={calculateHypotenuse}>
              Calculate Hypotenuse
            </button>
            <button className="btn btn--clear" onClick={clear}>
              Clear
            </button>
          </>
        ) : (
          ""
        )}
        {currentSelection.value === "7" ? (
          <>
            <h3 className="heading">
              Enter base and height of a triangle and find the area.
            </h3>
            <input
              className="input"
              placeholder={"Base"}
              disabled={angles[0] ? true : false}
              onBlur={handleInput}
              onChange={handleChange}
              value={angles[0] ? angles[0] : temp}
            />
            <input
              className="input"
              placeholder={"Height"}
              disabled={angles[1] ? true : false}
              onBlur={handleInput}
              onChange={handleChange}
              value={angles.length === 0 ? "" : angles[1] ? angles[1] : temp}
            />
            <h2 className="message">{triangleMessage}</h2>
            <button className="btn btn--submit" onClick={calculateArea}>
              Calculate Area
            </button>
            <button className="btn btn--clear" onClick={clear}>
              Clear
            </button>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
