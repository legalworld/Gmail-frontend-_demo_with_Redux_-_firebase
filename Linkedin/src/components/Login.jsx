import "./Login.css";
import LinkedinLoginImage from "../logo-Linkedin-noBg.png";
import { auth } from "../Firebase/firebase";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/User/userSlice";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const dispatch = useDispatch();
  const loginToApp = async (e) => {
    e.preventDefault();

    try {
      const userAuth = await signInWithEmailAndPassword(auth, email, password);
      const user = userAuth.user;
      const finalPhotoURL = profilePic || user.photoURL || "";

      if (profilePic && !user.photoURL) {
        await updateProfile(user, { photoURL: profilePic });
      }

      dispatch(
        login({
          email: user.email,
          uid: user.uid,
          displayName: user.displayName || name || "User",
          photoURL: finalPhotoURL,
        }),
      );
    } catch (err) {
      alert(err.message);
    }
  };

  const register = async () => {
    if (!name) {
      return alert("Please enter a full name!");
    }

    try {
      const userAuth = await createUserWithEmailAndPassword(auth, email, password);
      const finalPhotoURL = profilePic || "";

      await updateProfile(userAuth.user, {
        displayName: name,
        photoURL: finalPhotoURL,
      });

      dispatch(
        login({
          email: userAuth.user.email,
          uid: userAuth.user.uid,
          displayName: name,
          photoURL: finalPhotoURL,
        }),
      );
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="login">
      <img src={LinkedinLoginImage} alt="" />
      <form>
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Full name (required if registering)"
          type="text"
        />
        <input
          value={profilePic}
          onChange={(e) => {
            setProfilePic(e.target.value);
          }}
          placeholder="Profile pic URL (optional)"
          type="text"
        />
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Email"
          type="email"
        />
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
          type="password"
        />
        <button onClick={loginToApp} type="submit">
          Sign In
        </button>
      </form>
      <p>
        Not a member?{" "}
        <span onClick={register} className="login__register">
          Register Now
        </span>
      </p>
    </div>
  );
}

export default Login;
