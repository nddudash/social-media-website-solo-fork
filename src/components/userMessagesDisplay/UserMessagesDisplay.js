import React from "react";
import { Feed, Loader, Header } from "semantic-ui-react";
import MessageService from "../../services/MessageService";
import DataService from "../../services/DataService";
import Message from "../messages/Message";
import "./UserMessagesDisplay.css";

class UserMessagesDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [], usernameFromURL: this.props.usernameFromURL };
    this.loggedInUser = new DataService().getUsername();
  }

  componentDidMount() {
    MessageService.obtainUserMessages(this.props.usernameFromURL).then(
      (response) => {
        this.setState({ messages: response.data.messages });
      }
    );
  }

  render() {
    if (this.state.messages.length === 0) {
      return (
        <div className="messageList">
          <Loader size="massive" active>
            <Header as="h3">Loading...</Header>
          </Loader>
        </div>
      );
    }
    return (
      <div className="UserMessagesDisplay">
        <ul>
          <Feed>
            {this.state.messages.map((messageObject) => (
              <Message
                key={messageObject.id}
                {...messageObject}
                loggedInUser={this.loggedInUser}
                username={this.state.usernameFromURL}
              />
            ))}
          </Feed>
        </ul>
      </div>
    );
  }
}

export default UserMessagesDisplay;
