import { useState } from "react";
import logo from "./assets/logo.png";

function Card() {
  const [word, setWord] = useState("Impostor");
  return (
    <>
      <div className="flip-box">
        <h1 className="text-black font-bold text-2xl text-center mb-5">
          {" "}
          Check your word{" "}
        </h1>
        <div className="flip-box-inner justify-items-center">
          <div className="flip-box-front rounded-2xl border-2 border-gray-700 flex flex-row justify-center items-center">
            <img src={logo} alt="LOGO"></img>
          </div>
          <div className="flip-box-back rounded-2xl flex flex-row justify-center items-center">
            <p className="text-black font-bold text-lg">{word}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
