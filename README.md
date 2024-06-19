# Team-59 - Code-a-Cola
# VOPA Teaching Assessment Automation

## Project Overview
This project aims to automate the assessment process for teachers at VOPA (Vowels of The People Association), an NGO focused on providing education to underprivileged children. The solution leverages machine learning models, audio-to-text recognition, and various text processing techniques to evaluate teacher assessments efficiently.

## Technologies Used
- Machine Learning Models: Utilized machine learning models for automated assessment, including Longest Common Sequence (LCS), TFIDF (Term Frequency-Inverse Document Frequency), and Spacy for natural language processing.
- Audio-to-Text Recognition: Implemented audio-to-text recognition for converting spoken assessments into text for further analysis.
- Flask: Used Flask, a Python web framework, to connect the backend machine learning models with the frontend developed in React.
- MongoDB: Employed MongoDB, a NoSQL database, to store teacher login/signup information securely.

## Features
- Automated Assessment: Provides automated assessment of teacher evaluations using machine learning models, reducing manual effort and improving efficiency.
- User Authentication: Implements user authentication for teachers, ensuring secure access to the platform.
- Data Storage: Stores assessment data securely in a MongoDB database, allowing for easy retrieval and analysis.
- User Interface: Offers a user-friendly interface developed in React for easy interaction with the assessment system.


## Installation
1. Clone the repository: 
   ```bash
   git clone https://github.com/cfgmumbai24/Team-59.git
   ```
   ```bash
   cd TEAM 59
   ```
2. Install frontend dependencies: 
    ```bash
   cd client
   ```
   ```bash
   npm install
   ```
3. Install Python backend dependencies:
    ```bash
    cd ml_model
    ```
    Create a Virtual Environment (For MacOS)
     ```bash
    python3 -m venv myenv
    ```
      ```bash
    source myenv/bin/activate
    ```
    ```bash
    pip install -r requirements.txt
    ```
5. Configure MongoDB: 
   - Set up a MongoDB database.
   - Update the connection string in the .env file in the server folder.
6. Run the Flask application: 
   ```bash
   python app.py
   ```
7. Run the React frontend: 
   ```bash
   npm start
   ```
   For building the Frontend
   ```bash
   npm run build
   ```
8. Run the backend: 
   ```bash
   node app.js
   ```
   If you have nodemon installed
   ```bash
   nodemon app.js
   ```

Make sure to follow these steps in order to properly set up and run the VOPA Teaching Assessment Automation project.
## Usage
1. Sign up or log in as a teacher.
2. Automated assessments through audio.
3. View automated assessment results based on LCS, TFIDF, and Spacy.
4. Track assessment history and progress over time.

---
![image](https://github.com/harshnayangithub/Navjeevan/assets/126700987/c0995c6e-4929-4962-831a-dcb16eeb6032)
![image](https://github.com/harshnayangithub/Navjeevan/assets/126700987/4ea7753d-0ce5-4900-8b2b-9363a018568f)
![image](https://github.com/harshnayangithub/Navjeevan/assets/126700987/fdae9aaa-d174-41dc-adbd-02e6e02d7a8b)
![image](https://github.com/harshnayangithub/Navjeevan/assets/126700987/e3f39034-0978-4322-8eb7-e1698995dd09)
![image](https://github.com/harshnayangithub/Navjeevan/assets/126700987/2a2eeeb4-5592-4a8c-9e18-f2befc041b4a)
![image](https://github.com/harshnayangithub/Navjeevan/assets/126700987/641242f6-6dc8-4853-a3e9-72a04879eec0)
![image](https://github.com/harshnayangithub/Navjeevan/assets/126700987/60ad5e9a-fe03-49bf-8fbd-40408f071e82)

# Meet Our Team

![team](https://github.com/harshnayangithub/Navjeevan/assets/126700987/22ceba2a-a421-4c08-a909-e33131bc15aa)

---
## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements
- Special thanks to VOPA for the opportunity to work on this project and improve the teaching assessment process.
---
