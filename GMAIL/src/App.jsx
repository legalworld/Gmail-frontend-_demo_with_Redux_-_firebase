import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import EmailList from "./components/EmailList";
import Header from "./components/Header";
import Mail from "./components/Mail";
import Sidebar from "./components/Sidebar";
import SendMail from "./components/SendMail";
import { selectSendMessageIsOpen } from "./features/Mail/mailSlice";
import { login, selectUser } from "./features/User/userSlice";
import Login from "./pages/Login";
import { useEffect } from "react";
import { auth } from "./Firebase/firebase";

function App() {
  const sendMessageIsOpen = useSelector(selectSendMessageIsOpen);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // the user is logged in
        dispatch(
          login({
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          }),
        );
      }
    });
  }, []);

  return !user ? (
    <Login />
  ) : (
    <BrowserRouter>
      <div className="app">
        <Header />

        <div className="app_body">
          <Sidebar />

          <Routes>
            <Route path="/" element={<EmailList />} />
            <Route path="/mail" element={<Mail />} />
          </Routes>
        </div>

        {sendMessageIsOpen && <SendMail />}
      </div>
    </BrowserRouter>
  );
}

export default App;
