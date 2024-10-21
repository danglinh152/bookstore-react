import User from "../models/User";
import { request } from "./request";

export async function getUser(url: string): Promise<User> {
  const responseUser = await request(url);

  var user = new User(
    responseUser.userId,
    responseUser.avatar,
    responseUser.firstName,
    responseUser.lastName,
    responseUser.userName,
    responseUser.passwd,
    responseUser.gender,
    responseUser.email,
    responseUser.phoneNumber,
    responseUser.buyingAddress,
    responseUser.shippingAddress
  );

  return user;
}

export async function getUserFromFeedback(feedbackId: number): Promise<User> {
  const url: string = `http://localhost:8080/feedbacks/${feedbackId}/user`;

  return getUser(url);
}
