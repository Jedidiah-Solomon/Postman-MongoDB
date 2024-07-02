document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM Content Loaded");

  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");
  const searchType = document.getElementById("searchType");
  const booksContainer = document.getElementById("booksContainer");
  let noResultsMessage = null;

  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const query = searchInput.value.trim();
    const type = searchType.value;

    booksContainer.innerHTML = "";
    if (noResultsMessage) {
      noResultsMessage.remove();
      noResultsMessage = null;
    }

    if (query) {
      fetch(`/books/search?${type}=${query}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((books) => {
          if (!Array.isArray(books) || books.length === 0) {
            noResultsMessage = document.createElement("div");
            noResultsMessage.className = "no-book-found";
            noResultsMessage.textContent = "Empty Bookshop, check later!!!";
            booksContainer.appendChild(noResultsMessage);
          } else {
            // Display books
            books.forEach((book) => {
              const bookElement = document.createElement("div");
              bookElement.className = "book";
              bookElement.innerHTML = `
                                <img src="${book.imgUrl}" alt="${book.title}">
                                <div>
                                    <h2>${book.title}</h2>
                                    <p>Author: ${book.author}</p>
                                    <p>Publisher: ${
                                      book.publication.publisher
                                    }</p>
                                    <p>Year: ${book.publication.year}</p>
                                    <p>Location: ${
                                      book.publication.location
                                    }</p>
                                    <p>Genres: ${book.genres.join(", ")}</p>
                                    <p>ID: ${book.custom_id}</p> 
                                </div>
                            `;
              booksContainer.appendChild(bookElement);

              console.log("Book Collection:", booksContainer);
            });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          if (error.message.includes("404")) {
            noResultsMessage = document.createElement("div");
            noResultsMessage.className = "no-book-found";
            noResultsMessage.textContent = "Book(s) Not Found";
            booksContainer.appendChild(noResultsMessage);
          } else {
            booksContainer.innerHTML = `<p>Error fetching books: ${error.message}</p>`;
          }
        });
    }
  });
});
