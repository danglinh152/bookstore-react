import React, { useEffect, useState } from "react";
import Book from "../../models/Book";
import BookProps from "./components/BookProps";
import { getAllBooks } from "../../api/BookAPI";
const List: React.FC = () => {

    const [List, setList] = useState<Book[]>([]);
    const [isLoad, setIsLoad] = useState(true);
    const [isError, setIsError] = useState<string | null>(null);

    useEffect(() => {
        getAllBooks().then(
            (bookData) => {
                setList(bookData);
                setIsLoad(false);
            }
        ).catch(
            (bookData) => {
                const error = new Error('Error');
                setIsError(error.message);
            }
        )

    }, [])

    if (isLoad) {
        return (
            <div>
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
        </div >
    );


}

export default List;