import React from "react";
import { Form, Button, Label, TextArea, Message } from "semantic-ui-react";
import UpdateUserInfoService from "../../services/UpdateUserInfoService";
import "./UpdateUserInfoForm.css";

class UpdateUserInfoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      responseCode: null,
      updateUserInfoObject: {
        password: "",
        displayName: "",
        about: "",
      },
    };

    this.UpdateUserInfoService = new UpdateUserInfoService();
  }

  handleChange = (e) => {
    let formData = { ...this.state.updateUserInfoObject };
    formData[e.target.name] = e.target.value;
    this.setState({
      updateUserInfoObject: formData,
    });
  };

  handleUpdateUserInfo = (event) => {
    event.preventDefault();
    //Evaluates the updateUserInfoObject, and if a key has an empty string as it's value, that key is deleted
    for (let property in this.state.updateUserInfoObject) {
      if (this.state.updateUserInfoObject[property].length === 0) {
        delete this.state.updateUserInfoObject.property;
      }
    }

    this.UpdateUserInfoService.updateInfo(this.state.updateUserInfoObject)
      .then((result) => {
        this.setState({
          responseCode: result.data.statusCode,
        });
        this.setState({
          updateUserInfoObject: {
            password: "",
            displayName: "",
            about: "",
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleReset = (event) => {
    this.setState({
      responseCode: null,
    });
  };

  render() {
    if (this.state.responseCode === 200) {
      return (
        <div className="UpdateUserInfoForm">
          <Form onSubmit={this.handleUpdateUserInfo}>
            <Form.Field>
              <Label size="small" color="blue">
                Create a New Password
              </Label>
              <Form.Input
                type="password"
                name="password"
                size="small"
                required
                onChange={this.handleChange}
                value={this.state.updateUserInfoObject.password}
                minLength="3"
                maxLength="20"
              />
            </Form.Field>
            <Form.Field>
              <Label size="small" color="blue">
                Chose a New Display Name!
              </Label>
              <Form.Input
                type="text"
                name="displayName"
                size="small"
                required
                onChange={this.handleChange}
                value={this.state.updateUserInfoObject.displayName}
                minLength="3"
                maxLength="20"
              />
            </Form.Field>
            <Form.Field>
              <Label size="small" color="blue">
                Update Your "About" Information!
              </Label>
              <Form.TextArea
                type="text"
                name="about"
                size="small"
                required
                onChange={this.handleChange}
                value={this.state.updateUserInfoObject.about}
                maxLength="255"
              />
            </Form.Field>
          </Form>
          <Message
            success
            header="Form Completed!"
            content="You have Successfully Updated Your User Information!"
            onDismiss={this.handleReset}
          />
        </div>
      );
    }

    return (
      <div className="UpdateUserInfoForm">
        <Form onSubmit={this.handleUpdateUserInfo}>
          <Form.Field>
            <Label size="small" color="blue">
              Create a New Password
            </Label>
            <Form.Input
              type="password"
              name="password"
              size="small"
              onChange={this.handleChange}
              required
            />
          </Form.Field>
          <Form.Field>
            <Label size="small" color="blue">
              Chose a New Display Name!
            </Label>
            <Form.Input
              type="text"
              name="displayName"
              size="small"
              onChange={this.handleChange}
              minLength="3"
              maxLength="20"
              required
            />
          </Form.Field>
          <Form.Field>
            <Label size="small" color="blue">
              Update Your "About" Information!
            </Label>
            <TextArea
              type="text"
              name="about"
              size="small"
              onChange={this.handleChange}
              maxLength="255"
              required
            />
          </Form.Field>
          <Button positive type="submit">
            Update User Information
          </Button>
        </Form>
      </div>
    );
  }
}

export default UpdateUserInfoForm;
