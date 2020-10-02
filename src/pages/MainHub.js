import React from "react";
import Menu from "../components/menu/Menu";
import { userIsAuthenticated } from "../redux/HOCs";
import PostMessageForm from "../components/postMessageForm/PostMessageForm";
import GetMessages from "../components/messages/GetMessages";
import "./MainHub.css";

class MainHub extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="mainHub">
        <Menu isAuthenticated={this.props.isAuthenticated} />
        <div className="postMessageForm">
          <PostMessageForm />
        </div>
        <div className="messageArea">
          <GetMessages />
        </div>
      </div>
    );
  }
}

export default userIsAuthenticated(MainHub);
