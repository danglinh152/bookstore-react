import React, { useEffect, useState } from "react";
import Book from "../../../models/Book";
import { get3FirstBooks } from "../../../api/BookAPI";
import Carousel from "./CarouselProps";

const Banner: React.FC = () => {
  const [ListBook, setListBook] = useState<Book[]>([]);
  const [isLoad, setIsLoad] = useState(true);
  const [isError, setIsError] = useState<string | null>(null);

  useEffect(() => {
    get3FirstBooks()
      .then((bookData) => {
        setListBook(bookData.result);
        setIsLoad(false);
      })
      .catch((bookData) => {
        const error = new Error("Error");
        setIsError(error.message);
      });
  }, []);

  if (isLoad) {
    return (
      <div></div>
    );
  }
  if (isError) {
    return (
      <div>
        <h1> Error!! </h1>
      </div>
    );
  }

  return (
    <div className="container-fluid bg-dark p-2 mb-2">
      <div className="container d-flex">
        <div
          className="py-5 text-white d-flex justify-content-center align-items-center me-5"
          style={{ flex: "0 0 50%" }}
        >
          <div>
            <h1 className="display-5 fw-bold fs-1">
              {" "}
              Trên con đường thành công,
              <br />
              không có dấu chân của kẻ lười biếng.{" "}
            </h1>
            <p className="fw-bold mt-3 me-5">
              {" "}
              <i>Lỗ Tấn</i>{" "}
            </p>
            <a href="#list-product" className="btn btn-primary float-end">
              {" "}
              Khám phá sách ngay{" "}
            </a>
          </div>
        </div>
        <div style={{ flex: "0 0 50%" }}>
          <div className="container p-5">
            <div
              id="carouselBook"
              className="carousel slide"
              data-bs-ride="carousel"
              data-bs-interval="2000" // tự động chuyển slide sau 2 giây
              data-bs-pause="hover" // dừng carousel khi hover (tuỳ chọn)
            >
              <div className="carousel-inner mx-auto" style={{ width: "75%" }}>
                {(() => {
                  if (ListBook.length === 0) {
                    return <div className="carousel-item active">Null</div>;
                  } else {
                    return (
                      <div>
                        <div className="carousel-item active">
                          <Carousel
                            key={ListBook[0].getBookId()}
                            book={ListBook[0]}
                          />
                        </div>

                        {ListBook.slice(1).map((book) => (
                          <div className="carousel-item" key={book.getBookId()}>
                            <Carousel book={book} />
                          </div>
                        ))}
                      </div>
                    );
                  }
                })()}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselBook"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselBook"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
