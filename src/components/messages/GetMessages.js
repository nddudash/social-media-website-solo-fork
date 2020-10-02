import React from "react";
import { Feed, Loader, Header } from "semantic-ui-react";
import MessageService from "../../services/MessageService";
import DataService from "../../services/DataService";
import "./GetMessages.css";
import Message from "./Message";

class GetMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] };
    this.loggedInUser = new DataService().getUsername();
  }

  componentDidMount() {
    MessageService.obtainMessages().then((response) => {
      this.setState({ messages: response.data.messages });
    });
  }

  render() {
    if (this.state.messages.length === 0) {
      return (
        <div className="messageList">
          <Loader size="massive" active>
            <Header as= "h3">Loading...</Header>
          </Loader>
        </div>
      );
    }
    return (
      <div className="messageList">
        <ul>
          <Feed className="messageArea">
            {this.state.messages.map((messageObject) => (
              <Message
                key={messageObject.id}
                {...messageObject}
                loggedInUser={this.loggedInUser}
              />
            ))}
          </Feed>
        </ul>
      </div>
    );
  }
}

export default GetMessages;
