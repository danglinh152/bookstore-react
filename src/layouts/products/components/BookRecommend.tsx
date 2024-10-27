import React, { useEffect, useState } from "react";
import Book from "../../../models/Book";
import Image from "../../../models/Image";
import { getAllImages } from "../../../api/ImageAPI";
import { Link } from "react-router-dom";

interface BookProps {
  book: Book;
}

const BookRecommend: React.FC<BookProps> = ({ book }) => {
  const bookId = book.getBookId();

  const [ListImage, setListImage] = useState<Image[]>([]);
  const [isLoad, setIsLoad] = useState(true);
  const [isError, setIsError] = useState<string | null>(null);
  useEffect(() => {
    getAllImages(bookId)
      .then((imageData) => {
        setListImage(imageData);
        setIsLoad(false);
      })
      .catch((imageData) => {
        const error = new Error("Error");
        setIsError(error.message);
      });
  }, []);

  if (isLoad) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }
  if (isError) {
    return (
      <div>
        <h1> Báo lỗi: ${isError} </h1>
      </div>
    );
  }

  return (
    <div className="card p-0 w-100" style={{ height: "250px" }}>
      <Link to={`/book-detail/${book.getBookId()}`}>
        {ListImage && ListImage.length > 0 ? (
          <img
            className="card-img-top w-100 object-fit-cover"
            src={ListImage[0].getData()}
            alt="Card image"
            style={{ height: "150px" }}
          />
        ) : (
          <img
            className="card-img-top w-100 object-fit-cover"
            src="./images/image-pending.jpg"
            alt="Card image"
            style={{ height: "150px" }}
          />
        )}
      </Link>
      <div className="card-body">
        <Link
          to={`/book-detail/${book.getBookId()}`}
          className="text-decoration-none text-black"
        >
          <h4 className="card-title fs-6 fw-bold line-clamp mb-2">
            {book.getTitle()}
          </h4>
          <div className="d-flex gap-1">
            <p className="card-text text-decoration-line-through fst-italic">
              {book.getListPrice()}$
            </p>
            <p className="card-text fw-bold">{book.getSellingPrice()}$</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default BookRecommend;
