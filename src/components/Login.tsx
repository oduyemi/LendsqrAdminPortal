import { useState, useEffect, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../store/use-auth";
import { loginUser } from "../features/users/api/login";
import hero from "../assets/images/signinHero.png";
import logo from "../assets/images/logo.svg";
import "../styles/login.scss";

export const LoginForm = () => {
  const navigate = useNavigate();
  const {
    email,
    password,
    setEmail,
    setPassword,
    login,
    isAuthenticated,
  } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string>("");
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);
  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      login(data);
      navigate("/dashboard");
    },
    onError: (error: any) => {
      setFormError(error.message);
    },
  });
  const validateForm = () => {
    if (!email) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(email)) return "Enter a valid email";
    if (!password) return "Password is required";
    if (password.length < 6)
      return "Password must be at least 6 characters";

    return "";
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      setFormError(error);
      return;
    }

    setFormError("");
    mutation.mutate({ email, password });
  };

  return (
    <div className="login-container container-fluid">
      <div className="row min-vh-100">
        {/* LEFT */}
        <div className="col-lg-6 d-none d-lg-flex flex-column justify-content-between left-panel">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>

          <div className="illustration d-flex align-items-center justify-content-center my-auto">
            <img src={hero} alt="hero" />
          </div>
        </div>

        {/* RIGHT */}
        <div className="col-lg-6 d-flex align-items-center justify-content-center right-panel">
          <div className="login-box">
            <h1>Welcome!</h1>
            <p>Enter details to login.</p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </span>
              </div>

              <div className="forgot">
                <Link to="#">FORGOT PASSWORD?</Link>
              </div>

              <button
                type="submit"
                className="btn login-btn"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Logging in..." : "LOG IN"}
              </button>
            </form>
            {formError && <p className="error">{formError}</p>}
            {mutation.isSuccess && (
              <p className="success">Login successful</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};