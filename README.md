# Postman-MongoDB :smiley: :clap:

This repository is designed for testing the Book Search API using Postman. The server can be run locally or deployed to Render.

## Prerequisites

- Node.js
- npm (Node Package Manager)
- Postman

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/Jedidiah-Solomon/Postman-MongoDB.git
cd Postman-MongoDB
```

#### Host Image Free

`https://imgbb.com/`

### Render Site

`https://postman-mongodb.onrender.com/`

### Install Dependencies

`npm install`

### Run the Server

To run the server locally, use:

`npm start`
This will start the server using nodemon to automatically restart it if any changes are made.

### Test the API with Postman

Open Postman and use the following endpoints to test the API:

##### Search by Author

URL: `http://localhost:3000/books/search?author=James Dedon` or `https://postman-mongodb.onrender.com/books/search?author=James Dedon`
Method: GET

##### Search by Genre

URL: `http://localhost:3000/books/search?genre=Fiction`
Method: GET

##### Search by Custom ID

URL: `http://localhost:3000/books/search?custom_id=1`
Method: GET

### API Endpoints

Search Books
`GET /books/search`
Search for books based on different criteria.

Query Parameters:

author: Search by author's name (case insensitive).
genre: Search by genre (case insensitive).
year: Search by publication year.
custom_id: Search by custom ID (case insensitive).

Example Request:

`GET /books/search?author=James Dedon`
Example Response:

```
[
  {
    "title": "Example Book",
    "author": "James Dedon",
    "publication": {
      "year": 2023,
      "publisher": "Example Publisher",
      "location": "Example Location"
    },
    "genres": ["Fiction"],
    "custom_id": "1",
    "imgUrl": "http://example.com/book.jpg"
  }
]

```

### Error Handling

If no books are found for a given query, a 404 status code will be returned with a message:

Example Response:

```
{
  "message": "Books not found!"
}
```

### Deployment

Deploy to Render
To deploy your application to Render:

Create an account at Render.
Create a new Web Service and connect your GitHub repository.
Follow the instructions to deploy your server.
Note: Ensure your start script in package.json is correctly set up:

```
"scripts": {
  "start": "nodemon server.js"
}
```

### Contributing

Feel free to fork the repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

License
This project is licensed under the MIT License.

Feel free to modify this `README.md` file as needed for your specific requirements.

#### Test Review

```
http://localhost:3000/books/:id/reviews e.g http://localhost:3000/books/6684148a3ded25aca646402a/reviews
```

```
{
  "reviewer": "John Doe",
  "rating": 5,
  "comment": "This book was amazing!"
}
```

2. Delete `http://localhost:3000/books/:bookId/reviews/:reviewId` e.g
   `http://localhost:3000/books/668443326d7d77d11bb4a73e/reviews/6685361678fd6e336b855351`
