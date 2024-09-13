import Image from "../models/Image";
import { request } from "./request";

export async function getImages(bookId: number, url: string): Promise<Image[]> {
    const result: Image[] = [];
    const response = await request(url);
    const responseData = response._embedded.images;

    for (const imageData of responseData) {
        const image = new Image(
            imageData.getImageId,
            imageData.name,
            imageData.isIcon,
            imageData.path,
            imageData.data
        );
        result.push(image);
    }
    return result;
}

export async function getAllImages(bookId: number): Promise<Image[]> {


    const url: string = `http://localhost:8080/books/${bookId}/listOfImage`;

    return getImages(bookId, url);
}

