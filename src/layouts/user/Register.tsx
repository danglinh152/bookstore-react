import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register: React.FC = () => {
  const [gender, setGender] = useState<string>("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [buyingAddress, setBuyingAddress] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [shippingAddress, setShippingAddress] = useState<string>("");

  const navigate = useNavigate(); // Hook để điều hướng

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGender(event.target.value);
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setAvatar(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setAvatarPreview(null);
    }
  };

  const handleUsername = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newUsername = event.target.value;
    setUserName(newUsername);

    try {
      const response = await fetch(
        `http://localhost:8080/users/search/existsByUsername?username=${newUsername}`
      );

      if (!response.ok) {
        throw new Error(`Failed to reach the server: ${response.statusText}`);
      }

      const data = await response.json(); // Đợi dữ liệu JSON từ phản hồi

      const userErrorMsg = document.getElementById("usernameerrormsg");

      if (userErrorMsg) {
        // Nếu username đã tồn tại, hiển thị thông báo lỗi
        if (data === true) {
          userErrorMsg.style.display = "block";
        } else {
          userErrorMsg.style.display = "none";
        }
      }
    } catch (error) {
      console.error("Error fetching username:", error);
    }
  };

  const handleEmail = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    setEmail(newEmail);

    try {
      const response = await fetch(
        `http://localhost:8080/users/search/existsByEmail?email=${newEmail}`
      );

      if (!response.ok) {
        throw new Error(`Failed to reach the server: ${response.statusText}`);
      }

      const data = await response.json(); // Đợi dữ liệu JSON từ phản hồi

      const emailErrorMsg = document.getElementById("emailerrormsg");

      if (emailErrorMsg) {
        // Nếu username đã tồn tại, hiển thị thông báo lỗi
        if (data === true) {
          emailErrorMsg.style.display = "block";
        } else {
          emailErrorMsg.style.display = "none";
        }
      }
    } catch (error) {
      console.error("Error fetching email:", error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const convertToBase64 = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });
    };

    let avatarBase64 = "";
    if (avatar) {
      try {
        avatarBase64 = await convertToBase64(avatar);
      } catch (error) {
        console.error("Error converting avatar to base64:", error);
        return;
      }
    }

    const userData = {
      avatar: avatarBase64,
      firstName: firstName,
      lastName: lastName,
      username: userName,
      password: password,
      gender: gender,
      email: email,
      phoneNumber: phoneNumber,
      buyingAddress: buyingAddress,
      shippingAddress: shippingAddress,
    };

    try {
      const response = await fetch("http://localhost:8080/account/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        toast.success("Registration successful! Navigating to Login page", {
          autoClose: 1900,
        });

        // Chuyển hướng sang trang đăng nhập sau khi đăng ký thành công
        setTimeout(() => {
          navigate("/login"); // Chuyển hướng người dùng sang trang đăng nhập
        }, 2000); // Đợi 2 giây để hiển thị thông báo trước khi chuyển hướng
      } else {
        toast.error("Registration failed. Please try again.", {
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("An error occurred while registering the user:", error);
      toast.error("An error occurred. Please try again.", {
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="container-fluid bg-white">
      <ToastContainer /> {/* This will display the toast notifications */}
      <div
        className="container d-flex align-items-center justify-content-center"
        style={{ height: "900px" }}
      >
        <form style={{ width: "80%" }} onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-6">
              <div className="form-outline mb-5">
                <input
                  type="text"
                  id="firstName"
                  className="form-control border-bottom"
                  placeholder="First name"
                  style={{ border: "none", boxShadow: "none", width: "450px" }}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="form-outline mb-5">
                <input
                  type="text"
                  id="userName"
                  className="form-control border-bottom"
                  placeholder="User name"
                  style={{ border: "none", boxShadow: "none", width: "450px" }}
                  value={userName}
                  onChange={handleUsername}
                />
                <p
                  id="usernameerrormsg"
                  className="text-danger ms-1"
                  style={{ display: "none" }}
                >
                  {" "}
                  *This username is exists{" "}
                </p>
              </div>
              <div className="form-outline mb-5">
                <input
                  type="email"
                  id="email"
                  className="form-control border-bottom"
                  placeholder="Email address"
                  style={{ border: "none", boxShadow: "none", width: "450px" }}
                  value={email}
                  onChange={handleEmail}
                />
                <p
                  id="emailerrormsg"
                  className="text-danger ms-1"
                  style={{ display: "none" }}
                >
                  {" "}
                  *This email is exists{" "}
                </p>
              </div>
              <div className="form-outline mb-5">
                <input
                  type="text"
                  id="buyingAddress"
                  className="form-control border-bottom"
                  placeholder="Buying address"
                  style={{ border: "none", boxShadow: "none", width: "450px" }}
                  value={buyingAddress}
                  onChange={(e) => setBuyingAddress(e.target.value)}
                />
              </div>
              <div className="form-outline mb-5">
                <input
                  type="tel"
                  id="phoneNumber"
                  className="form-control border-bottom"
                  placeholder="Phone number"
                  style={{ border: "none", boxShadow: "none", width: "450px" }}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>

            <div className="col-6">
              <div className="form-outline mb-5">
                <input
                  type="text"
                  id="lastName"
                  className="form-control border-bottom"
                  placeholder="Last name"
                  style={{ border: "none", boxShadow: "none", width: "450px" }}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="form-outline mb-5">
                <input
                  type="password"
                  id="password"
                  className="form-control border-bottom"
                  placeholder="Password"
                  style={{ border: "none", boxShadow: "none", width: "450px" }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="form-outline mb-5">
                <label className="form-label">Gender</label>
                <div>
                  <input
                    type="radio"
                    id="genderMale"
                    name="gender"
                    value="M"
                    checked={gender === "M"}
                    onChange={handleGenderChange}
                  />
                  <label htmlFor="genderMale" className="ms-2">
                    Male
                  </label>
                  <input
                    type="radio"
                    id="genderFemale"
                    name="gender"
                    value="F"
                    checked={gender === "F"}
                    onChange={handleGenderChange}
                    className="ms-3"
                  />
                  <label htmlFor="genderFemale" className="ms-2">
                    Female
                  </label>
                </div>
              </div>

              <div className="form-outline mb-5">
                <input
                  type="text"
                  id="shippingAddress"
                  className="form-control border-bottom"
                  placeholder="Shipping address"
                  style={{ border: "none", boxShadow: "none", width: "450px" }}
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                />
              </div>

              <div className="form-outline mb-5">
                <input
                  type="file"
                  id="avatar"
                  className="form-control border-bottom"
                  onChange={handleAvatarChange}
                  style={{ border: "none", boxShadow: "none", width: "450px" }}
                />
                {avatarPreview && (
                  <div className="mt-3">
                    <img
                      src={avatarPreview}
                      alt="Avatar Preview"
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-6 d-flex justify-content-start">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="rememberMe"
                />
                <label className="form-check-label" htmlFor="rememberMe">
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
            className="btn btn-primary d-block mx-auto btn-block mb-4 w-50 mt-5"
            style={{ background: "#3b71ca" }}
          >
            Sign up
          </button>

          <div className="text-center">
            <p>
              Have any account?
              <Link
                to={"/login"}
                className="text-decoration-none"
                style={{ color: "#3b71ca" }}
              >
                {" "}
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
