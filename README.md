# AI-Driven Search Engine with Google Drive Integration

## Project Description
The AI-Driven Search Engine is a FastAPI application that integrates with Google Drive to retrieve files, process them, and leverage Mistral AI for answering user queries based on the content of these files. The application supports user authentication, query history tracking, and provides a streamlined interface for querying documents stored in a specified Google Drive folder.

## Features
- **User Authentication:** Register and login functionality to manage user sessions.
- **Google Drive Integration:** Retrieve files from a specified Google Drive folder.
- **PDF Text Extraction:** Extract text content from PDF files.
- **Semantic Search:** Use FAISS for efficient similarity search.
- **AI-Powered Query Answering:** Leverage Mistral AI to provide accurate answers to user queries based on the extracted content.
- **Query History Management:** Track user queries, grouping them by date and storing them in MongoDB.
- **Responsive Web Interface:** Simple UI for folder setup, query input, and viewing results.

## Prerequisites
- Python 3.8 or higher
- Google Cloud account with Drive API enabled
- Mistral AI account with API key
- HuggingFace Token
- MongoDB for storing user data and query history

## Setup Instructions

### Install Dependencies
Ensure Python is installed, then run:
```bash
pip install requirements.txt
```

### Google Cloud Setup
1. **Create a Google Cloud Project:**
   - Go to the [Google Cloud Console](https://console.cloud.google.com/).
   - Create a new project.
   - Enable the Google Drive API for your project.
2. **Create Service Account Credentials:**
   - Create service account credentials and download the JSON key file.
   - Place the service account JSON file in your project directory and name it `service_account_file.json`.

### Mistral AI Setup
- Register at [Mistral AI](https://mistral.ai/) and obtain an API key.

### MongoDB Setup
- Set up MongoDB locally or use MongoDB Atlas.
- Configure the connection URI in your project.

## Running the Application
Run the FastAPI application using Uvicorn:
```bash
uvicorn main:app --host 0.0.0.0 --port 80
```
This starts the FastAPI server. Access the application at: [http://127.0.0.1:80](http://127.0.0.1:80)

## Using the Application
1. Open your browser and go to: [http://127.0.0.1:80](http://127.0.0.1:80)
2. **Register/Login:** Create an account or log in.
3. **Set Folder ID:** Enter the Google Drive folder ID to access files.
4. **Submit Queries:** Ask questions about the folder's content and get AI-driven responses.
5. **View History:** All queries and responses are stored and grouped by date in MongoDB.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments
- [Google Drive API documentation](https://developers.google.com/drive)
- [Mistral AI documentation](https://mistral.ai/)
- [FastAPI documentation](https://fastapi.tiangolo.com/)

---
