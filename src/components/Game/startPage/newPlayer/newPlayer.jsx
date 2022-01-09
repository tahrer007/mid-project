import avatarsArr from "../../../../data/avatarsArr";
import Avatar from "./avatar/avatar";
import React from "react";
import "./newPlayer.css";
import "../../../../app.css";
class NewPlayer extends React.Component {
  state = {
    playerName: "",
    playerAvatar: "",
  };
  handleChoice = (avatar) => {
    this.setState({
      playerAvatar: avatar,
    });
  };
  handleNameChange = (event) => {
    this.setState({ playerName: event.target.value });
  };

  addPlayer = (e, name, avatar) => {
    const isOldPlayer = false;

    e.preventDefault();
    let lastGameScore = 0;
    this.props.sendPlayerData(name, avatar, lastGameScore, isOldPlayer);

    //
  };

  render() {
    return (
      <div className="newPlayer">
        <div className="playerInputBox">
          <h1> type your nickName: </h1>
          <input
            type="text"
            name="name"
            value={this.state.playerName}
            onChange={this.handleNameChange}
          />
        {/*  <h1> please type your password: </h1>
          <input
            type="password"
            name="password"
            //value={this.state.playerName}
            //onChange={this.handleNameChange}
            placeholder="type your password"
          />*/}
        </div>
        <div className="avatarsTEXTbox">
          <h1> pick your avatar </h1>

          <div className="avatarsBox">
            {avatarsArr.map((avatar, index) => (
              <Avatar
                key={index}
                avatar={avatar}
                handleChoice={this.handleChoice}
              />
            ))}
          </div>
        </div>
     

        <input
          className={
            !this.state.playerAvatar || !this.state.playerName
              ? " buttons disableClick "
              : " buttons clickable"
          }
          type="submit"
          value="done"
          onClick={(e) =>
            this.addPlayer(e, this.state.playerName, this.state.playerAvatar)
          }
        />

       
        
      </div>
    );
  }
}
export default NewPlayer;
