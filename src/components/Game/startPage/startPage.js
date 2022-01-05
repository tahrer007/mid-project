import "./startPage.css";
import NewPlayer from "./newPlayer/newPlayer";
import { useEffect, useState } from "react";
import OldPlayer from "./oldPlayer/oldPlayer";
import GameLevels from "./gameLevel/gameLevels";

const StartPage = () => {
  const [newPlayer, setNewPlayer] = useState(false);
  const [oldplayer, setOldPlayer] = useState(false);
  const [chooseLevel, setchooseLevel] = useState(false);

  useEffect(() => {}, [newPlayer, oldplayer]);

  const passPlayerData = (playerName, avatar, LastGameScore, isOldPlayer) => {
    setchooseLevel(true) ;
    console.log(playerName, avatar, LastGameScore, isOldPlayer);
  };
  const handlePlayerType = (playerType) => {
    playerType === "new" ? setNewPlayer(true) : setOldPlayer(true);
  };
  return (
    <div className="startPage">
      <div
        className="choicePlayerType"
        style={{ display: newPlayer || oldplayer ? "none" : "block" }}
      >
        <h1>this is your first time ? </h1>
        <button
          className=" playerBtn"
          id="newplayerBtn"
          onClick={() => handlePlayerType("new")}
        >
          yes
        </button>
        <button
          className=" playerBtn"
          id="oldPlayerBtn"
          onClick={() => handlePlayerType("old")}
        >
          no
        </button>
      </div>
      {newPlayer&&!chooseLevel && <NewPlayer sendPlayerData={passPlayerData} />}
      {oldplayer&&!chooseLevel && <OldPlayer sendPlayerData={passPlayerData} />}
      {chooseLevel && <GameLevels sendPlayerData={passPlayerData} />}
    </div>
  );
};

export default StartPage;
