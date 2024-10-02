import React, { useState } from "react";
import { useAuth } from "../services/AuthContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Logo from "/CJ-ART-Logo1.png"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleBackToHome = () => {
    navigate("/");
  };

  const onForgotPassword = () => {
    navigate("/forgotpassword");
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error logging in:", error);
      const errorMessage = extractErrorCode(error.message);
      alert("Failed to log in: " + errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  function extractErrorCode(errorMessage) {
    const match = errorMessage.match(/\(auth\/([^\)]+)\)/);
    return match ? match[1] : errorMessage;
  }

  return (
    <>
      

      <div
        className="flex flex-col items-center justify-center min-h-screen text-white bg-cover bg-center relative p-4"
        style={{
          // backgroundImage: `url(${Logo})`,
          backgroundColor: "wheat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          padding: "1rem",
        }}
      >
          <div
            className="w-full max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg"
            // style={{ maxWidth: "28rem" }}
          >
            {/* <div className="bg-white p-4 p-sm-5 rounded shadow"> */}
              <div className="text-center">
                <img
                  src={Logo}
                  alt="TLBC Logo"
               className="mb-4 h-16 w-auto"
                  // style={{ height: "4rem", width: "auto" }}
                />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Welcome to TLBC
                </h2>
                <p className="text-gray-600 mb-4">
                  Please login to access your account.
                </p>
              </div>

              <form className="w-full" onSubmit={handleSubmit}>
                <div className="relative mb-4">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded text-black focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>

                <div className="relative mt-2 mb-4">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    className="w-full px-3 py-2 border border-gray-300 rounded pr-10 text-black focus:outline-none focus:ring focus:border-blue-300"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    style={{ paddingRight: "40px" }} //Add padding to prevent text overlap with the icon
                  />
                  <div
                    className="input-group-append position-absolute end-0 top-50 translate-middle-y"
                    style={{ zIndex: 10, paddingRight: "10px" }}
                  >
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                      onClick={togglePasswordVisibility}
                      style={{
                        border: "none",
                        background: "transparent",
                        padding: 0,
                      }}
                    >
                      <FontAwesomeIcon
                        icon={passwordVisible ? faEyeSlash : faEye}
                        className="text-gray-500"
                        style={{
                          color: "#6c757d",
                          height: "1.25rem",
                          width: "1.25rem",
                        }}
                      />
                    </button>
                  </div>
                </div>

                 <div className="flex justify-end mb-4">
                  <div className="text-muted small">
                    <button
                      type="button"
                      onClick={onForgotPassword}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
               </div>

               <div className="w-full">
                  <button
                    type="submit"
                    className={`w-full py-2 rounded text-lg font-bold transition-colors ${isHovered ? 'bg-yellow-700 text-white' : 'bg-yellow-500 text-black'}`}
                    style={{
                      height: "3em",
                      backgroundColor: isHovered ? "#cc8a00" : "#ffc107",
                      color: isHovered ? "white" : "black",
                      fontSize: "1.1em",
                      fontWeight: "bolder",
                      border: "none",
                      transition: "background-color 0.3s",
                      cursor: "pointer",
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </button>
                </div>
              </form>

          </div>
        </div>
    </>
  );
}

export default Login;
