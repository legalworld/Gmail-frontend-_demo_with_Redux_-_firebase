import "./Feed.css";
import CreateIcon from "@mui/icons-material/Create";
import ImageIcon from "@mui/icons-material/Image";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import EventNoteIcon from "@mui/icons-material/EventNote";
import CalendarViewDayIcon from "@mui/icons-material/CalendarViewDay";
import InputOptions from "./InputOptions";
import Post from "./Post";
import {
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from "../Firebase/firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/User/userSlice";
import FlipMove from "react-flip-move";
function Feed() {
  const { displayName, email, photoURL } = useSelector(selectUser);

  const [input, setInput] = useState("");
  const [posts, setPosts] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        })),
      );
    });

    return () => unsubscribe();
  }, []);

  const sendPost = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "posts"), {
        name: displayName,
        description: email,
        message: input,
        photoURL: photoURL || "",
        timestamp: serverTimestamp(),
      });

      setInput("");
      inputRef.current?.focus();
    } catch (error) {
      console.error("Error adding post: ", error);
    }
  };

  return (
    <div className="feed">
      <div className="feed__inputContainer">
        <div className="feed__input">
          <CreateIcon />
          <form>
            <input
              ref={inputRef}
              placeholder="Start a post"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              type="text"
            />
            <button onClick={sendPost} type="submit">
              Send
            </button>
          </form>
        </div>

        <div className="feed__inputOptions">
          <InputOptions Icon={ImageIcon} title="Photo" color="#70B5F9" />
          <InputOptions
            Icon={SubscriptionsIcon}
            title="Video"
            color="#E7A33E"
          />
          <InputOptions Icon={EventNoteIcon} title="Event" color="#C0CBCD" />
          <InputOptions
            Icon={CalendarViewDayIcon}
            title="Write Article"
            color="#7FC15E"
          />
        </div>
      </div>

      {/* Posts */}
      <FlipMove>
        {posts.map(({ id, data: { name, description, message, photoURL } }) => {
          return (
            <Post
              key={id}
              name={name}
              description={description}
              message={message}
              photoURL={photoURL || ""}
            />
          );
        })}
      </FlipMove>

      {/* previously hardcoded for designing */}
      {/* <Post
        name="Gourab Dutta"
        description="this is a test"
        message="wow this worked"
      /> */}
    </div>
  );
}

export default Feed;
