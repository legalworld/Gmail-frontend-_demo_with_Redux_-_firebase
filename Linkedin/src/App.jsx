import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Feed from "./components/Feed";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { login, logout, selectUser } from "./features/User/userSlice";
import Login from "./components/Login";
import { useEffect } from "react";
import { auth } from "./Firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Widgets from "./components/Widgets";
function App() {
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        // User is logged in
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoURL: userAuth.photoURL,
          }),
        );
      } else {
        // User is logged out
        dispatch(logout());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div className="app">
      <Header />

      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Sidebar />
          <Feed />
          <Widgets />
        </div>
      )}
    </div>
  );
}

export default App;

/*

so basically what the structure going to be for a typical 
linkedin clone ???


!--------------------------------------

Header

App Body
    left sidebar
    feed in the middle of the app body
    widgets in the right side...

! -------------------------------------

*/
