import React, { HTMLAttributes } from "react";

const autoResize = () => {
  const commentElement = document.getElementById("comment");
  if (commentElement) {
    commentElement.style.height = "auto"; // Reset height
    commentElement.style.height = `${commentElement.scrollHeight}px`; // Set new height
  }
};
const FeedbackSection = () => {
  return (
    <div className="row mt-5 border-top">
      <h3 className="mt-4 fs-4"> Đánh Giá </h3>
      <div className="d-flex p-4">
        <p className="me-5 text-nowrap fs-6 fw-bold"> John Doe </p>
        <div className="d-flex align-items-center gap-2 flex-fill">
          <textarea
            id="comment"
            className="form-control"
            style={{
              overflow: "hidden",
              resize: "none",
            }}
            onInput={autoResize}
          />
          <i className="fa-solid fa-arrow-right btn border-0"></i>
        </div>
      </div>
    </div>
  );
};

export default FeedbackSection;
