# CBMW App
Credit Balance Management A(w)plication \
By: Charles, Brian, Muhsin and Waed

---

## Running Instructions
- The React client and Flask server are to be run simultaneously

### Client
- Requirements
    - Node.js
    - npm
```bash
cd client
npm i
npm start
```

### Server
- Requirements
    - Python 3.X
    - virtualenv
        - `pip install virtualenv`
```bash
cd backend
virtualenv venv 

# Windows only
.\venv\Scripts\activate 

# MacOS only
.\venv\bin\activate

pip install -r requirements.txt
flask run
```