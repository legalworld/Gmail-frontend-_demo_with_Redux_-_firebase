import Button from "@mui/material/Button";
import "./SendMail.css";
import CloseIcon from "@mui/icons-material/Close";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { closeSendMessage } from "../features/Mail/mailSlice";
import { db } from "../Firebase/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

function SendMail() {
  const dispatch = useDispatch();
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (formData) => {
    setIsSending(true);
    setSendError("");

    try {
      await addDoc(collection(db, "emails"), {
        to: formData.to,
        subject: formData.subject,
        message: formData.message,
        timestamp: serverTimestamp(),
      });
      dispatch(closeSendMessage());
    } catch (error) {
      console.error("Failed to save message to Firestore:", error);
      setSendError(
        "Unable to send message. Check your connection and Firestore permissions.",
      );
    } finally {
      setIsSending(false);
    }
  };
  return (
    <div className="sendMail">
      <div className="sendMail__header">
        {" "}
        <h3>New Message</h3>
        <CloseIcon
          className="sendMail__close"
          onClick={() => dispatch(closeSendMessage())}
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="To"
          {...register("to", { required: true })}
        />

        {errors.to && <p className="sendMail__error">To is Required!</p>}

        <input
          placeholder="Subject"
          type="text"
          {...register("subject", { required: true })}
        />
        {errors.subject && (
          <p className="sendMail__error">Subject is Required!</p>
        )}
        <input
          placeholder="Message"
          type="text"
          className="sendMail__message"
          {...register("message", { required: true })}
        />
        {errors.message && (
          <p className="sendMail__error">Message is Required!</p>
        )}
        {sendError && <p className="sendMail__error">{sendError}</p>}
        <div className="sendMail__options">
          <Button
            className="sendMail__send"
            variant="contained"
            color="primary"
            type="submit"
            disabled={isSending}
          >
            {isSending ? "Sending..." : "Send"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SendMail;
