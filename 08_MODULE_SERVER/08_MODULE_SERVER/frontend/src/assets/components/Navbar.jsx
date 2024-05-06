import { Link } from "react-router-dom";
import { useAuth, useAxios } from "../../hooks";

function Navbar() {
  const auth = useAuth();
  const axios = useAxios();

  function handleLogout(e) {
    e.preventDefault();

    axios
      .post("auth/signout")
      .then((res) => {
        console.log(res.data);
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg sticky-top bg-primary navbar-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Administrator Portal
          </Link>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li>
              <Link to="/list-admin" className="nav-link px-2 text-white">
                List Admins
              </Link>
            </li>
            <li>
              <Link to="/list-user" className="nav-link px-2 text-white">
                List Users
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link active bg-dark" href="#">
                Welcome, {auth.user.username}
              </a>
            </li>
            <li className="nav-item">
              <button
                onClick={handleLogout}
                className="btn bg-white text-primary ms-4"
              >
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
export default Navbar;
