import React, { ChangeEvent, useEffect, useState } from "react";
import Image from "../../../models/Image";
import { getAllImages } from "../../../api/ImageAPI";

interface BookImagesInterface {
  bookId: number;
}
const BookImages: React.FC<BookImagesInterface> = ({ bookId }) => {
  const [listImage, setListImage] = useState<Image[]>([]);
  const [imageIcon, setImageIcon] = useState<Image>();
  const [isLoad, setIsLoad] = useState(true);
  const [isError, setIsError] = useState<string | null>(null);
  useEffect(() => {
    getAllImages(bookId)
      .then((imageData) => {
        setListImage(imageData);
        setImageIcon(imageData[0]);
        setIsLoad(false);
      })
      .catch((imageData) => {
        const error = new Error("Error");
        setIsError(error.message);
      });
  }, [bookId]);

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

  const clickBookImage = (index: number) => {
    setImageIcon(listImage[index]);
  };

  return (
    <div>
      <div>
        <img
          className="object-fit-cover rounded w-100"
          src={(() => {
            if (listImage && listImage.length > 0) {
              if (imageIcon) {
                return imageIcon.getData();
              } else {
                return listImage[0].getData();
              }
            } else {
              return "./images/image-pending.jpg";
            }
          })()}
          alt="Card image"
          style={{ height: "350px" }}
        />
      </div>

      <div
        className="carousel-details mt-2 row gap-3 flex-nowrap pb-2"
        style={{ overflowX: "auto", overflowY: "hidden" }}
      >
        {listImage && listImage.length > 0 ? (
          listImage.map((image, index) => (
            <div className="col-2 img-block" key={index}>
              <img
                className="object-fit-cover rounded"
                src={image.getData()}
                alt="Card image"
                style={{ height: "50px", width: "50px" }}
                onClick={() => clickBookImage(index)}
              />
            </div>
          ))
        ) : (
          <div className="col-2">
            <img
              className="object-fit-cover rounded"
              src="./images/image-pending.jpg"
              alt="Card image"
              style={{ height: "50px", width: "50px" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BookImages;
