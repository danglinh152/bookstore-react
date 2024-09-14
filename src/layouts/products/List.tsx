import React, { useEffect, useState, useRef } from "react";
import Book from "../../models/Book";
import BookProps from "./components/BookProps";
import { getAllBooks, getByTitle } from "../../api/BookAPI";
import { Pagination } from "../utils/Pagination";

interface List {
    keyword: string;
}
const List: React.FC<List> = (props) => {

    const [List, setList] = useState<Book[]>([]);
    const [isLoad, setIsLoad] = useState(true);
    const [isError, setIsError] = useState<string | null>(null);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalBooks, setTotalBooks] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);

    const prevKeywordRef = useRef<string>(props.keyword);

    const pagination = (page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        if (props.keyword !== prevKeywordRef.current) {
            setCurrentPage(1); // Reset to page 1 when keyword changes
            prevKeywordRef.current = props.keyword; // Update the ref
        }

        setIsLoad(true); // Set loading state

        if (props.keyword.trim() === '') {
            getAllBooks(currentPage).then(
                (bookData) => {
                    setList(bookData.result);
                    setTotalBooks(bookData.totalBooks);
                    setTotalPages(bookData.totalPages);
                    setIsLoad(false);
                }
            ).catch(
                () => {
                    setIsError('Error fetching books');
                    setIsLoad(false);
                }
            )
        } else {
            getByTitle(currentPage, props.keyword).then(
                (bookData) => {
                    setList(bookData.result);
                    setTotalBooks(bookData.totalBooks);
                    setTotalPages(bookData.totalPages);
                    setIsLoad(false);
                }
            ).catch(
                () => {
                    setIsError('Error fetching books');
                    setIsLoad(false);
                }
            )
        }

    }, [currentPage, props.keyword]) // Keep currentPage and keyword in the dependencies

    if (isLoad) {
        return (
            <div className="loading-screen">
                <h1> Loading... </h1>
            </div>
        )
    }
    if (isError) {
        return (
            <div>
                <h1> Error!! </h1>
            </div>
        )
    }

    return (
        <div className="container p-5" id="list-product" >
            <div className="row">
                {
                    List.map((book) => (
                        <BookProps key={book.getBookId()} book={book} />
                    ))
                }
            </div>

            <Pagination totalPages={totalPages} currentPage={currentPage} pagination={pagination} totalBooks={totalBooks} />

        </div>
    );
}

export default List;
