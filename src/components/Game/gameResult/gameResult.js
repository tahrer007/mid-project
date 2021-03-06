import "./gameResult.css";
import { useEffect } from "react";
import Create from "../../../api/create";
import UpdateData from "../../../api/update";
import { Link } from "react-router-dom";
import playAudio from "../../../js/playSound";


export default function GameResult({ win, gameScore, player }) {
 
  useEffect(() => {
   playAudio("gameOver") ; 
    if (player.isOldPlayer) {
      UpdateData(player.id, gameScore);
    } else {
      Create(player.name, player.avatar, gameScore);
    }
  }, [player,gameScore]);

  return (

    <div className=" gameResult">
    <h1> your score is : {gameScore} </h1>
    <br />
   
    <button className="newGameBtn" >  <Link to="/scores">get top scores </Link> </button>
  </div>
  );
}
