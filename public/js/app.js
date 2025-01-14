// document.addEventListener("DOMContentLoaded", () => {
//   const bookList = document.querySelector("#book-list tbody");

//   // Fetch and display books
//   function fetchBooks() {
//     fetch("/api/books/get")
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.success) {
//           bookList.innerHTML = ""; // Clear the current list before displaying new data
//           data.data.forEach((book) => {
//             const row = document.createElement("tr");
//             row.innerHTML = `
//               <td>${book.title}</td>
//               <td>${book.author}</td>
//               <td>${book.year}</td>
//             `;
//             bookList.appendChild(row);
//           });
//         } else {
//           alert(data.message);
//         }
//       })
//       .catch((error) => console.error("Error fetching books:", error));
//   }

//   // Fetch books if bookList exists
//   if (bookList) fetchBooks();

//   // Add new book
//   const addBookForm = document.getElementById("add-book-form");
//   if (addBookForm) {
//     addBookForm.addEventListener("submit", (e) => {
//       e.preventDefault();

//       const title = document.getElementById("title").value.trim();
//       const author = document.getElementById("author").value.trim();
//       const year = parseInt(document.getElementById("year").value);

//       // Validate the form inputs
//       if (!title || !author || isNaN(year) || year < 1000 || year > new Date().getFullYear()) {
//         alert("Please provide valid book details.");
//         return;
//       }

//       const bookData = { title, author, year };

//       fetch("/api/books/add", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(bookData),
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           if (data.success) {
//             alert("Book added successfully!");
//             addBookForm.reset(); // Reset form inputs after successful addition
//             fetchBooks(); // Refresh the book list after adding a new book
//           } else {
//             alert(data.message);
//           }
//         })
//         .catch((error) => console.error("Error adding book:", error));
//     });
//   }
// });

document.addEventListener("DOMContentLoaded", () => {
  const bookList = document.querySelector("#book-list tbody");

  // Fetch and display books
  function fetchBooks() {
    fetch("/api/books/get")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          bookList.innerHTML = ""; // Clear existing content
          data.data.forEach((book) => {
            const row = document.createElement("tr");
            row.innerHTML = `
              <td>${book.title}</td>
              <td>${book.author}</td>
              <td>${book.year}</td>
              <td>
                <button class="update-btn" data-id="${book._id}">Update</button>
                <button class="delete-btn" data-id="${book._id}">Delete</button>
              </td>
            `;
            bookList.appendChild(row);
          });

          // Attach event listeners for delete and update
          attachEventListeners();
        } else {
          alert(data.message);
        }
      })
      .catch((error) => console.error("Error fetching books:", error));
  }

  const addBookForm = document.getElementById("add-book-form");
  if (addBookForm) {
    addBookForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const title = document.getElementById("title").value.trim();
      const author = document.getElementById("author").value.trim();
      const year = parseInt(document.getElementById("year").value);

      // Validate the form inputs
      if (!title || !author || isNaN(year) || year < 1000 || year > new Date().getFullYear()) {
        alert("Please provide valid book details.");
        return;
      }

      const bookData = { title, author, year };

      fetch("/api/books/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert("Book added successfully!");
            addBookForm.reset(); // Reset form inputs after successful addition
            fetchBooks(); // Refresh the book list after adding a new book
          } else {
            alert(data.message);
          }
        })
        .catch((error) => console.error("Error adding book:", error));
    });
    }

  function attachEventListeners() {
    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", (e) => {
        const bookId = e.target.getAttribute("data-id");
        deleteBook(bookId);
      });
    });

    document.querySelectorAll(".update-btn").forEach((button) => {
      button.addEventListener("click", (e) => {
        const bookId = e.target.getAttribute("data-id");
        updateBook(bookId);
      });
    });
  }

  function deleteBook(bookId) {
    fetch(`/api/books/delete/${bookId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Book deleted successfully!");
          fetchBooks(); // Refresh the book list
        } else {
          alert(data.message);
        }
      })
      .catch((error) => console.error("Error deleting book:", error));
  }

  function updateBook(bookId) {
    fetch(`/api/books/get/${bookId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const currentBook = data.data;
  
          // Prompt user to update fields, showing current values as default
          const newTitle = prompt("Enter new title:", currentBook.title) || currentBook.title;
          const newAuthor = prompt("Enter new author:", currentBook.author) || currentBook.author;
          const newYear = prompt("Enter new year:", currentBook.year) || currentBook.year;
  
          const updatedBookData = {
            title: newTitle,
            author: newAuthor,
            year: parseInt(newYear),
          };
  
          fetch(`/api/books/update/${bookId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedBookData),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.success) {
                alert("Book updated successfully!");
                fetchBooks(); // Refresh the book list
              } else {
                alert(data.message);
              }
            })
            .catch((error) => console.error("Error updating book:", error));
        } else {
          alert("Failed to fetch current book details.");
        }
      })
      .catch((error) => console.error("Error fetching book:", error));
  }
  

  // Fetch books on page load
  fetchBooks();
});
