import React, { useState, useEffect } from "react";
import Image from "./../../../models/Image";
import BookProps from "../../products/components/BookProps";
import { getAllImages } from "../../../api/ImageAPI";
import { Link } from "react-router-dom";

const Carousel: React.FC<BookProps> = ({ book }) => {
  const bookId = book.getBookId();

  const [ListImage, setListImage] = useState<Image[]>([]);
  const [isLoad, setIsLoad] = useState(true);
  const [isError, setIsError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    getAllImages(bookId)
      .then((imageData) => {
        // Filter images to only include those where isIcon() returns 1

        const filteredImages = imageData.filter(
          (image) => image.getIsIcon() === true
        );
        setListImage(filteredImages);
        setIsLoad(false);
      })
      .catch(() => {
        const error = new Error("Error");
        setIsError(error.message);
      });
  }, [bookId]);

  if (isLoad) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  if (isError) {
    return (
      <div>
        <h1>Báo lỗi</h1>
      </div>
    );
  }

  return (
    <div className="row d-flex">
      <Link to={`/book-detail/${book.getBookId()}`}>
        <div className="img-block">
          <a href="" className="link">
            <img
              src={
                ListImage.length > 0
                  ? ListImage[currentIndex].getData()
                  : "./images/image-pending.jpg"
              }
              className="d-block w-100 rounded"
              alt={`Slide ${currentIndex + 1}`}
              style={{ width: "100%", height: "300px", objectFit: "cover" }}
            />
          </a>
        </div>
      </Link>
      <div className="d-flex flex-column caption text-white justify-content-center align-items-center mt-3">
        <h2 className="fs-5">{book.getTitle()}</h2>
        <p className="fs-6">{book.getDescription()}</p>
      </div>
    </div>
  );
};

export default Carousel;
