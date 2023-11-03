import React, { useEffect, useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "../SignupFormModal/SignupForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  };

  useEffect(() => {
    setErrors([])
  }, [
    dispatch,
    email.length,
    password.length
  ])

  const handleDemoLogin = async (e) => {
    e.preventDefault()
    const data = await dispatch(login("demo@aa.io", "password"))
    if (data) {
      setErrors(data)
    } else {
      closeModal()
    }
  }

  return (
    <div className="signup-form-container">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <p>
				  {errors.map((error, idx) => <p key={idx}>{error.split(":")[1]}</p>)}
				</p>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button className="signup-button" type="submit">Log In</button>
      </form>
      <div className="login-demo-user">
        <button className="signup-button" onClick={handleDemoLogin}>
          Go for a test drive! (Log In as Demo User)
        </button>
      </div>
    </div>
  );
}

export default LoginFormModal;
