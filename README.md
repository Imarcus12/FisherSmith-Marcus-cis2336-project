# ArtConnect

ArtConnect is a full-stack web application developed as a semester project for CIS 2336 at the University of Houston by Marcus Fisher.

The website provides a platform where users can explore artwork, browse upcoming art events, submit artwork information, and learn more about the ArtConnect community.

The project includes a front-end built with HTML, CSS, and JavaScript and a back-end built with Node.js and Express.

---

## Features

- Professional homepage
- Consistent navigation across all pages
- Gallery displaying six featured artworks
- Search, filtering, and sorting functionality
- Interactive artwork detail popups
- Events page displaying upcoming art events
- Dynamic event detail popups
- Artist submission form
- Client-side form validation
- Server-side processing of artwork submissions
- Temporary storage of artwork submissions
- GET and POST request handling
- Frequently Asked Questions page
- Expandable and collapsible FAQ section
- Multimedia content
- References page documenting image, multimedia, external, and AI sources

---

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Node.js
- Express.js
- Visual Studio Code
- Git
- GitHub

---

## Project Structure

```text
FisherSmith-Marcus-cis2336-project/
│
├── backend/
│   └── server.js
│
├── frontend/
│   ├── index.html
│   │
│   ├── css/
│   │   └── style.css
│   │
│   ├── js/
│   │   └── script.js
│   │
│   ├── images/
│   │
│   └── pages/
│       ├── gallery.html
│       ├── events.html
│       ├── submission.html
│       ├── faq.html
│       └── references.html
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

## Website Pages

### Home

The homepage serves as the main entry point for ArtConnect. It includes an introduction to the website, featured artwork, featured events, multimedia content, and developer contact information.

### Gallery

The Gallery page displays six featured artworks. Each artwork includes:

- Image
- Artwork title
- Artist name
- Category
- Price or "Not for Sale" status

JavaScript provides additional functionality including:

- Artwork search
- Category filtering
- Price and title sorting
- Dynamic artwork details
- Artwork detail popups

### Events

The Events page displays upcoming art events. Each event includes:

- Event title
- Date
- Location
- Description
- Event image

JavaScript is used to dynamically display additional event information.

### Artist Submission

The Artist Submission page allows artists to provide:

- Artist name
- Email address
- Artwork title
- Category
- Price
- Description

Client-side JavaScript validation checks the required fields before the information is submitted to the server.

### FAQ

The FAQ page contains frequently asked questions about ArtConnect.

JavaScript allows users to expand and collapse individual questions to easily show or hide their answers.

### References

The References page documents resources used during development, including:

- Image sources
- Multimedia sources
- External development resources
- AI tools and prompts used during development

---

# Back-End

## Overview

The ArtConnect back-end is built using Node.js and Express.js.

The server processes artwork submissions from the Artist Submission page and temporarily stores the submitted information in a JavaScript array.

No database is used during this phase of the project. Because the information is stored in memory, submitted artwork is removed whenever the server is stopped or restarted.

---

## Back-End Features

The back-end provides the following functionality:

- Runs an Express web server
- Serves the ArtConnect front-end files
- Accepts artwork submission form data
- Handles GET requests
- Handles POST requests
- Processes submitted artwork information
- Temporarily stores submissions in a JavaScript array
- Returns a confirmation message after a successful submission

---

## API Routes

### GET `/api/artworks`

Returns all artwork submissions currently stored in the server's temporary JavaScript array.

Example response:

```json
[
    {
        "artistName": "Marcus Fisher",
        "artistEmail": "msfisher@cougarnet.uh.edu",
        "artworkTitle": "Houston at Sunset",
        "artworkCategory": "Photography",
        "artworkPrice": "250",
        "artworkDescription": "A photograph of the Houston skyline."
    }
]
```

### POST `/submit-artwork`

Receives artwork information submitted through the Artist Submission form.

The server processes:

- Artist name
- Email address
- Artwork title
- Category
- Price
- Description

After receiving the information, the server adds the artwork submission to the temporary array and returns a confirmation message to the user.

---

## Temporary Data Storage

Artwork submissions are stored in a JavaScript array on the server.

This storage is temporary. All submitted information is removed when the Node.js server is stopped or restarted.

A database is not used for this phase of the project.

---

## How to Run the Project

### 1. Clone the Repository

```bash
git clone https://github.com/Imarcus12/FisherSmith-Marcus-cis2336-project.git
```

### 2. Open the Project

Open the project folder in Visual Studio Code.

### 3. Install Dependencies

From the root directory of the project, run:

```bash
npm install
```

This installs the dependencies listed in `package.json`, including Express.

### 4. Start the Server

Run:

```bash
node backend/server.js
```

The terminal should display:

```text
ArtConnect server running at http://localhost:3000
```

### 5. Open ArtConnect

Open the following address in a web browser:

```text
http://localhost:3000
```

Because the project uses a Node.js and Express back-end, the website should be accessed through the Express server rather than VS Code Live Server when testing back-end functionality.

---

## Testing the Back-End

### Testing the POST Request

1. Start the Node.js server.
2. Open the Artist Submission page.
3. Complete all required fields.
4. Click **Submit Artwork**.
5. A successful submission should return a confirmation message.

### Testing the GET Request

After submitting an artwork, open:

```text
http://localhost:3000/api/artworks
```

The browser should display the artwork information currently stored by the server.

---

## Client-Side Validation

Before an artwork submission is sent to the server, JavaScript validates the form.

Validation includes:

- Required field validation
- Email address validation
- Numeric price validation
- Negative price prevention
- Description validation
- User-friendly error messages

---

## Author

**Marcus Fisher**

University of Houston

CIS 2336 Semester Project