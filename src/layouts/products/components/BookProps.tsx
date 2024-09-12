import React from "react";
import Book from "../../../models/Book";

interface BookProps {
    book: Book;
}

const BookProps: React.FC<BookProps> = ({ book }) => {

    return (

        <div className="col-lg-4 col-md-6">
            <div className="card mb-5 p-0 w-100">
                <img className="card-img-top w-100 object-fit-cover" src={`${book.getImageUrl()}`} alt="Card image" style={{ height: '250px' }} />
                <div className="card-body">
                    <h4 className="card-title fs-5 fw-bold">{book.getTitle()}</h4>
                    <p className="card-text">{book.getDescription()}</p>
                    <div className="d-flex gap-1">
                        <p className="card-text fs-6 text-decoration-line-through fst-italic">{book.getSellingPrice()}$</p>
                        <p className="card-text fs-5 fw-bold">{book.getListPrice()}$</p>
                    </div>
                    <div className="d-flex">
                        <a className="btn btn-danger">
                            <i className="fa-solid fa-heart"></i>
                            <span className="ms-1">Yêu thích</span>
                        </a>
                        <a className="btn btn-primary ms-auto">
                            <i className="fa-solid fa-cart-shopping"></i>
                            <span className="ms-1">Thêm vào giỏ</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default BookProps;