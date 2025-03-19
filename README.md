# Local Search with RAG Using Google Drive Integration

## Project Description
This project is designed to create a FastAPI application that interfaces with Google Drive to retrieve files, process them, and utilize Mistral AI to answer user queries based on the content of these files. The application allows setting a specific Google Drive folder to pull files from and enables querying through a web interface.

## Features
- **Google Drive Integration**: Retrieve files from a specified Google Drive folder.
- **PDF Text Extraction**: Extract text content from PDF files.
- **Semantic Search**: Use FAISS for efficient similarity search.
- **AI-Powered Query Answering**: Leverage Mistral AI to answer user queries based on the extracted content.

## Prerequisites
- Python 3.8 or higher
- Google Cloud account with Drive API enabled
- Mistral AI account with API key
- Langchain
- HuggingFace Token

## Setup Instructions

### Install Dependencies
First, ensure you have Python installed. Then, install the required libraries:

```bash
pip install --upgrade google-api-python-client google-auth-httplib2 google-auth-oauthlib langchain mistralai fastapi uvicorn chromadb faiss-cpu unstructured langchain-community ipywidgets huggingface_hub nest_asyncio
```

### Google Cloud Setup
**Create a Google Cloud Project:**
1. Go to the Google Cloud Console.
2. Create a new project.
3. Enable the Google Drive API for your project.

**Create Service Account Credentials:**
1. Create service account credentials and download the JSON key file.
2. Place the service account JSON file in your project directory and name it `service_account_file.json`.

### Mistral AI Setup
Register at Mistral AI and obtain an API key.

## Running the Application
Run the FastAPI application using Uvicorn:

```bash
uvicorn main:app --host 0.0.0.0 --port 80
```

This command will start the FastAPI server, and you can access the application at [http://127.0.0.1:8000](http://127.0.0.1:8000).

## Using the Application
1. Open your browser and go to [http://127.0.0.1:8000](http://127.0.0.1:8000).
2. Set the Google Drive folder ID using the form.
3. Submit queries through the query form.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments
- [Google Drive API documentation](https://developers.google.com/drive)
- [Mistral AI documentation](https://mistral.ai/docs)
- [FastAPI documentation](https://fastapi.tiangolo.com/)
