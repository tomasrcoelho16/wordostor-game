import { useState } from "react";
import logo from "./assets/logo.png";

let playerId: number;

const socket = new WebSocket("ws://localhost:3070");

// Listen for messages
socket.addEventListener("message", (event) => {
  const data = JSON.parse(event.data);
  if (data) {
    switch (data.action) {
      case "SETUP":
        playerId = data.payload;
        break;
      default:
        console.log(data);
    }
  }
  console.log("Message from server ", event.data);
});

function handleUsernameUpdate(username: string) {
  console.log(`playerId: ${playerId}`);
  const data = {
    action: "USERNAME_UPDATE",
    playerId,
    payload: username,
  };

  socket.send(JSON.stringify(data));
}

function Menu() {
  const [username, setUsername] = useState("");

  return (
    <>
      <div className="m-auto size-96 flex justify-center">
        <img src={logo} alt="Logo" />
      </div>
      <div className="flex flex-col justify-center m-auto w-56 mb-5">
        <label className="text-black font-bold">Username</label>
        <input
          className="input"
          placeholder="username..."
          value={username}
          onChange={({ target: { value } }) => setUsername(value)}
        />
        <button onClick={handleUsernameUpdate.bind(null, username)}>
          Update
        </button>
      </div>
      <div className="flex flex-col justify-center m-auto w-56 space-y-1">
        <label className="text-black font-bold">Pick 3 to 5 words</label>
        <input className="input" placeholder="Pudim..."></input>
        <input className="input" placeholder="Abacate..."></input>
        <input className="input" placeholder="Macaca..."></input>
        <input className="input" placeholder="Calistenia..."></input>
        <input className="input" placeholder="Futsal..."></input>
        <button className="mt-12S text-xl text-black p-2 self-center hover:font-bold">
          {" "}
          Enter Game{" "}
        </button>
      </div>
    </>
  );
}

export default Menu;
