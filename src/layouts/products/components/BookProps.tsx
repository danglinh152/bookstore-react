import React, { useEffect, useState } from "react";
import Book from "../../../models/Book";
import Image from "../../../models/Image";
import { getAllImages } from "../../../api/ImageAPI";
import { Link } from "react-router-dom";

interface BookProps {
  book: Book;
}

const BookProps: React.FC<BookProps> = ({ book }) => {
  const bookId = book.getBookId();
  const userid = 3;

  const token = localStorage.getItem("token");
  const favoriteData = {
    token,
    bookId,
  };

  const [listImage, setListImage] = useState<Image[]>([]);
  const [isLoad, setIsLoad] = useState(true);
  const [isError, setIsError] = useState<string | null>(null);
  const [favoriteBooks, setFavoriteBooks] = useState<number[]>([]); // State to hold favorite book IDs

  const handleFavorite = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    const favoriteDesc = document.getElementById(`favorite-desc-${bookId}`);
    const favoriteBtn = document.getElementById(`favorite-btn-${bookId}`);

    // Similar to the original handleFavorite logic
    // Add your API call for adding/removing favorites here
  };

  useEffect(() => {
    const fetchFavorite = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/book/favorite?userid=${userid}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          console.log("data:");

          console.log(responseData);

          setFavoriteBooks([]);
        }

        // Assuming listOfBook is an array of favorite book IDs
      } catch (error) {
        console.error("An error occurred while fetching favorites:", error);
      } finally {
        console.log("Request completed");
      }
    };

    fetchFavorite();

    getAllImages(bookId)
      .then((imageData) => {
        setListImage(imageData);
        setIsLoad(false);
      })
      .catch((error) => {
        setIsError(error.message); // Handle error properly
        setIsLoad(false);
      });
  }, [bookId]); // Include bookId as a dependency

  // Check if the current book is a favorite
  const isFavorite = favoriteBooks.includes(bookId);

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
        <h1>Error: {isError}</h1>
      </div>
    );
  }

  return (
    <div className="card mb-5 p-0 w-100" style={{ height: "480px" }}>
      <Link to={`/book-detail/${book.getBookId()}`}>
        {listImage.length > 0 ? (
          <img
            className="card-img-top w-100 object-fit-cover"
            src={listImage[0].getData()}
            alt="Card image"
            style={{ height: "250px" }}
          />
        ) : (
          <img
            className="card-img-top w-100 object-fit-cover"
            src="./images/image-pending.jpg"
            alt="Card image"
            style={{ height: "250px" }}
          />
        )}
      </Link>
      <div className="card-body">
        <Link
          to={`/book-detail/${book.getBookId()}`}
          className="text-decoration-none text-black"
        >
          <h4 className="card-title fs-5 fw-bold line-clamp">
            {book.getTitle()}
          </h4>
          <p
            className="card-text line-clamp-desc mb-4"
            style={{ height: "50px" }}
          >
            {book.getDescription()}
          </p>
          <div className="d-flex gap-1">
            <p className="card-text fs-6 text-decoration-line-through fst-italic">
              {book.getSellingPrice()}$
            </p>
            <p className="card-text fs-5 fw-bold">{book.getListPrice()}$</p>
          </div>
        </Link>

        <div className="d-flex gap-4">
          <a className="btn btn-primary">
            <i className="fa-solid fa-cart-shopping"></i>
            <span className="ms-1">Add to Cart</span>
          </a>
          <a
            className="btn btn-primary"
            id={`favorite-btn-${bookId}`}
            onClick={handleFavorite}
            style={{ backgroundColor: isFavorite ? "red" : "blue" }} // Change color based on favorite status
          >
            <i className="fa-solid fa-heart"></i>
            <span className="ms-1" id={`favorite-desc-${bookId}`}>
              {isFavorite ? "Favorited" : "Favorite"}
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default BookProps;
