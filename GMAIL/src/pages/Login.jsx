import "./Login.css";

import logo from "../gmail-no-bg.png";

import Button from "@mui/material/Button";

import { auth, provider } from "../Firebase/firebase";

import { signInWithPopup } from "firebase/auth";

import { login } from "../features/User/userSlice";

import { useDispatch } from "react-redux";

function Login() {
  const dispatch = useDispatch();

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then(({ user }) => {
        dispatch(
          login({
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          }),
        );
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="login">
      <div className="login__container">
        <img src={logo} alt="Gmail_logo" />

        <Button variant="contained" color="primary" onClick={signIn}>
          Login
        </Button>
      </div>
    </div>
  );
}

export default Login;
