import React, { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllBooks, getBookByBookId } from "../../api/BookAPI";
import Book from "../../models/Book";
import BookRecommend from "./components/BookRecommend";
import { PaginationRecommend } from "../utils/PaginationRecommend";
import BookImages from "./components/BookImages";
import BookFeedbacks from "./components/BookFeedbacks";
import FeedbackSection from "./components/FeedbackSection";
import { jwtDecode } from "jwt-decode";

interface FavoriteBook {
  bookId: number;
}

interface UserData {
  avatar?: string; // Use optional chaining if the property might not exist
  name?: string;
  userid?: number;
  // Add other properties as needed
}

export function BookDetail() {
  const bookParam = useParams<{ bookId: string }>();

  let bookId = 0;
  try {
    bookId = parseInt(bookParam.bookId + "", 10);
    if (Number.isNaN(bookId)) {
      bookId = 0;
    }
  } catch (error) {
    console.log(error);
  }

  const [book, setBook] = useState<Book>();
  const [quantity, setQuantity] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [listBook, setListBook] = useState<Book[]>([]);
  const [isLoad, setIsLoad] = useState<boolean>(true);
  const [isError, setIsError] = useState<string | null>(null);
  const [expand, setExpand] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalBooks, setTotalBooks] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  const [favoriteBooks, setFavoriteBooks] = useState<FavoriteBook[]>([]);
  const token: string | null = localStorage.getItem("token");
  const [userData, setUserData] = useState<UserData | null>(null);
  const pagination = (page: number) => {
    setCurrentPage(page);
  };

  const handleFavorite = async (event: React.MouseEvent<HTMLSpanElement>) => {
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
  const isFavorite = favoriteBooks.some(
    (favorite) => favorite.bookId === bookId
  );

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

    getAllBooks(currentPage)
      .then((bookData) => {
        setListBook(bookData.result);
        setTotalBooks(bookData.totalBooks);
        setTotalPages(bookData.totalPages);
        setIsLoad(false);
      })
      .catch((error) => {
        console.log(error.message);
        setIsError(error.message);
      });

    getBookByBookId(bookId)
      .then((bookData) => {
        setBook(bookData);
        setTotal(bookData?.getSellingPrice() ?? 0);
        setIsLoad(false);
      })
      .catch((error) => {
        console.log(error.message);
        setIsError(error.message);
      });
  }, [bookId, currentPage, userData]);

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
  if (!book) {
    return (
      <div>
        <h1> Not Found </h1>
      </div>
    );
  }

  const clickDown = function () {
    var number = 0;
    if (quantity === 0) {
      setQuantity(0);
    } else {
      setQuantity(quantity - 1);
      number = parseFloat((total - (book?.getSellingPrice() ?? 0)).toFixed(2));
    }

    setTotal(number);
  };

  const clickUp = function () {
    setQuantity(quantity + 1);
    let number = parseFloat(
      (total + (book?.getSellingPrice() ?? 0)).toFixed(2)
    );
    setTotal(number);
  };

  const changeQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    let numberQuantity = parseFloat(e.target.value);
    if (numberQuantity < 0) {
      setQuantity(0);
      setTotal(0);
    } else if (Number.isNaN(numberQuantity)) {
      setQuantity(0);
      setTotal(0);
    } else {
      setQuantity(parseFloat(e.target.value));

      setTotal(
        parseFloat(
          ((book?.getSellingPrice() ?? 0) * parseFloat(e.target.value)).toFixed(
            2
          )
        )
      );
    }
  };

  const expandDesc = function () {
    if (expand) {
      const block = document.getElementById("desc-block");
      const containerBlock = document.getElementById("container-desc");
      if (block && containerBlock) {
        block.style.height = "250px";
        containerBlock.style.position = "relative"; // Đảm bảo phần tử cha có position relative
        const style = document.createElement("style");
        document.head.appendChild(style);

        // Thêm CSS cho pseudo-element
        if (style) {
          style.sheet?.insertRule(
            `
                        .container-desc::before {
  content: ''; !important
  position: absolute; !important
  top: 0; !important
  left: 0; !important
  right: 0; !important
  bottom: 0; !important
  background: linear-gradient(rgba(255, 255, 255, 0), rgb(255, 255, 255)); !important
  z-index: 0; !important
  /* Đặt pseudo-element phía dưới nội dung */
}
                    `,
            style.sheet.cssRules.length
          );
        }
        setExpand(false);
      }
    } else {
      const block = document.getElementById("desc-block");
      const containerBlock = document.getElementById("container-desc");
      if (block && containerBlock) {
        block.style.height = "";
        block.style.position = "static";

        const style = document.createElement("style");
        document.head.appendChild(style);

        // Thêm CSS cho pseudo-element
        if (style) {
          console.log("ok");

          style.sheet?.insertRule(
            `
                        .container-desc::before{
                        content: none; !important
}
                    `,
            style.sheet.cssRules.length
          );
        }

        setExpand(true);
      }
    }
  };

  return (
    <div className="container-fluid">
      <div className="container p-5">
        <div className="row">
          <div className="col-9 row">
            <div className="row mb-3">
              <div
                className="col-4 p-2 rounded bg-white sticky-element"
                style={{ maxHeight: "590px" }}
              >
                <div className="imageBook mt-2">
                  <BookImages bookId={bookId} />
                </div>

                <div className="desc mt-2 ms-2">
                  <p className="fs-3 fw-bold"> Đặc điểm nổi bật </p>
                  <ul>
                    <li>Tác giả: {book?.getAuthor()}</li>
                    <li>{book?.getDescription()}</li>
                    <li>Mã ISBN: {book?.getIsbn()}</li>
                  </ul>
                </div>
              </div>

              <div className="col-8">
                <div className="bg-white rounded p-3 mb-2">
                  <h2 className="fs-5 fw-bold line-clamp">
                    {book?.getTitle()}
                  </h2>
                  <p className="line-clamp-desc mb-3">
                    {book?.getDescription()}
                  </p>
                  <div className="d-flex align-items-center gap-1 mb-2">
                    <p className="line-clamp-desc fw-bold mb-0">
                      {book?.getAvgRate()?.toPrecision(2)}
                    </p>
                    <div className="star d-flex">
                      {(() => {
                        const star = [];
                        let avgRate = book?.getAvgRate() ?? 0;
                        while (avgRate >= 1) {
                          star.push(
                            <i className="fa-solid text-warning fa-star"></i>
                          );
                          avgRate -= 1;
                        }
                        if (avgRate > 0) {
                          star.push(
                            <i
                              className="fa-solid fa-star text-warning overflow-hidden"
                              style={{ width: `calc(16.8px * ${avgRate})` }}
                            ></i>
                          );
                        }
                        return star;
                      })()}
                    </div>
                  </div>
                  <div className="d-flex gap-1">
                    <p className=" fs-6 text-decoration-line-through fst-italic">
                      {book?.getListPrice()}$
                    </p>
                    <p className=" fs-5 fw-bold">{book?.getSellingPrice()}$</p>
                  </div>
                  <div className="d-flex gap-4">
                    <a
                      className="btn btn-primary"
                      id={`favorite-btn-${bookId}`}
                      onClick={handleFavorite}
                      style={{ backgroundColor: isFavorite ? "red" : "blue" }} // Change color based on favorite status
                    >
                      <i className="fa-solid fa-heart"></i>
                      <span className="ms-1" id={`favorite-desc-${bookId}`}>
                        {isFavorite ? "Đã yêu thích" : "Yêu thích"}
                      </span>
                    </a>
                  </div>
                </div>
                <hr />
                <div className="bg-white rounded mt-3 p-3">
                  <h2 className="fs-5">Thông tin chi tiết</h2>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: book?.getInfoDetails() + "",
                    }}
                  ></div>
                </div>
                <hr />
                <div className="bg-white rounded mt-3 p-3">
                  <div id="container-desc" className="container-desc">
                    <div
                      id="desc-block"
                      className="overflow-hidden backdrop"
                      style={{ height: "250px" }}
                    >
                      <h2 className="fs-5 mb-4">Mô tả chi tiết</h2>
                      <p className="fs-6"> {book?.getDescriptionDetails()} </p>
                    </div>
                  </div>

                  <div className="mt-2">
                    {(() => {
                      if (expand) {
                        return (
                          <button
                            className="btn mx-auto d-block text-primary"
                            style={{ border: "none" }}
                            onClick={expandDesc}
                          >
                            Thu gọn...
                          </button>
                        );
                      } else {
                        return (
                          <button
                            className="btn mx-auto d-block text-primary"
                            style={{ border: "none" }}
                            onClick={expandDesc}
                          >
                            Mở Rộng...
                          </button>
                        );
                      }
                    })()}
                  </div>
                </div>
                <hr />
                <div className="bg-white rounded mt-3 p-3 pb-0">
                  <h2 className="fs-5">Sản phẩm tương tự</h2>
                  <div className="row pt-2">
                    {listBook.map((book) => (
                      <div className="col-4 mb-3">
                        <BookRecommend key={book.getBookId()} book={book} />
                      </div>
                    ))}
                    <div className="mt-4">
                      <PaginationRecommend
                        totalPages={totalPages}
                        currentPage={currentPage}
                        pagination={pagination}
                        totalBooks={totalBooks}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row pe-4">
              <div className="col-12 bg-white rounded p-3 pt-4">
                <h2 className="fs-4"> Khách hàng đánh giá </h2>
                <div className="row">
                  <div className="col-4">
                    <p className="ms-2 m-1" style={{ fontWeight: "400" }}>
                      {" "}
                      Tổng quan{" "}
                    </p>
                    <div className="rating d-flex align-items-center gap-2">
                      <h3 className="fs-2 ms-2">{book?.getAvgRate()}</h3>
                      {(() => {
                        const star = [];
                        let avgRate = book?.getAvgRate() ?? 0;
                        while (avgRate >= 1) {
                          star.push(
                            <i className="fa-solid text-warning fa-star"></i>
                          );
                          avgRate -= 1;
                        }
                        if (avgRate > 0) {
                          star.push(
                            <i
                              className="fa-solid fa-star text-warning overflow-hidden"
                              style={{ width: `calc(16.8px * ${avgRate})` }}
                            ></i>
                          );
                        }
                        return star;
                      })()}
                    </div>
                  </div>
                  <div className="col-8 support border-start">
                    <h2 className="fs-6">Tổng hợp các đánh giá mới nhất</h2>
                    <BookFeedbacks bookId={book.getBookId()} />
                  </div>
                </div>
                <FeedbackSection bookId={book.getBookId()} />
              </div>
            </div>
          </div>

          <div
            className="col-3 d-flex flex-column gap-2 bg-white rounded p-2 sticky-element"
            style={{ height: "370px" }}
          >
            <div className="d-flex gap-3 align-items-center">
              <img
                src="data:image/png;base64,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"
                alt="admin"
                style={{ height: "50px" }}
              />
              <p className="fw-bold"> Linh's Bookstore </p>
            </div>
            <hr />

            <div className="quantity-block">
              <h3 className="fs-6 ms-3"> Số lượng </h3>
              <div className="d-flex align-items-center gap-1 ms-3 mb-3">
                <button className="btn btn-outline-dark" onClick={clickDown}>
                  -
                </button>
                <input
                  className="rounded text-center border border-dark"
                  contentEditable={true}
                  onInput={changeQuantity}
                  value={quantity}
                  type="text"
                  name="quantity"
                  id="quantity"
                  style={{ width: "35px", height: "35px" }}
                />
                <button className="btn btn-outline-dark" onClick={clickUp}>
                  +
                </button>
              </div>
            </div>

            <div className="total-block ms-3">
              <h3 className="fs-6"> Tạm tính </h3>
              <h3> {total + "$"}</h3>
            </div>

            <button className="btn btn-danger mx-3">Mua Ngay</button>
            <button className="btn btn-outline-primary mx-3">
              Thêm Vào Giỏ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
