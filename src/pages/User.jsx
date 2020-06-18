import React from "react";

import { Breadcrumb, BreadcrumbItem } from "reactstrap";

import { Link } from "react-router-dom";

import UserModel from "../models/users";

import Swal from "sweetalert2";
import qs from "querystring";

class User extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
      users: [],
      pageInfo: {},
    };
  }

  componentDidMount() {
    this.fetchUser("");
  }

  search = (e) => {
    e.preventDefault();

    const query = this.props.location.search.slice(1);
    const param = qs.stringify({
      ...qs.parse(query),
      ...{ search: this.state.user },
    });

    this.props.history.push(`/dashboard/users?${param}`);

    this.fetchUser(param);
  };

  fetchUser = (param) => {
    UserModel.get(param)
      .then((res) => {
        this.setState({
          users: res.data.data,
          pageInfo: res.data.pageInfo,
        });
      })
      .catch((rej) => {
        this.setState({
          users: [],
        });
      });
  };

  toggleRole = (id) => {
    const query = this.props.location.search.slice(1);
    const param = qs.stringify({ ...qs.parse(query) });

    UserModel.toggleRole(id)
      .then((res) => {
        Swal.fire("Success", "Success toggle role", "success");
      })
      .catch((rej) => {
        Swal.fire("Error", rej.response.data.msg, "error");
      })
      .finally(() => {
        this.fetchUser(param);
      });
  };

  renderUser = (val, index) => {
    const Button = JSON.parse(localStorage.getItem("session_user")).role ===
      "Super Admin" && (
      <button
        onClick={(e) => this.toggleRole(val.id)}
        disabled={val.role === "super_admin"}
        className="btn btn-outline-primary"
      >
        {val.role === "admin"
          ? "To Member"
          : val.role === "super_admin"
          ? "super_admin"
          : "To Admin"}
      </button>
    );
    return (
      <tr key={index}>
        <td>{val.email}</td>
        <td>{val.name}</td>
        <td>{val.phone}</td>
        <td>{val.role}</td>
        <td>{Button}</td>
      </tr>
    );
  };

  render() {
    const query = this.props.location.search.slice(1);
    const params = qs.parse(query);

    params.page = parseInt(params.page) || 1;

    return (
      <div className="container-fluid p-0 mb-5" style={{ overflowX: "hidden" }}>
        <Breadcrumb>
          <BreadcrumbItem>
            <span>Dashboard</span>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to="/dashboard/users">Users</Link>
          </BreadcrumbItem>
        </Breadcrumb>
        <div className="d-flex flex-column flex-lg-row justify-content-between mt-3 align-items-center px-4 pb-0">
          <h3>List User</h3>
          <form onSubmit={this.search}>
            <input
              type="text"
              onChange={(e) => this.setState({ user: e.target.value })}
              className="form-control"
              placeholder="Search user"
            />
          </form>
        </div>
        <div className="row px-3">
          <div className="col mt-2">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <div style={{ overflowX: "auto", overflowY: "auto" }}>
                  <table className="w-100 table">
                    <thead>
                      <tr>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Role</th>
                        {JSON.parse(localStorage.getItem("session_user"))
                          .role === "Super Admin" && <th>Action</th>}
                      </tr>
                    </thead>
                    <tbody>{this.state.users.map(this.renderUser)}</tbody>
                  </table>
                  <div className="d-flex flex-row align-items-center justify-content-between w-100 px-4">
                    <div className="btn-wrapper">
                      <button
                        className="d-inline-flex btn btn-outline-secondary"
                        disabled={this.state.pageInfo.page === 1 ? true : false}
                        onClick={() => {
                          this.props.history.push(
                            `/dashboard/users?${qs.stringify({
                              ...params,
                              ...{ page: this.state.pageInfo.page + 1 },
                            })}`
                          );
                          this.fetchUser(
                            qs.stringify({
                              ...params,
                              page: parseInt(this.state.pageInfo.page) - 1,
                            })
                          );
                        }}
                      >
                        Prev
                      </button>
                    </div>
                    <div className="wrapper">
                      {[...Array(this.state.pageInfo.totalPage)].map((o, i) => (
                        <button
                          onClick={() => {
                            this.fetchUser(
                              qs.stringify({
                                ...params,
                                page: params.page ? i + 1 : i + 1,
                              })
                            );
                            this.props.history.push(
                              `/dashboard/users?${qs.stringify({
                                ...params,
                                ...{ page: i + 1 },
                              })}`
                            );
                          }}
                          className="mx-1 btn btn-outline-secondary"
                          key={i.toString()}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>
                    <div className="btn-wrapper">
                      <button
                        className="d-inline-flex btn btn-outline-secondary"
                        disabled={
                          this.state.pageInfo.page >=
                          this.state.pageInfo.totalPage
                            ? true
                            : false
                        }
                        onClick={() => {
                          this.props.history.push(
                            `/dashboard/users?${qs.stringify({
                              ...params,
                              ...{ page: this.state.pageInfo.page + 1 },
                            })}`
                          );
                          this.fetchUser(
                            qs.stringify({
                              ...params,
                              page: parseInt(this.state.pageInfo.page) + 1,
                            })
                          );
                        }}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default User;
