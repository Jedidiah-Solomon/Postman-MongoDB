document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM Content Loaded");

  fetch("/books")
    .then((response) => response.json())
    .then((books) => {
      const container = document.getElementById("booksContainer");
      books.forEach((book) => {
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book");
        bookDiv.innerHTML = `
                            <img src="${book.imgUrl}" alt="${book.title}" />
                            <div>
                                <h2>${book.title}</h2>
                                <p><strong>MongoDB ID:</strong> ${book._id}</p>
                                <p><strong>Author:</strong> ${book.author}</p>
                                <p><strong>Publication Year:</strong> ${
                                  book.publication.year
                                }</p>
                                <p><strong>Publication Place:</strong> ${
                                  book.publication.location
                                }</p>
                                <p><strong>Genres:</strong> ${book.genres.join(
                                  ", "
                                )}</p>
                            </div>
                        `;
        container.appendChild(bookDiv);
      });
    });
});
