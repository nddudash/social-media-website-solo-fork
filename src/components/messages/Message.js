import React from "react";
import LikeButton from "../likeButton/LikeButton";
import profilePlaceholder from "../../assets/images/Placeholder.png"
import { Link } from "react-router-dom";
import DeleteUserMessages from "../deleteUserMessage/DeleteUserMessages";
import GetUserPictureService from "../../services/GetUserPictureService";
import {
  Feed,
  FeedContent,
  FeedDate,
  FeedExtra,
  FeedLike,
  FeedMeta,
  FeedSummary,
} from "semantic-ui-react";

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postAvatar: null,
    };
    this.GetUserPictureService = new GetUserPictureService();
  }

  componentDidMount() {
    this.GetUserPictureService.GetUserPicture(this.props.username)
      .then((result) => {
        this.setState({ postAvatar: result.config.url });
      })
      .catch((error) => {
        if (error.response.data.statusCode === 404) {
          this.setState({
           postAvatar: 404,
          });
        }
      });
  }

  render() {
    if (this.props.loggedInUser === this.props.username) {
      return (
        <Feed.Event>
          <Feed.Label>
            <img src={this.state.postAvatar} alt="Post Avatar" />
          </Feed.Label>
          <FeedContent>
            <FeedSummary>
              <Link to={`/profile/${this.props.username}`}>
                {this.props.username}
              </Link>
              <FeedDate>
                at {new Date(this.props.createdAt).toDateString()}
              </FeedDate>
            </FeedSummary>
            <FeedExtra text>{this.props.text}</FeedExtra>
            <FeedMeta>
              <FeedLike>
                <LikeButton
                  className="likeButton"
                  likesArray={this.props.likes}
                  messageId={this.props.id}
                />
              </FeedLike>
              <DeleteUserMessages messageId={this.props.id} />
            </FeedMeta>
          </FeedContent>
        </Feed.Event>
      );
    }

    if (this.state.postAvatar === 404) {
      return (
        <Feed.Event>
          <Feed.Label>
            <img src={profilePlaceholder} alt="Post Avatar" />
          </Feed.Label>
          <FeedContent>
            <FeedSummary>
              <Link to={`/profile/${this.props.username}`}>
                {this.props.username}
              </Link>
              <FeedDate>
                at {new Date(this.props.createdAt).toDateString()}
              </FeedDate>
            </FeedSummary>
            <FeedExtra text>{this.props.text}</FeedExtra>
            <FeedMeta>
              <FeedLike>
                <LikeButton
                  className="likeButton"
                  likesArray={this.props.likes}
                  messageId={this.props.id}
                />
              </FeedLike>
            </FeedMeta>
          </FeedContent>
        </Feed.Event>
      );
    }

    return (
      <Feed.Event>
        <Feed.Label>
          <img src={this.state.postAvatar} alt="Post Avatar" />
        </Feed.Label>
        <FeedContent>
          <FeedSummary>
            <Link to={`/profile/${this.props.username}`}>
              {this.props.username}
            </Link>
            <FeedDate>
              at {new Date(this.props.createdAt).toDateString()}
            </FeedDate>
          </FeedSummary>
          <FeedExtra text>{this.props.text}</FeedExtra>
          <FeedMeta>
            <FeedLike>
              <LikeButton
                className="likeButton"
                likesArray={this.props.likes}
                messageId={this.props.id}
              />
            </FeedLike>
          </FeedMeta>
        </FeedContent>
      </Feed.Event>
    );
  }
}

export default Message;
