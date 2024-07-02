document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM Content Loaded");

  const form = document.getElementById("addBookForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const custom_id = document.getElementById("custom_id").value;
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const imgUrl = document.getElementById("imgUrl").value;
    const publisher = document.getElementById("publisher").value;
    const year = document.getElementById("year").value;
    const location = document.getElementById("location").value;
    const genres = document
      .getElementById("genres")
      .value.split(",")
      .map((genre) => genre.trim());

    const newBook = {
      custom_id,
      title,
      author,
      imgUrl,
      publication: {
        publisher,
        year,
        location,
      },
      genres,
    };

    // Log newBook
    console.log("New Book Object:", newBook);

    fetch("/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((book) => {
        alert(
          `Book added successfully!\nTitle: ${book.title}\nAuthor: ${book.author}`
        );
        form.reset();
      })
      .catch((error) => {
        console.error("Error adding book:", error);
        alert("Failed to add book. Please try again.");
      });
  });
});
