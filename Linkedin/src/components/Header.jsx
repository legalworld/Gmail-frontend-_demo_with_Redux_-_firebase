import "./Header.css";
import linkedinLogo from "../linkedin_noBg.png";
import SearchIcon from "@mui/icons-material/Search";
import HeaderOption from "./HeaderOption";
import HomeIcon from "@mui/icons-material/Home";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/firebase.js";

function Header() {
  const logoutOfApp = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };
  return (
    <div className="header">
      <div className="header__left">
        <img src={linkedinLogo} alt="Linkedin logo" />

        <div className="header__search">
          <SearchIcon />
          <input placeholder="Search" type="text" />
        </div>
      </div>
      <div className="header__right">
        <HeaderOption Icon={HomeIcon} title="Home" />
        <HeaderOption Icon={SupervisorAccountIcon} title="My Network" />
        <HeaderOption Icon={BusinessCenterIcon} title="Jobs" />
        <HeaderOption Icon={ChatIcon} title="Messaging" />
        <HeaderOption Icon={NotificationsIcon} title="Notifications" />
        <HeaderOption onClick={logoutOfApp} avatar={true} title="me" />
      </div>
    </div>
  );
}

export default Header;
