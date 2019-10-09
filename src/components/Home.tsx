import * as React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import axios from "axios";
interface IState {
  users: any[];
}
export default class Home extends React.Component<RouteComponentProps, IState> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      users: []
    };
  }
  public componentDidMount(): void {
    debugger;
    axios.get("http://localhost:5000/users").then(data => {
      this.setState({ users: data.data });
    });
  }
  public deleteUser(id: number) {
    axios.delete("http://localhost:5000/users/${id}").then(data => {
      const index = this.state.users.findIndex(user => user.id === id);
      this.state.users.splice(index, 1);
      this.props.history.push("/");
    });
  }
  public render() {
    const users = this.state.users;
    return (
      <div>
        {users.length === 0 && (
          <div className="text-center">
            <h2>No user found at the moment</h2>
          </div>
        )}
        <div className="container">
          <div className="row">
            <table className="table table-bordered">
              <thead className="thead-light">
                <tr>
                  <th scope="col">Firstname</th>
                  <th scope="col">Lastname</th>
                  <th scope="col">Age</th>
                  <th scope="col">Email</th>
                  <th scope="col">Profile</th>
                  <th scope="col">Address</th>
                </tr>
              </thead>
              <tbody>
                {users &&
                  users.map(user => (
                    <tr key={user.id}>
                      <td>{user.first_name}</td>
                      <td>{user.last_name}</td>
                      <td>{user.age}</td>
                      <td>{user.email}</td>
                      <td>{user.profile}</td>
                      <td>{user.address}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
