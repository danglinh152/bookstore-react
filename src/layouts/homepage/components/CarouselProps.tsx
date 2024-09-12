import React, { useState } from "react";
import Book from "../../../models/Book";
import BookProps from "../../products/components/BookProps";


const Carousel: React.FC<BookProps> = ({ book }) => {
    if (book.getBookId() === 1) {
        return (

            <div className="carousel-item active">
                <div className="row d-flex">
                    <div className="img-block">
                        <a href="" className="link">
                            <img src={book.getImageUrl()} className="d-block w-100 rounded" alt="Slide 1" style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
                        </a>
                    </div>
                    <div className="d-flex flex-column caption text-white justify-content-center align-items-center mt-3">
                        <h2 className="fs-5">{book.getTitle()}</h2>
                        <p className="fs-6">{book.getDescription()}</p>
                    </div>
                </div>
            </div>

        )
    }
    return (

        <div className="carousel-item">
            <div className="row d-flex">
                <div className="img-block">
                    <a href="" className="link">
                        <img src={book.getImageUrl()} className="d-block w-100 rounded" alt="Slide 1" style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
                    </a>
                </div>
                <div className="d-flex flex-column caption text-white justify-content-center align-items-center mt-3">
                    <h2 className="fs-5">{book.getTitle()}</h2>
                    <p className="fs-6">{book.getDescription()}</p>
                </div>
            </div>
        </div>

    )
}

export default Carousel;



