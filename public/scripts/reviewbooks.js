document.addEventListener("DOMContentLoaded", () => {
  fetch("/books")
    .then((response) => response.json())
    .then((books) => {
      const container = document.getElementById("booksContainer");
      books.forEach((book) => {
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book");
        bookDiv.innerHTML = `
            <img src="${book.imgUrl}" alt="${book.title}">
            <h2>${book.title}</h2>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Publication Year:</strong> ${book.publication.year}</p>
            <p><strong>Publication Place:</strong> ${
              book.publication.location
            }</p>
            <p><strong>Genres:</strong> ${book.genres.join(", ")}</p>
            <div class="reviews">
              <h3>Reviews:</h3>
              <ul class="review-box">
                ${book.reviews
                  .map(
                    (review) => `
                  <li class="review" data-review-id="${review._id}">
                    <p><strong>${review.reviewer}</strong> (${
                      review.rating
                    }/5): ${review.comment}</p>
                    <button class="like-button">Like <span class="like-count">${
                      review.likes || 0
                    }</span></button>
                    <button class="delete-review-button">Delete</button>
                  </li>`
                  )
                  .join("")}
              </ul>
            </div>
            <div class="review-accordion">
              <h3 class="accordion-toggle">Add a Review:</h3>
              <div class="review-form">
                <input type="text" placeholder="Reviewer" class="reviewer">
                <input type="number" placeholder="Rating" class="rating" min="1" max="5">
                <textarea placeholder="Comment" class="comment"></textarea>
                <button class="add-review-button">Add Review</button>
              </div>
            </div>
          `;
        container.appendChild(bookDiv);

        const addReviewButton = bookDiv.querySelector(".add-review-button");
        addReviewButton.addEventListener("click", () => {
          const reviewer = bookDiv.querySelector(".reviewer").value.trim();
          const rating = bookDiv.querySelector(".rating").value.trim();
          const comment = bookDiv.querySelector(".comment").value.trim();

          // Validate inputs
          if (!reviewer || !rating || !comment) {
            alert("All fields are required. Please fill in all fields.");
            return;
          }

          fetch(`/books/${book._id}/reviews`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ reviewer, rating, comment }),
          })
            .then((response) => response.json())
            .then((updatedBook) => {
              alert("Review added successfully!");
              window.location.reload();
            })
            .catch((error) => {
              console.error("Error adding review:", error);
              alert("Failed to add review. Please try again.");
            });
        });

        const deleteReviewButtons = bookDiv.querySelectorAll(
          ".delete-review-button"
        );
        deleteReviewButtons.forEach((button) => {
          button.addEventListener("click", (event) => {
            const reviewId = event.target.closest(".review").dataset.reviewId;
            fetch(`/books/${book._id}/reviews/${reviewId}`, {
              method: "DELETE",
            })
              .then((response) => response.json())
              .then((updatedBook) => {
                alert("Review deleted successfully!");
                window.location.reload();
              })
              .catch((error) => {
                console.error("Error deleting review:", error);
                alert("Failed to delete review. Please try again.");
              });
          });
        });

        const likeButtons = bookDiv.querySelectorAll(".like-button");
        likeButtons.forEach((button) => {
          button.addEventListener("click", (event) => {
            const reviewId = event.target.closest(".review").dataset.reviewId;
            const likeCountSpan = event.target.querySelector(".like-count");

            fetch(`/books/${book._id}/reviews/${reviewId}/like`, {
              method: "POST",
            })
              .then((response) => response.json())
              .then((updatedReview) => {
                likeCountSpan.textContent = updatedReview.likes;
              })
              .catch((error) => {
                console.error("Error liking review:", error);
                alert("Failed to like review. Please try again.");
              });
          });
        });

        // Toggle review form visibility
        const accordionToggle = bookDiv.querySelector(".accordion-toggle");
        const reviewForm = bookDiv.querySelector(".review-form");
        accordionToggle.addEventListener("click", () => {
          reviewForm.classList.toggle("active");
        });
      });
    });
});
