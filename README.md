# Postman-Tester :smiley: :clap:

This repository is designed for testing the Book Search API using Postman. The server can be run locally or deployed to Render.

## Prerequisites

- Node.js
- npm (Node Package Manager)
- Postman

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/Jedidiah-Solomon/Postman-Tester.git
cd Postman-Tester
```

#### Get Stock Image

`https://imgbb.com/`

### Render Site

`https://postman-tester.onrender.com/`

### Install Dependencies

`npm install`

### Run the Server

To run the server locally, use:

`npm start`
This will start the server using nodemon to automatically restart it if any changes are made.

### Test the API with Postman

Open Postman and use the following endpoints to test the API:

##### Search by Author

URL: `http://localhost:3000/books/search?author=James Dedon` or `https://postman-tester.onrender.com/books/search?author=James Dedon`
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
