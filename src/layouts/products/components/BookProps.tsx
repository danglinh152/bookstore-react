import React, { useEffect, useState } from "react";
import Book from "../../../models/Book";
import Image from "../../../models/Image";
import { getAllImages } from "../../../api/ImageAPI";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface BookProps {
  book: Book;
}

interface FavoriteBook {
  bookId: number;
}

interface UserData {
  avatar?: string;
  name?: string;
  userid?: number;
}

const BookProps: React.FC<BookProps> = ({ book }) => {
  const bookId = book.getBookId();

  const [listImage, setListImage] = useState<Image[]>([]);
  const [isLoad, setIsLoad] = useState(true);
  const [isError, setIsError] = useState<string | null>(null);
  const [favoriteBooks, setFavoriteBooks] = useState<FavoriteBook[]>([]);
  const token: string | null = localStorage.getItem("token");
  const [userData, setUserData] = useState<UserData | null>(null);

  const handleFavorite = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    const favoriteDesc = document.getElementById(`favorite-desc-${bookId}`);
    const favoriteBtn = document.getElementById(`favorite-btn-${bookId}`);

    const favoriteData = {
      token,
      bookId,
    };

    if (favoriteDesc?.textContent === "Yêu thích" && favoriteBtn) {
      try {
        const response = await fetch("http://localhost:8080/book/favorite", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(favoriteData),
        });

        if (response.ok) {
          favoriteDesc.textContent = "Đã yêu thích";
          favoriteBtn.style.backgroundColor = "red";
        } else {
          const errorData = await response.json();
          console.error("Error adding to favorites:", errorData);
        }
      } catch (error) {
        console.error("An error occurred while adding to favorites:", error);
      }
    } else if (favoriteDesc?.textContent === "Đã yêu thích" && favoriteBtn) {
      try {
        const response = await fetch("http://localhost:8080/book/favorite", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(favoriteData),
        });

        if (response.ok) {
          favoriteDesc.textContent = "Yêu thích";
          favoriteBtn.style.backgroundColor = "blue";
        } else {
          const errorData = await response.json();
          console.error("Error removing from favorites:", errorData);
        }
      } catch (error) {
        console.error(
          "An error occurred while removing from favorites:",
          error
        );
      }
    }
  };

  useEffect(() => {
    if (token) {
      const user: UserData = jwtDecode(token);
      setUserData(user);
    }
  }, [token]);

  useEffect(() => {
    const fetchFavorite = async () => {
      if (userData?.userid) {
        try {
          const response = await fetch(
            `http://localhost:8080/book/favorite?userid=${userData.userid}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (response.ok) {
            const responseData = await response.json();
            setFavoriteBooks(responseData.favoriteBooks);
          }
        } catch (error) {
          console.error("An error occurred while fetching favorites:", error);
        }
      }
    };

    fetchFavorite();

    getAllImages(bookId)
      .then((imageData) => {
        setListImage(imageData);
        setIsLoad(false);
      })
      .catch((error) => {
        setIsError(error.message);
        setIsLoad(false);
      });
  }, [bookId, userData]);

  const isFavorite = favoriteBooks.some(
    (favorite) => favorite.bookId === bookId
  );

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
            style={{ backgroundColor: isFavorite ? "red" : "blue" }}
          >
            <i className="fa-solid fa-heart"></i>
            <span className="ms-1" id={`favorite-desc-${bookId}`}>
              {isFavorite ? "Đã yêu thích" : "Yêu thích"}
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default BookProps;
