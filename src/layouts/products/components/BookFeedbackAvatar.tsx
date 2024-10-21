import React, { useEffect, useState } from "react";
import { getUserFromFeedback } from "../../../api/UserAPI";
import User from "../../../models/User";

interface BookFeedbackAvatarInterface {
  feedbackId: number;
}

const BookFeedbackAvatar: React.FC<BookFeedbackAvatarInterface> = ({
  feedbackId,
}) => {
  const [user, setUser] = useState<User>();
  useEffect(() => {
    getUserFromFeedback(feedbackId)
      .then((user) => {
        setUser(user);
      })
      .catch((error) => {
        const errorMsg = new Error(error);
      });
  }, [feedbackId]);
  console.log(feedbackId);
  console.log(user);

  return (
    <div className="d-flex gap-2 align-items-center">
      <img
        src={user?.getAvatar()}
        alt="avatar"
        className="rounded-circle"
        style={{ maxHeight: "30px", width: "30px" }}
      />
      <span className="sfs-6 fw-bold">
        {" "}
        {user?.getFirstName()} {user?.getLastName()}{" "}
      </span>
    </div>
  );
};

export default BookFeedbackAvatar;
