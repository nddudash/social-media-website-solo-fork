import React from "react";
import { Placeholder, Image } from "semantic-ui-react";
import profilePlaceholder from "../../assets/images/Placeholder.png";
import "./ProfilePictureDisplay.css";

class ProfilePictureDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageData: null,
    };
  }

  //Thanks to ob1 and HoldOffHunger from https://stackoverflow.com/questions/37009328/re-render-react-component-when-prop-changes
  componentDidUpdate(prevProps) {
    if (prevProps.imageData !== this.props.imageData) {
      this.setState({
        imageData: this.props.imageData,
      });
    }
  }

  render() {
    if (this.state.imageData === 404) {
      return (
        <div width className="ProfilePictureDisplay">
          <Image
            className="profileImage"
            src={profilePlaceholder}
            alt="Profile Picture"
            ui={false}
          />
        </div>
      );
    }

    if (this.state.imageData) {
      return (
        <div className="ProfilePictureDisplay">
          <Image
            className="profileImage"
            src={this.state.imageData}
            alt="Profile Picture"
          />
        </div>
      );
    }

    return (
      <div className="ProfilePictureDisplay">
        <Placeholder>
          <Placeholder.Image className="profileImage" />
        </Placeholder>
      </div>
    );
  }
}

export default ProfilePictureDisplay;
