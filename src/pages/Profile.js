import React, { createRef } from "react";
import UserMessagesDisplay from "../components/userMessagesDisplay/UserMessagesDisplay";
import Menu from "../components/menu/Menu";
import ProfilePictureParent from "../components/profilePictureParent/ProfilePictureParent";
import { userIsAuthenticated } from "../redux/HOCs";
import DataService from "../services/DataService";
import { Segment, Sticky } from "semantic-ui-react";
import "./Profile.css";

class Profile extends React.Component {
  // creates page's context reference so the Sticky Semantic works
  contextRef = createRef();
  constructor(props) {
    super(props);
    this.state = {
      userAboutInfo: null,
    };

    //Gets User Login
    this.loggedInUser = new DataService().getUsername();
  }

  render() {
    if (this.props.match.params.username === this.loggedInUser) {
      return (
        <div className="Profile" ref={this.contextRef}>
          <div className="Row1">
            <Sticky context={this.contextRef} offset={7}>
              <Menu isAuthenticated={this.props.isAuthenticated} />
            </Sticky>
          </div>
          <div className="Row2">
            <div className="ProfileLeftColumn">
              <Sticky context={this.contextRef} offset={30}>
                <ProfilePictureParent
                  isAuthenticated={this.props.isAuthenticated}
                  usernameFromURL={this.props.match.params.username}
                  loggedInUser={this.loggedInUser}
                />
              </Sticky>
            </div>
            <div className="ProfileRightColumn">
              <Segment>
                <UserMessagesDisplay
                  usernameFromURL={this.props.match.params.username}
                />
              </Segment>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="Profile" ref={this.contextRef}>
        <div className="Row1">
          <Sticky context={this.contextRef} offset={7}>
            <Menu isAuthenticated={this.props.isAuthenticated} />
          </Sticky>
        </div>
        <div className="Row2">
          <div className="ProfileLeftColumn">
            <Sticky context={this.contextRef} offset={65}>
              <ProfilePictureParent
                usernameFromURL={this.props.match.params.username}
              />
            </Sticky>
          </div>
          <div className="ProfileRightColumn">
            <Segment>
              <UserMessagesDisplay
                usernameFromURL={this.props.match.params.username}
              />
            </Segment>
          </div>
        </div>
      </div>
    );
  }
}

export default userIsAuthenticated(Profile);
