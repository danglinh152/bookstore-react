import { error } from "console";
import React, { useState } from "react";
import { Link } from "react-router-dom";

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Hàm chuyển đổi tệp avatar thành chuỗi base64
    const convertToBase64 = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });
    };

    // Kiểm tra nếu có avatar thì chuyển đổi nó sang base64
    let avatarBase64 = "";
    if (avatar) {
      try {
        avatarBase64 = await convertToBase64(avatar); // Chuyển đổi avatar thành base64
      } catch (error) {
        console.error("Error converting avatar to base64:", error);
        return;
      }
    }

    // Prepare the data for the API request, including avatar as base64 string
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

    console.log(JSON.stringify(userData));

    try {
      const response = await fetch("http://localhost:8080/account/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json", // specify the content type
        },
        body: JSON.stringify(userData), // send the data as JSON
      });

      if (response.ok) {
        const result = await response.json();
        console.log("User registered successfully:", result);
        // Handle success, e.g., redirect to a login page or display a success message
      } else {
        console.error("Failed to register user.");

        // Handle errors, e.g., display an error message
      }
    } catch (error) {
      console.error("An error occurred while registering the user:", error);
    }
  };

  return (
    <div className="container-fluid bg-white">
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
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="form-outline mb-5">
                <input
                  type="email"
                  id="email"
                  className="form-control border-bottom"
                  placeholder="Email address"
                  style={{ border: "none", boxShadow: "none", width: "450px" }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
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
