import MenuIcon from "@mui/icons-material/Menu";
import "./Header.css";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import gmailLogo from "../gmail-no-bg.png";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AppsIcon from "@mui/icons-material/Apps";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../features/User/userSlice";

import { signOut } from "firebase/auth";
import { auth } from "../Firebase/firebase";

function Header() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        dispatch(logout());
      })
      .catch((err) => {
        console.error("Logout failed:", err);
      });
  };

  return (
    <div className="header">
      <div className="header__left">
        <IconButton>
          <MenuIcon />
        </IconButton>

        <img src={gmailLogo} alt="Gmail" />
      </div>

      <div className="header__middle">
        <SearchIcon />

        <input type="text" placeholder="Search mail" />

        <ArrowDropDownIcon className="header__inputCaret" />
      </div>

      <div className="header__right">
        <IconButton>
          <AppsIcon />
        </IconButton>

        <IconButton>
          <NotificationsIcon />
        </IconButton>

        <Avatar
          className="avatar"
          onClick={signOutUser}
          src={user?.photoURL}
          alt={user?.displayName || "Profile"}
          sx={{
            width: 35,
            height: 35,
            bgcolor: "transparent",
            color: "#5f6368",
          }}
        >
          <AccountCircleIcon fontSize="large" />
        </Avatar>
      </div>
    </div>
  );
}

export default Header;
