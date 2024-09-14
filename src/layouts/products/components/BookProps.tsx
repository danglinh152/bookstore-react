import React, { useEffect, useState } from "react";
import Book from "../../../models/Book";
import Image from "../../../models/Image";
import { getAllImages } from "../../../api/ImageAPI";

interface BookProps {
    book: Book;
}

const BookProps: React.FC<BookProps> = ({ book }) => {

    const bookId = book.getBookId();

    const [ListImage, setListImage] = useState<Image[]>([]);
    const [isLoad, setIsLoad] = useState(true);
    const [isError, setIsError] = useState<string | null>(null);
    useEffect(() => {
        getAllImages(bookId).then(
            (imageData) => {
                setListImage(imageData);
                setIsLoad(false);
            }
        ).catch(
            (imageData) => {
                const error = new Error('Error');
                setIsError(error.message);
            }
        )

    }, [])

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
                <h1> Báo lỗi: ${isError} </h1>
            </div>
        )
    }



    return (

        <div className="col-lg-4 col-md-6">
            <div className="card mb-5 p-0 w-100" style={{ height: '480px' }}>
                {ListImage && ListImage.length > 0 ? (<img className="card-img-top w-100 object-fit-cover" src={ListImage[0].getData()} alt="Card image" style={{ height: '250px' }} />
                ) : (<img className="card-img-top w-100 object-fit-cover" src="./images/image-pending.jpg" alt="Card image" style={{ height: '250px' }} />
                )}
                <div className="card-body">
                    <h4 className="card-title fs-5 fw-bold line-clamp">{book.getTitle()}</h4>
                    <p className="card-text line-clamp-desc mb-4" style={{ height: '50px' }}>{book.getDescription()}</p>
                    <div className="d-flex gap-1">
                        <p className="card-text fs-6 text-decoration-line-through fst-italic">{book.getSellingPrice()}$</p>
                        <p className="card-text fs-5 fw-bold">{book.getListPrice()}$</p>
                    </div>
                    <div className="d-flex gap-4">
                        <a className="btn btn-danger">
                            <i className="fa-solid fa-heart"></i>
                            <span className="ms-1">Yêu thích</span>
                        </a>
                        <a className="btn btn-primary">
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