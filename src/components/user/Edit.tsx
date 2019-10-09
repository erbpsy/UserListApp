import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import axios from "axios";
import { async } from "q";
export interface IValues {
  [key: string]: any;
}
export interface IFormState {
  id: number;
  user: any;
  values: IValues[];
  submitSuccess: boolean;
  loading: boolean;
}
class EditUser extends React.Component<RouteComponentProps<any>, IFormState> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      user: {},
      values: [],
      submitSuccess: false,
      loading: false
    };
  }
  public componentDidMount(): void {
    debugger;
    axios.get("http://localhost:5000/users/${this.state.id}").then(data => {
      this.setState({ user: data.data });
    });
  }
  private processFormData = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    this.setState({ loading: true });
    axios
      .patch("http://localhost:5000/users/${this.state.id}", this.state.values)
      .then(data => {
        this.setState({ submitSuccess: true, loading: false });
        setTimeout(() => {
          this.props.history.push("/");
        }, 1500);
      });
  };
  private setValues = (values: IValues) => {
    this.setState({ values: { ...this.state.values, ...values } });
  };
  private handleValueChanges = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.setValues({ [e.currentTarget.id]: e.currentTarget.value });
  };
  public render() {
    const { submitSuccess, loading } = this.state;
    return (
      <div className="App">
        {this.state.user && (
          <div>
            <h1> user List Management App</h1>
            <p> Built with React.js and TypeScript </p>

            <div>
              <div className={"col-md-12 form-wrapper"}>
                <h2> Edit user </h2>
                {submitSuccess && (
                  <div className="alert alert-info" role="alert">
                    user's details has been edited successfully{" "}
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
                      value={this.state.user.first_name}
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
                      value={this.state.user.last_name}
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
                      value={this.state.user.age}
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
                      value={this.state.user.email}
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
                      value={this.state.user.profile}
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
                      value={this.state.user.address}
                      onChange={e => this.handleValueChanges(e)}
                      name="address"
                      className="form-control"
                      placeholder="Enter user's address"
                    />
                  </div>
                  <div className="form-group col-md-4 pull-right">
                    <button className="btn btn-success" type="submit">
                      Edit User{" "}
                    </button>
                    {loading && (
                      <span className="fa fa-circle-o-notch fa-spin" />
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default withRouter(EditUser);
