import Book from "../models/Book";
import { request } from "./request";

export async function getBooks(url: string): Promise<Book[]> {
    const result: Book[] = [];

    const response = await request(url);

    const responseData = response._embedded.books;

    for (const bookData of responseData) {
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
        );
        result.push(book);
    }
    return result;
}

export async function getAllBooks(): Promise<Book[]> {

    const url: string = `http://localhost:8080/books`;
    return getBooks(url);

}

export async function get3NewBooks(): Promise<Book[]> {

    const url: string = `http://localhost:8080/books?sort=bookId,desc&page=0&size=3`;
    return getBooks(url);

}