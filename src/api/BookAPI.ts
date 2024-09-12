import React from "react";
import Book from "../models/Book";

async function request(endpoint: string) {
    const response = await fetch(endpoint);

    if (!response) {
        throw new Error(`Can not reach to ${endpoint}`);
    }

    return response.json();

}


export async function getAllBooks(): Promise<Book[]> {
    const result: Book[] = [];

    const url: string = `http://localhost:8080/books`;
    const response = await request(url);

    const responseData = response._embedded.books;

    for (const bookData of responseData) {


        let urlImage: string = `http://localhost:8080/books/${bookData.bookId}/listOfImage`

        const responseImage = await request(urlImage);
        const responseImageData = responseImage._embedded.images;

        const imageUrl = responseImageData && responseImageData.length > 0 ? responseImageData[0].path : null;

        console.log(imageUrl);



        const book = new Book(
            bookData.bookId,
            bookData.title,
            bookData.author,
            bookData.isbn,
            bookData.description,
            bookData.listPrice,
            bookData.sellingPrice,
            bookData.quantity,
            bookData.avgRate,
            imageUrl
            // bookData.imageUrl = "public/images/Toi-Thay-Hoa-Vang-Tren-Co-Xanh.jpg"
        );
        result.push(book);
    }
    return result;
}

