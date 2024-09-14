import React, { useEffect, useState } from "react";
import Book from "../../models/Book";
import BookProps from "./components/BookProps";
import { getAllBooks } from "../../api/BookAPI";
import { Pagination } from "../utils/Pagination";
const List: React.FC = () => {

    const [List, setList] = useState<Book[]>([]);
    const [isLoad, setIsLoad] = useState(true);
    const [isError, setIsError] = useState<string | null>(null);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalBooks, setTotalBooks] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);

    const pagination = (page: number) => {
        setCurrentPage(page);

    };

    useEffect(() => {
        getAllBooks(currentPage).then(
            (bookData) => {
                setList(bookData.result);
                setTotalBooks(bookData.totalBooks);
                setTotalPages(bookData.totalPages);
                setIsLoad(false);
            }
        ).catch(
            (bookData) => {
                const error = new Error('Error');
                setIsError(error.message);
            }
        )

    }, [currentPage])

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
                    )
                    )
                }
            </div>

            <Pagination totalPages={totalPages} currentPage={currentPage} pagination={pagination} />

        </div >

    );


}

export default List;