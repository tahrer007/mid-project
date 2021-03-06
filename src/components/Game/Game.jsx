import React from "react";
import Card from "./card/Card";
import GameResult from "./gameResult/gameResult";
import StartPage from "./startPage/startPage";
import "./game.css";
import "./card/card.css";
import "../../app.css";
import allImages from "../../data/imagesArr";
import getRandomImages from "../../js/gatCards";
import playAudio from "../../js/playSound";
import { useState, useEffect, useRef } from "react";

function Game() {
  const [cards, setcards] = useState([]);
  const [start, setStart] = useState(false);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [gameScore, setgameScore] = useState(0);
  const [FlipedCardCount, setFlipedCardCount] = useState(0);
  const [gameLives, setLives] = useState(4);
  const [disableClick, setdisableClick] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [level, setLevel] = useState("");
  const [playerData, setPlayerData] = useState({});
  const [passHiestResult, setpassHiestResult] = useState(false);
  const [lastGameResult, setLastResult] = useState(0);
  const [time, setTime] = useState(60);
  const [isNinja, setIsNinja] = useState(false);
  const [timerFlage, setTimerFlage] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  let intervalRef = useRef();

  //timer
  const decreaseTime = () => setTime((prev) => prev - 1);

  //start the game
  useEffect(() => {
    if (!playerData || !level) return;
    setLastResult(playerData.lastGameScore);
   //suffles cards
  const suffleCards = () => {
    let cardsNumbers = level.cardsNum / 2;
    let takenImages = getRandomImages(allImages, cardsNumbers);
    const shuffledCards = [...takenImages, ...takenImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setcards(shuffledCards);
  };
  suffleCards()
  }, [level, playerData]);

  useEffect(() => {
    if (!playerData || !level || !time) return;
    if (isNinja) {
      intervalRef.current = setInterval(decreaseTime, 1000);
      if (time === 5) playAudio("timeEnding");
      if (time <= 10) setTimerFlage(true);
     
      setLives(100000);
      return () => clearInterval(intervalRef.current);
    }
  }, [time, level, playerData, timerFlage,isNinja]);

  //check turn results
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setdisableClick(true);

      if (choiceOne.src === choiceTwo.src) {
        playAudio("correct");
        setIsCorrect(true);
        setcards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
             
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        setgameScore((prevScore) => prevScore + 100);
        setFlipedCardCount((prevCount) => prevCount + 1);
        resetChioces();
      } else {
        playAudio("wrong");
        setTimeout(() => {
          setLives((prevLives) => prevLives - 1);
        }, 1000);
       
        resetChioces();
      }
    }
  }, [choiceOne, choiceTwo]);
  //update  if player pass his last score
  useEffect(() => {
    if (playerData.isOldPlayer && gameScore > playerData.lastGameScore)
      setpassHiestResult(true);
  }, [gameScore,playerData]);
  //check if win the game
  useEffect(() => {
    if (FlipedCardCount) {
      if (!FlipedCardCount || !cards || time) return;
      if (FlipedCardCount === cards.length / 2) {
        console.log("you won the game ");

        setTimeout(() => {
          setIsWin(true);
        }, 1000);
       
      }
    }
  }, [FlipedCardCount, cards,time]);

  //get and handle player data
  const getPlayerData = (player) => {
    //console.log(player);
    setPlayerData(player);
  };
  

  //handle card choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    playAudio("flip");
  };

  //reset choices
  const resetChioces = () => {
    setTimeout(() => {
      if (!isCorrect) playAudio("flip");
      setdisableClick(false);
      setChoiceOne(null);
      setChoiceTwo(null);
      setIsCorrect(false);
    }, 1000);
  };

  const toChooseLevel = (level) => {
    setStart(true);
    if (level.name === "Ninja") setIsNinja(true);

    setLevel(level);
  };

  return (
    <div className="gameBoardContainer background">
      {!start && (
        <StartPage
          toChooseLevel={toChooseLevel}
          getPlayerData={getPlayerData}
        />
      )}

      <div
        className="cardsBoard"
        style={{
          gridTemplateColumns: `repeat(${level.cols}, 1fr)`,
          gridTemplateRows: `repeat(${level.rows}, 1fr)`,
        }}
      >
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disableClick}
          />
        ))}
      </div>

      <div className="gameData" style={{ display: level ? "block" : "none" }}>
        <h1>{playerData.name} </h1>
        <div className="avatarImageBox">
          <img
            className="gameDataImage"
            src={process.env.PUBLIC_URL + playerData.avatar}
            alt="avatar"
          />
        </div>
        <div className="gameScore"> {gameScore}</div>
        <div
          className="gameLives"
          style={{ display: isNinja ? "none" : "block" }}
        >
          game lives : {gameLives} <br />
        </div>
        <div className="timer" style={{ display: isNinja ? "block" : "none" }}>
          time <br />{" "}
          <span className="time" style={{ color: timerFlage ? "red" : "" }}>
            {time}{" "}
          </span>{" "}
          <br />
        </div>
        <div
          className="lastResults"
          style={{ display: playerData.isOldPlayer ? "block" : "none" }}
        >
          <h3> your last score : {lastGameResult} </h3>
        </div>
        <div
          className="PassLastResult"
          style={{ display: passHiestResult ? "block" : "none" }}
        >
          <h3> you get new hiegh score !! </h3>
        </div>
      </div>

      {(isWin || !gameLives || !time) && (
        <GameResult win={isWin} gameScore={gameScore} player={playerData} />
      )}
    </div>
  );
}

export default Game;
