import React, { createRef } from "react";
import Menu from "../components/menu/Menu";
import { userIsAuthenticated } from "../redux/HOCs";
import PostMessageForm from "../components/postMessageForm/PostMessageForm";
import GetMessages from "../components/messages/GetMessages";
import { Segment, Sticky } from "semantic-ui-react";
import "./MainHub.css";

class MainHub extends React.Component {
  contextRef = createRef();
  render() {
    return (
      <div className="mainHub">
        <Sticky context={this.contextRef} offset={8}>
          <Menu isAuthenticated={this.props.isAuthenticated} />
        </Sticky>
        <div className="messageFeed" ref={this.contextRef}>
          <Sticky context={this.contextRef} offset={70}>
            <div className="postMessageForm">
              <PostMessageForm />
            </div>
          </Sticky>

          <Segment className="messageArea">
            <div className="messageArea">
              <GetMessages />
            </div>
          </Segment>
        </div>
      </div>
    );
  }
}

export default userIsAuthenticated(MainHub);
