import Avatar from "@mui/material/Avatar";
import "./Sidebar.css";
import { useSelector } from "react-redux";
import { selectUser } from "../features/User/userSlice";
function Sidebar() {
  // ! -----------------------------------------------------------------
  // const user = useSelector(selectUser);
  // * OR
  const { email, displayName, photoURL } = useSelector(selectUser);
  // ! -----------------------------------------------------------------
  const recentItem = (topic) => {
    return (
      <div className="sidebar__recentItem">
        <span className="sidebar__hash">#</span>
        <p>{topic}</p>
      </div>
    );
  };

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqVJ0w77EEqNmkhlJVtr6xquBoG1gwF346J5R2LxaH-ttpr7ZFCKCFlbRk&s=10"
          alt=""
        />
        <Avatar src={photoURL} className="sidebar__avatar">
          {email[0]}
        </Avatar>
        <h2>{displayName}</h2>
        <h4>{email}</h4>
      </div>
      <div className="sidebar__stats">
        <div className="sidebar__stat">
          <p>Who Viewed You</p>
          <p className="sidebar__statNumber">2,543 </p>
        </div>

        <div className="sidebar__stat">
          <p>Views on Post</p>
          <p className="sidebar__statNumber">2,448 </p>
        </div>
      </div>

      <div className="sidebar__bottom">
        <p>Recent</p>
        {recentItem("reactjs")}
        {recentItem("programming")}
        {recentItem("software")}
        {recentItem("design")}
        {recentItem("developer")}
      </div>
    </div>
  );
}

export default Sidebar;
