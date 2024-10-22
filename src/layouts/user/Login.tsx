import React from "react";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  return (
    <div className="container-fluid  bg-white">
      <div
        className="container d-flex align-items-center justify-content-center"
        style={{ height: "600px" }}
      >
        <form style={{ width: "40%" }}>
          <div data-mdb-input-init className="form-outline mb-4">
            <input
              type="email"
              id="form2Example1"
              className="form-control border-bottom"
              placeholder="Email address"
              style={{ border: "none", boxShadow: "none" }}
            />
          </div>

          <div data-mdb-input-init className="form-outline mb-4">
            <input
              type="password"
              id="form2Example2"
              className="form-control border-bottom"
              placeholder="Password"
              style={{ border: "none", boxShadow: "none" }}
            />
          </div>

          <div className="row mb-4">
            <div className="col-6 d-flex justify-content-start">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="form2Example31"
                />
                <label className="form-check-label" htmlFor="form2Example31">
                  Remember me
                </label>
              </div>
            </div>

            <div className="col-6 d-flex justify-content-end">
              <a
                href="#!"
                className="text-decoration-none"
                style={{ color: "#3b71ca" }}
              >
                Forgot password?
              </a>
            </div>
          </div>

          <button
            type="button"
            data-mdb-button-init
            data-mdb-ripple-init
            className="btn btn-primary d-block mx-auto btn-block mb-4 w-50"
            style={{ background: "#3b71ca" }}
          >
            Sign in
          </button>

          <div className="text-center">
            <p>
              Not a member?{" "}
              <Link
                to={"/register"}
                className="text-decoration-none"
                style={{ color: "#3b71ca" }}
              >
                Register
              </Link>
            </p>
            <p>or sign up with:</p>
            <button
              type="button"
              data-mdb-button-init
              data-mdb-ripple-init
              className="btn btn-link btn-floating mx-1"
              style={{ color: "#3b71ca" }}
            >
              <i className="fab fa-facebook-f"></i>
            </button>

            <button
              type="button"
              data-mdb-button-init
              data-mdb-ripple-init
              className="btn btn-link btn-floating mx-1"
              style={{ color: "#3b71ca" }}
            >
              <i className="fab fa-google"></i>
            </button>

            <button
              type="button"
              data-mdb-button-init
              data-mdb-ripple-init
              style={{ color: "#3b71ca" }}
              className="btn btn-link btn-floating mx-1"
            >
              <i className="fab fa-twitter"></i>
            </button>

            <button
              type="button"
              data-mdb-button-init
              data-mdb-ripple-init
              className="btn btn-link btn-floating mx-1"
              style={{ color: "#3b71ca" }}
            >
              <i className="fab fa-github"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
