import React, { useEffect, useState } from "react";
import Feedback from "../../../models/Feedback";
import { getAllFeedbacks } from "../../../api/FeedbackAPI";
import BookFeedbackAvatar from "./BookFeedbackAvatar";

interface BookFeedbackInterface {
  bookId: number;
}

const BookFeedbacks: React.FC<BookFeedbackInterface> = ({ bookId }) => {
  const [listFeedback, setListFeedback] = useState<Feedback[]>([]);

  useEffect(() => {
    getAllFeedbacks(bookId)
      .then((feedbackData) => {
        setListFeedback(feedbackData);
      })
      .catch((error) => {
        const errorMsg = new Error(error);
      });
  }, [bookId]);

  return (
    <div className="d-flex flex-column gap-1 p-1">
      {listFeedback.map((feedback: Feedback) => (
        <div className="gap-3 mt-2">
          {/* <img
            src={feedback.getFeedbackId()}
            alt="avatar"
            className="rounded-circle"
            style={{ maxHeight: "40px", width: "40px" }}
          /> */}
          <BookFeedbackAvatar feedbackId={feedback.getFeedbackId()} />
          <p className="ms-5 m-0" style={{fontSize: "15px"}}>{feedback.getFeedback()}</p>
        </div>
      ))}
    </div>
  );
};

export default BookFeedbacks;
