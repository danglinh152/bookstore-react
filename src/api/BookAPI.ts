import Book from "../models/Book";
import { request } from "./request";

interface Result {
    result: Book[];
    totalBooks: number;
    totalPages: number;
}

export async function getBooks(url: string): Promise<Result> {
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

    const totalPages = response.page.totalPages;
    const totalBooks = response.page.totalElements;

    return { result: result, totalBooks: totalBooks, totalPages: totalPages };
}

export async function getAllBooks(currentPage: number): Promise<Result> {

    const url: string = `http://localhost:8080/books?sort=bookId,asc&page=${currentPage - 1}&size=6`;
    return getBooks(url);

}



export async function get3FirstBooks(): Promise<Result> {

    const url: string = `http://localhost:8080/books?sort=bookId,asc&page=0&size=3`;
    return getBooks(url);

}