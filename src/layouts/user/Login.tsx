import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Login: React.FC = () => {
  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate(); // Hook để điều hướng

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const loginRequest = {
      username: username,
      password: password,
    };

    try {
      fetch("http://localhost:8080/account/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(loginRequest),
      })
        .then((response) => {
          if (response.ok) {
            toast.success("Login successful! Navigating to Home page", {
              autoClose: 1000,
            });
            return response.json();
          } else {
            throw new Error("Invalid Username or Password");
          }
        })
        .then((data) => {
          localStorage.setItem("token", data.jwt);
          setTimeout(() => {
            navigate("/");
            window.location.reload();
          }, 1500);
        })
        .catch((error) => {
          toast.error(`${error}. Login failed please try again.`, {
            autoClose: 2000,
          });
        });
    } catch (error) {
      console.error("An error occurred while logining the user:", error);
      toast.error("An error occurred. Please try again.", {
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid  bg-white">
      <ToastContainer /> {/* This will display the toast notifications */}
      {(() => {
        if (loading) {
          return (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading...</p>
            </div>
          );
        } else {
          return (
            <div
              className="container d-flex align-items-center justify-content-center"
              style={{ height: "600px" }}
            >
              <form style={{ width: "40%" }} onSubmit={handleSubmit}>
                <div data-mdb-input-init className="form-outline mb-4">
                  <input
                    type="text"
                    id="form2Example1"
                    className="form-control border-bottom"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    style={{ border: "none", boxShadow: "none" }}
                  />
                </div>

                <div data-mdb-input-init className="form-outline mb-4">
                  <input
                    type="password"
                    id="form2Example2"
                    className="form-control border-bottom"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                      <label
                        className="form-check-label"
                        htmlFor="form2Example31"
                      >
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
                  type="submit"
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
          );
        }
      })()}
    </div>
  );
};

export default Login;
