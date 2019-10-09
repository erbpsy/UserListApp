import * as React from "react";
import axios from "axios";
import { RouteComponentProps, withRouter } from "react-router-dom";
export interface IValues {
  first_name: string;
  last_name: string;
  age: number;
  email: string;
  profile: string;
  address: string;
}
export interface IFormState {
  [key: string]: any;
  values: IValues[];
  submitSuccess: boolean;
  loading: boolean;
}
class Create extends React.Component<RouteComponentProps, IFormState> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      age: null,
      email: "",
      profile: "",
      address: "",
      values: [],
      submitSuccess: false,
      loading: false
    };
  }
  private processFormData = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    this.setState({ loading: true });
    const appFormData = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      age: this.state.age,
      email: this.state.email,
      profile: this.state.profile,
      address: this.state.address
    };
    this.setState({
      submitSuccess: true,
      values: [...this.state.values, appFormData],
      loading: false
    });
    axios.post("http://localhost:5000/users", appFormData).then(data => [
      setTimeout(() => {
        this.props.history.push("/");
      }, 1500)
    ]);
  };
  private handleValueChanges = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };
  public render() {
    const { submitSuccess, loading } = this.state;
    return (
      <div>
        <div className={"col-md-12 form-wrapper"}>
          <h2> Create Post </h2>
          {!submitSuccess && (
            <div className="alert alert-info" role="alert">
              Fill the form below to create a new post
            </div>
          )}
          {submitSuccess && (
            <div className="alert alert-info" role="alert">
              The form was successfully submitted!
            </div>
          )}
          <form
            id={"create-post-form"}
            onSubmit={this.processFormData}
            noValidate={true}
          >
            <div className="form-group col-md-12">
              <label htmlFor="first_name"> First Name </label>
              <input
                type="text"
                id="first_name"
                onChange={e => this.handleValueChanges(e)}
                name="first_name"
                className="form-control"
                placeholder="Enter user's first name"
              />
            </div>
            <div className="form-group col-md-12">
              <label htmlFor="last_name"> Last Name </label>
              <input
                type="text"
                id="last_name"
                onChange={e => this.handleValueChanges(e)}
                name="last_name"
                className="form-control"
                placeholder="Enter user's last name"
              />
            </div>
            <div className="form-group col-md-12">
              <label htmlFor="age"> Age </label>
              <input
                type="text"
                id="age"
                onChange={e => this.handleValueChanges(e)}
                name="age"
                className="form-control"
                placeholder="Enter user's Age"
              />
            </div>
            <div className="form-group col-md-12">
              <label htmlFor="email"> Email </label>
              <input
                type="email"
                id="email"
                onChange={e => this.handleValueChanges(e)}
                name="email"
                className="form-control"
                placeholder="Enter user's email address"
              />
            </div>
            <div className="form-group col-md-12">
              <label htmlFor="profile"> Profile </label>
              <input
                type="text"
                id="profile"
                onChange={e => this.handleValueChanges(e)}
                name="profile"
                className="form-control"
                placeholder="Enter Profile"
              />
            </div>
            <div className="form-group col-md-12">
              <label htmlFor="address"> Address </label>
              <input
                type="text"
                id="address"
                onChange={e => this.handleValueChanges(e)}
                name="address"
                className="form-control"
                placeholder="Enter user's address"
              />
            </div>
            <div className="form-group col-md-4 pull-right">
              <button className="btn btn-success" type="submit">
                Create user
              </button>
              {loading && <span className="fa fa-circle-o-notch fa-spin" />}
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default withRouter(Create);
