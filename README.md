# Movie Catalouge

Welcome to **Movie Catalouge**! This web application allows users to explore movies, create personalized movie lists, and share them with others. Below you'll find the key features of the application, setup instructions, and more.

## Key Features

1. **User Authentication**: 
   - Secure user registration and login system.
   - Authentication is required to access the application features.

2. **Movie Search**:
   - After logging in, users are navigated to the home screen.
   - Users can search for movies using the search bar.
   - Movie details are fetched using the OMDB API and displayed to the user.

3. **Create Movie Lists**:
   - Users can create lists of movies.
   - Lists are displayed on the my list page.

4. **Public and Private Lists**:
   - Movie lists can be set as either public or private.
   - Public lists can be viewed by anyone with a UserId to the list.
   - Private lists can only be viewed by the creator.

## Technologies Used

- **Frontend**: 
  - Built using [Vite](https://vitejs.dev/), a fast and modern build tool for web applications.
  - React is used for building the user interface.

- **Backend**: 
  - Express.js for creating a RESTful API.
  - MongoDB for the database to store user information and movie lists.

## Installation

### Prerequisites

Ensure you have the following installed on your system:
- Node.js (v14 or later)
- MongoDB (you can use MongoDB Atlas or a local instance)

### Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/BadKarma99/movie_lib
   cd movie_lib
2. **Install Dependencies**:
    For frontend
      `cd client`
      `npm install`
     For Backend
      `cd ../server`
      `npm install`
   
