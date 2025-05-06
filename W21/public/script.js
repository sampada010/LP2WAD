const bookForm = document.getElementById("bookForm");
const bookTable = document.getElementById("bookTable");
const bookCount = document.getElementById("bookCount");

async function fetchBooks() {
  const res = await fetch("/api/books");
  const books = await res.json();
  bookCount.textContent = books.length;

  bookTable.innerHTML = "";
  books.forEach(book => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td><input value="${book.title}" data-id="${book._id}" class="edit-title"/></td>
      <td><input value="${book.author}" data-id="${book._id}" class="edit-author"/></td>
      <td><input type="number" value="${book.price}" data-id="${book._id}" class="edit-price"/></td>
      <td><input value="${book.genre}" data-id="${book._id}" class="edit-genre"/></td>
      <td>
        <button class="edit" onclick="updateBook('${book._id}')">Update</button>
        <button class="delete" onclick="deleteBook('${book._id}')">Delete</button>
      </td>
    `;

    bookTable.appendChild(row);
  });
}

bookForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const price = +document.getElementById("price").value;
  const genre = document.getElementById("genre").value.trim();

  if (title && author && price && genre) {
    await fetch("/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, author, price, genre }),
    });
    bookForm.reset();
    fetchBooks();
  }
});

async function updateBook(id) {
  const title = document.querySelector(`.edit-title[data-id="${id}"]`).value;
  const author = document.querySelector(`.edit-author[data-id="${id}"]`).value;
  const price = document.querySelector(`.edit-price[data-id="${id}"]`).value;
  const genre = document.querySelector(`.edit-genre[data-id="${id}"]`).value;

  await fetch(`/api/books/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, author, price, genre }),
  });

  fetchBooks();
}

async function deleteBook(id) {
  await fetch(`/api/books/${id}`, {
    method: "DELETE",
  });

  fetchBooks();
}

fetchBooks();
