import React from "react";
import { Feed, Loader, Header, Icon, Segment } from "semantic-ui-react";
import MessageService from "../../services/MessageService";
import DataService from "../../services/DataService";
import Message from "../messages/Message";
import "./UserMessagesDisplay.css";

class UserMessagesDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: ["Loading",], usernameFromURL: this.props.usernameFromURL };
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
    if (this.state.messages[0] === "Loading") {
      return (
        <div className="UserMessagesDisplay">
          <Loader size="massive" active>
            <Header as="h3">Loading...</Header>
          </Loader>
        </div>
      );
    }

    if (this.state.messages.length === 0  && this.props.usernameFromURL !== this.loggedInUser) {
      return (
        <div className="UserMessagesDisplay">
          <Segment>
            <Header icon>
              <Icon name ="comment alternate outline" />
              This User Hasn't Made Any Posts!
            </Header>
          </Segment>
        </div>
      )
    }

    if (this.state.messages.length === 0  && this.props.usernameFromURL === this.loggedInUser) {
      return (
        <div className="UserMessagesDisplay">
          <Segment placeholder color = "white" textAlign = "center">
            <Header icon>
              <Icon name ="comment alternate outline" />
              You Haven't Made Any Posts Yet!
            </Header>
            <Segment.Inline>
              When you do, they'll show up here! 
            </Segment.Inline>
          </Segment>
        </div>
      )
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
