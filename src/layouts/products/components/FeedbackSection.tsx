import React, { HTMLAttributes, useEffect } from "react";

interface BookFeedbackInterface {
  bookId: number;
}

const FeedbackSection: React.FC<BookFeedbackInterface> = ({ bookId }) => {
  const [feedbackText, setFeedbackText] = React.useState<string>("");
  const [rating, setRating] = React.useState<number>(0);

  const autoResize = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const commentElement = event.target;
    commentElement.style.height = "auto"; // Reset height
    commentElement.style.height = `${commentElement.scrollHeight}px`; // Set new height
  };

  const giveNewFeedback = async (feedbackText: string, rating: number) => {
    const token = localStorage.getItem("token");
    const feedbackData = {
      token,
      bookId,
      feedback: feedbackText,
      rate: rating,
    };

    console.log("Sending feedback data:", feedbackData); // Log feedback data

    try {
      const response = await fetch(
        `http://localhost:8080/book/feedback/givefeedback`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(feedbackData),
        }
      );

      if (response.ok) {
        console.log("Feedback submitted successfully");
      } else {
        const errorData = await response.json();
        console.error("Bad request:", errorData);
      }
    } catch (error) {
      console.error("An error occurred while submitting feedback:", error);
    } finally {
      console.log("Request completed");
    }
  };

  return (
    <div className="row mt-5 border-top">
      <h3 className="mt-4 fs-4">Đánh Giá</h3>
      <div className="d-flex p-4">
        <p className="me-5 text-nowrap fs-6 fw-bold">John Doe</p>
        <div className="d-flex align-items-center gap-2 flex-fill">
          <textarea
            id="comment"
            className="form-control"
            style={{
              overflow: "hidden",
              resize: "none",
            }}
            value={feedbackText}
            onChange={(e) => {
              setFeedbackText(e.target.value);
              autoResize(e); // Call autoResize on change
            }}
            onInput={autoResize}
          />
          <input
            type="number"
            className="form-control"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            placeholder="Rate (1-5)"
          />
          <i
            onClick={() => giveNewFeedback(feedbackText, rating)}
            className="fa-solid fa-arrow-right btn border-0"
          ></i>
        </div>
      </div>
    </div>
  );
};

export default FeedbackSection;
