import { useEffect, useState } from "react";
import { AuthGuard } from "../Auth";
import Navbar from "../assets/components/Navbar";
import { useAxios } from "../hooks";

function ListUser() {
  const axios = useAxios();
  const [users, setUsers] = useState();
  useEffect(() => {
    axios
      .get("/users")
      .then((res) => {
        console.log(res.data.content);
        setUsers(res.data.content);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, []);
  return (
    <AuthGuard>
      <Navbar />
      <main>
        <div className="hero py-5 bg-light">
          <div className="container">
            <a href="users-form.html" className="btn btn-primary">
              Add User
            </a>
          </div>
        </div>

        <div className="list-form py-5">
          <div className="container">
            <h6 className="mb-3">List Users</h6>

            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Created at</th>
                  <th>Last login</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>z
                {users &&
                  users.map((user) => {
                    console.log(user)
                    return (
                      <tr>
                        <td>
                          <a
                            href="../Gaming Portal/profile.html"
                            target="_blank"
                          >
                            player1
                          </a>
                        </td>
                        <td>2024-04-05 20:55:40</td>
                        <td>2024-04-05 20:55:40</td>
                        <td>
                          <span className="bg-success text-white p-1 d-inline-block">
                            Active
                          </span>
                        </td>
                        <td>
                          <div className="btn-group" role="group">
                            <button
                              type="button"
                              className="btn btn-primary btn-sm dropdown-toggle"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              Lock
                            </button>
                            <ul className="dropdown-menu">
                              <li>
                                <a
                                  type="submit"
                                  className="dropdown-item"
                                  name="reason"
                                  value="spamming"
                                >
                                  Spamming
                                </a>
                              </li>
                              <li>
                                <a
                                  type="submit"
                                  className="dropdown-item"
                                  name="reason"
                                  value="cheating"
                                >
                                  Cheating
                                </a>
                              </li>
                              <li>
                                <a
                                  type="submit"
                                  className="dropdown-item"
                                  name="reason"
                                  value="other"
                                >
                                  Other
                                </a>
                              </li>
                            </ul>
                          </div>
                          <a
                            href="users-form.html"
                            className="btn btn-sm btn-secondary"
                          >
                            Update
                          </a>
                          <a href="#" className="btn btn-sm btn-danger">
                            Delete
                          </a>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </AuthGuard>
  );
}
export default ListUser;
