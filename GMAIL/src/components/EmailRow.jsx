import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./EmailRow.css";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import IconButton from "@mui/material/IconButton";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import { selectMail } from "../features/Mail/mailSlice";
function EmailRow({ id, title, subject, description, time }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const openMail = () => {
    dispatch(
      selectMail({
        id,
        title,
        subject,
        description,
        time,
      }),
    );
    navigate("/mail");
  };

  return (
    <div className="emailRow" onClick={openMail}>
      <div className="emailRow__options">
        <IconButton>
          <CheckBoxOutlineBlankOutlinedIcon sx={{ color: "gray" }} />
        </IconButton>
        <IconButton>
          <StarBorderOutlinedIcon />
        </IconButton>
        <IconButton>
          <LabelImportantIcon />
        </IconButton>
      </div>

      <h3 className="emailRow__title">{title}</h3>
      <h4 className="emailRow__message">
        {subject} <span className="emailRow__description">{description}</span>
      </h4>
      <p className="emailRow__time">{time}</p>
    </div>
  );
}

export default EmailRow;
