import { Link } from "react-router-dom";
import { useAuth, useAxios } from "../hooks";
import { useState } from "react";
import Alert from "../assets/components/Alert";

function SignUp() {
  const auth = useAuth();
  const axios = useAxios();

  const [data, setData] = useState([]);
  const [alert, setAlert] = useState();

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  }
  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post("auth/signup", data)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        window.location.href = "/index";
      })
      .catch((err) => {
        console.log(err);
        setAlert(err.response.data.message);
      });
  }

  return (
    <main>
      <div className="hero py-5 bg-light">
        <div className="container text-center">
          <h2 className="mb-3">Sign Up - Gaming Portal</h2>
          <div className="text-muted">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </div>
        </div>
      </div>

      <div className="py-5">
        <div className="container">
          <div className="row justify-content-center ">
            <div className="col-lg-5 col-md-6">
              <form onSubmit={handleSubmit}>
                <div className="form-item card card-default my-4">
                  <div className="card-body">
                    <div className="form-group">
                      <label for="username" className="mb-1 text-muted">
                        Username <span className="text-danger">*</span>
                      </label>
                      <input
                        id="username"
                        type="text"
                        placeholder="Username"
                        className="form-control"
                        value={data.username}
                        onChange={handleChange}
                        name="username"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-item card card-default my-4">
                  <div className="card-body">
                    <div className="form-group">
                      <label for="password" className="mb-1 text-muted">
                        Password <span className="text-danger">*</span>
                      </label>
                      <input
                        id="password"
                        type="password"
                        placeholder="Password"
                        className="form-control"
                        value={data.password}
                        onChange={handleChange}
                        name="password"
                      />
                    </div>
                  </div>
                </div>

                {alert && <Alert message={alert} />}

                <div className="mt-4 row">
                  <div className="col">
                    <button className="btn btn-primary w-100">Sign Up</button>
                  </div>
                  <div className="col">
                    <Link to="/" className="btn btn-danger w-100">
                      Sign In
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
export default SignUp;
