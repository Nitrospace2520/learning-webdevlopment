/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";

const PostAuthor = ({ userID }) => {
  const users = useSelector(selectAllUsers);
  const author = users.find((user) => user.id === userID);
  // console.log(author, userID);

  return (
    <span>
      <i>{author ? author.name : "Unknown author"}</i>
    </span>
  );
};

export default PostAuthor;
