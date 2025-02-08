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

  console.log("rs");
  console.log(response);

  const responseData = response.data.data;

  console.log("rsDT");
  console.log(responseData);

  for (const bookData of responseData) {
    console.log("bDT");
    console.log(bookData);

    const book = new Book(
      bookData.bookId,
      bookData.title,
      bookData.author,
      bookData.isbn,
      bookData.description,
      bookData.descriptionDetails,
      bookData.infoDetails,
      bookData.listPrice,
      bookData.sellingPrice,
      bookData.quantity,
      bookData.avgRate
    );
    result.push(book);
  }

  const totalPages = response.data.meta.totalPages;
  const totalBooks = response.data.meta.total;

  return { result: result, totalBooks: totalBooks, totalPages: totalPages };
}

export async function getAllBooks(currentPage: number): Promise<Result> {
  const url: string = `http://localhost:8080/api/books?sort=bookId,asc&page=${
    currentPage - 1
  }&size=6`;
  return getBooks(url);
}

export async function get3FirstBooks(): Promise<Result> {
  const url: string = `http://localhost:8080/api/books?sort=bookId,asc&page=0&size=3`;
  return getBooks(url);
}

export async function getBookByExpression(
  currentPage: number,
  keyword: string,
  genreId: number
): Promise<Result> {
  let url: string = `http://localhost:8080/api/books?sort=bookId,asc&page=${
    currentPage - 1
  }&size=6`;

  if (keyword === "" && genreId === 0) {
    return getAllBooks(currentPage);
  } else if (keyword !== "" && genreId === 0) {
    // http://localhost:8080/api/books?filter=title~'T'
    url = `http://localhost:8080/api/books?filter=title~'${keyword}'&sort=bookId,asc&page=${
      currentPage - 1
    }&size=6`;
    return getBooks(url);
  } else if (keyword === "" && genreId > 0) {
    url = `http://localhost:8080/api/books/search/findByListOfGenre_GenreId?genreId=${genreId}&sort=bookId,asc&page=${
      currentPage - 1
    }&size=6`;
    return getBooks(url);
  } else {
    url = `http://localhost:8080/api/books/search/findByTitleContainingAndListOfGenre_GenreId?title=${keyword}&genreId=${genreId}&sort=bookId,asc&page=${
      currentPage - 1
    }&size=6`;
    return getBooks(url);
  }
}

export async function getBookByBookId(
  bookId: number
): Promise<Book | undefined> {
  try {
    const response = await request(`http://localhost:8080/api/books/${bookId}`);

    if (response) {
      const result: Book = new Book(
        response.bookId,
        response.title,
        response.author,
        response.isbn,
        response.description,
        response.descriptionDetails,
        response.infoDetails,
        response.listPrice,
        response.sellingPrice,
        response.quantity,
        response.avgRate
      );
      return result;
      // return undefined;
    } else {
      throw new Error("Not Found");
    }
  } catch (error) {
    console.log(error);
  }
}
