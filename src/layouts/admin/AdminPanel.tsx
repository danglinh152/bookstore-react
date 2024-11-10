import React, { useState } from "react";

const AdminPanel: React.FC = () => {
  const [bookTitle, setBookTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const book = {
    bookTitle: bookTitle,
    author: author,
    genre: genre,
    description: description,
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    // Check if token exists and is valid
    if (!token) {
      alert("No token found!");
      return;
    }

    fetch("http://localhost:8080/book/add-book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(book),
    })
      .then((response) => {
        if (response.ok) {
          alert("Book added successfully!");
        } else {
          console.error("Error adding book:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });

    console.log({ bookTitle, author, genre, description });
  };

  return (
    <div>
      <h1>Tạo Quyển Sách Mới</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="bookTitle">Tên Sách:</label>
        <input
          type="text"
          id="bookTitle"
          value={bookTitle}
          onChange={(e) => setBookTitle(e.target.value)}
          required
        />

        <label htmlFor="author">Tác Giả:</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />

        <label htmlFor="genre">Thể Loại:</label>
        <input
          type="text"
          id="genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
        />

        <label htmlFor="description">Mô Tả:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <button type="submit">Tạo Sách</button>
      </form>
    </div>
  );
};

export default AdminPanel;
