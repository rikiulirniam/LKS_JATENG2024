import { Link, useNavigate } from "react-router-dom";
import { useAuth, useAxios } from "../hooks";
import { useState } from "react";
import Alert from "../assets/components/Alert";

function Login() {
  const auth = useAuth();
  const axios = useAxios();

  const [data, setData] = useState([]);
  const [alert, setAlert] = useState();

  const navigate = useNavigate();

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
    // console.log(data);
  }
  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post("auth/signin", data)
      .then((res) => {
        localStorage.setItem('token', res.data.token)
        console.log(res.data)
        window.location.href = "/index";
      })
      .catch((err) => {
        console.log(err);
        setAlert(err.response.data.message);
      });
  }
  return (
    <main>
      <section className="login">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-6">
              <h1 className="text-center mb-4">Gaming Portal</h1>
              <div className="card card-default">
                <div className="card-body">
                  <h3 className="mb-3">Sign In</h3>

                  <form onSubmit={handleSubmit}>
                    <div className="form-group my-3">
                      <label htmlFor="username" className="mb-1 text-muted">
                        Username
                      </label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        value={data.username}
                        onChange={handleChange}
                        className="form-control"
                        autoFocus
                      />
                    </div>

                    <div className="form-group my-3">
                      <label htmlFor="password" className="mb-1 text-muted">
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>

                    {alert && <Alert message={alert} />}

                    <div className="mt-4 row">
                      <div className="col">
                        <button type="submit" className="btn btn-primary w-100">
                          Sign In
                        </button>
                      </div>
                      <div className="col">
                        <Link to="/signup" className="btn btn-danger w-100">
                          Sign up
                        </Link>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;
