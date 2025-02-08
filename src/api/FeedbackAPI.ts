import Feedback from "../models/Feedback";
import { request } from "./request";

export async function getFeedbacks(
  urlFeedback: string,
): Promise<Feedback[]> {
  const result: any = [];
  const responseFeedback = await request(urlFeedback);
  const responseFeedbackData = responseFeedback._embedded.feedbacks;

  for (const feedbackData of responseFeedbackData) {
    const feedback = new Feedback(
      feedbackData.feedbackId,
      feedbackData.feedback,
      feedbackData.rate
    );
    result.push(feedback);
  }

  return result;
}

export async function getAllFeedbacks(bookId: number): Promise<Feedback[]> {
  const urlFeedback: string = `http://localhost:8080/api/books/${bookId}/listOfFeedback`;

  return getFeedbacks(urlFeedback);
}
