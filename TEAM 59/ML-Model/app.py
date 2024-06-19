from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import whisper
import pandas as pd
import nltk
import ssl
from gtts import gTTS
from audio_similarity import AudioSimilarity


nltk.data.path.append('/Users/guest-user/nltk_data')


if not os.path.exists('/Users/guest-user/nltk_data'):
    os.makedirs('/Users/guest-user/nltk_data')


try:
    _create_unverified_https_context = ssl._create_unverified_context
except AttributeError:
    pass
else:
    ssl._create_default_https_context = _create_unverified_https_context

nltk.download('punkt', quiet=True)
nltk.download('stopwords', quiet=True)
from nltk.tokenize import word_tokenize
from nltk.corpus import cmudict, stopwords
from nltk.stem import PorterStemmer
import re
import spacy

app = Flask(__name__)

CORS(app , resource={r"/upload" : {"origins" : "*"}})



def replace_acronyms(text, acronym_dict):
   
    pattern = r'\b(?:{})\b'.format('|'.join(re.escape(key) for key in acronym_dict.keys()))


    replaced_text = re.sub(pattern, lambda match: acronym_dict[match.group(0)], text)

    return replaced_text


def get_homophones(cmu_dict):
    homophones = {}
    pronunciation_dict = {}

    
    for word, pronunciations in cmu_dict.items():
        for pronunciation in pronunciations:
            pronunciation_key = tuple(pronunciation)
            if pronunciation_key not in pronunciation_dict:
                pronunciation_dict[pronunciation_key] = []
            pronunciation_dict[pronunciation_key].append(word)

   
    for pronunciation_key, words in pronunciation_dict.items():
        if len(words) > 1:
            for word in words:
                homophones[word] = words

    return homophones



def preprocess_text(text,homophones_dict):
   
    lowercased_text = text.lower()

   
    remove_punctuation = re.sub(r'[^\w\s]', '', lowercased_text)
    remove_white_space = remove_punctuation.strip()


    tokenized_text = word_tokenize(remove_white_space)

   
    stopwords_set = set(stopwords.words('english'))
    stopwords_removed = [word for word in tokenized_text if word not in stopwords_set]

    
    replaced_homophones = []
    for word in stopwords_removed:
        if word in homophones_dict:
         
            replaced_homophones.append(homophones_dict[word][0])
        else:
            replaced_homophones.append(word)

   
    ps = PorterStemmer()
    stemmed_text = [ps.stem(word) for word in replaced_homophones]

 
    df = pd.DataFrame({
        'DOCUMENT': [text],
        'LOWERCASE': [lowercased_text],
        'CLEANING': [remove_white_space],
        'TOKENIZATION': [tokenized_text],
        'STOP-WORDS': [stopwords_removed],
        'STEMMING': [stemmed_text]
    })

    return df

def preprocessing(corpus,homophones_dict):
    
    df = pd.DataFrame(columns=['DOCUMENT'])

    
    for doc in corpus['DOCUMENT']:
        
        result_df = preprocess_text(doc,homophones_dict)

        
        df = pd.concat([df, result_df], ignore_index=True)

    return df

def calculate_tfidf(corpus,homophones_dict):
  
    df = preprocessing(corpus,homophones_dict)

    
    stemming = corpus['STEMMING'].apply(' '.join)


    from sklearn.feature_extraction.text import TfidfVectorizer
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(stemming)

   
    feature_names = vectorizer.get_feature_names_out()


    df_tfidf = pd.DataFrame(tfidf_matrix.toarray(), columns=feature_names)
    df_tfidf = pd.concat([df, df_tfidf], axis=1)

    return df_tfidf

def longest_common_subsequence(text1, text2):
    words1 = text1.split()  
    words2 = text2.split()  

    m = len(words1)
    n = len(words2)

    
    dp = [[0] * (n + 1) for _ in range(m + 1)]

 
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if words1[i - 1] == words2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])


    return dp[m][n]


def preprocess_text1(text):

    lowercased_text = text.lower()

   
    cleaned_text = re.sub(r'[^\w\s]', '', lowercased_text)

    return cleaned_text

def lcs_similarity(base_text, compare_text):

    base_processed = preprocess_text1(base_text)
    compare_processed = preprocess_text1(compare_text)

   
    lcs_length = longest_common_subsequence(base_processed, compare_processed)
    

    base_length = len(base_processed.split())


    similarity_score = lcs_length / base_length if base_length > 0 else 0

    return similarity_score

acronym_dict = {
    
    "$": "dollar",
    "€": "euro",
    "£": "pound",
    "¥": "yen",
    "₹": "rupees",
    "rs.": "rupees",

    
    "ASAP": "as soon as possible",
    "DIY": "do it yourself",
    "FYI": "for your information",
    "IDK": "I don't know",
    "OMG": "oh my god",
    "BTW": "by the way",
    "LOL": "laugh out loud",
    "BRB": "be right back",
    "IMHO": "in my humble opinion",
    "TTYL": "talk to you later",
    "RSVP": "répondez s'il vous plaît",
    "ETA": "estimated time of arrival",
    "FAQ": "frequently asked questions",
    "TBA": "to be announced",
    "TBD": "to be determined",
    "CEO": "chief executive officer",
    "CFO": "chief financial officer",
    "CTO": "chief technology officer",
    "CIO": "chief information officer",
    "CMO": "chief marketing officer",
    "COO": "chief operating officer",
    "CPA": "certified public accountant",
    "CEO": "chief executive officer",
    "CTA": "call to action",
    "CTE": "career and technical education",
    "DOJ": "Department of Justice",
    "DOT": "Department of Transportation",
    "DRM": "digital rights management",
    "FAQ": "frequently asked questions",
    "FBI": "Federal Bureau of Investigation",
    "FDA": "Food and Drug Administration",
    "FEMA": "Federal Emergency Management Agency",
    "FIFA": "Fédération Internationale de Football Association",
    "FOMO": "fear of missing out",
    "FTP": "file transfer protocol",
    "GOP": "Grand Old Party (Republican Party)",
    "HIV": "human immunodeficiency virus",
    "HTML": "hypertext markup language",
    "HTTP": "hypertext transfer protocol",
    "HTTPS": "hypertext transfer protocol secure",
    "IMDb": "Internet Movie Database",
    "IRS": "Internal Revenue Service",
    "ISO": "International Organization for Standardization",
    "IT": "information technology",
    "JPEG": "Joint Photographic Experts Group",
    "LASER": "Light Amplification by Stimulated Emission of Radiation",
    "LED": "light-emitting diode",
    "NASA": "National Aeronautics and Space Administration",
    "NATO": "North Atlantic Treaty Organization",
    "NFL": "National Football League",
    "NPR": "National Public Radio",
    "PDF": "Portable Document Format",
    "PIN": "personal identification number",
    "PM": "prime minister or post meridiem",
    "PSA": "public service announcement",
    "RADAR": "radio detection and ranging",
    "RAM": "random access memory",
    "RPG": "role-playing game",
    "SOS": "save our souls",
    "SSN": "Social Security Number",
    "SWAT": "Special Weapons and Tactics",
    "TNT": "trinitrotoluene",
    "URL": "uniform resource locator",
    "USPS": "United States Postal Service",
    "VPN": "virtual private network",
    "WiFi": "wireless fidelity",
    "WWW": "World Wide Web",
    "ZIP": "Zone Improvement Plan",

    
    "e.g.": "for example",
    "i.e.": "that is",
    "etc.": "et cetera",

   
    "U.S.": "United States",
    "U.K.": "United Kingdom",
    "UN": "United Nations",


}

import re

def replace_acronyms(text, acronym_dict):
    """
    Replaces acronyms and special symbols in the text with their expanded forms using the provided dictionary.

    Parameters:
    text (str): The input text.
    acronym_dict (dict): A dictionary where keys are acronyms or special symbols and values are their expanded forms.

    Returns:
    str: The text with acronyms and special symbols replaced by their expanded forms.
    """

    pattern = r'(?:{})'.format('|'.join(re.escape(key) for key in acronym_dict.keys()))

    
    replaced_text = re.sub(pattern, lambda match: acronym_dict.get(match.group(0), match.group(0)), text)

    return replaced_text


def cosineSimilarity(corpus,homophones_dict):
    
    df_tfidf = calculate_tfidf(corpus,homophones_dict)


    vector1 = df_tfidf.iloc[0, 6:].values.reshape(1, -1)


    vectors = df_tfidf.iloc[:, 6:].values

    
    from sklearn.metrics.pairwise import cosine_similarity
    cosim = cosine_similarity(vector1, vectors)
    cosim = pd.DataFrame(cosim)

 
    cosim = cosim.values.flatten()


    df_cosim = pd.DataFrame(cosim, columns=['COSIM'])

    df_cosim = pd.concat([df_tfidf, df_cosim], axis=1)

    return df_cosim

def process_audio_and_text(audio_file_path, base_text):
 
    model = whisper.load_model("base")
   
    result = model.transcribe(audio_file_path)
    transcribed_text = result["text"]
    print(transcribed_text)

    base_text = replace_acronyms(base_text, acronym_dict)

   
    df = pd.DataFrame({
        'DOCUMENT': [base_text, transcribed_text]
    })


    df.to_csv('data.csv', sep=';', index=False, encoding='latin1')
    data = pd.read_csv('data.csv', delimiter=';', encoding='latin1')
    cmu_dict = cmudict.dict()

    homophones_dict = get_homophones(cmu_dict)


    result_preprocessing = preprocessing(data,homophones_dict)


    result_tfidf = calculate_tfidf(result_preprocessing,homophones_dict)

    cosim_result = cosineSimilarity(result_tfidf,homophones_dict)
    nlp = spacy.load("en_core_web_lg")
    s1 = nlp(base_text)
    s2 = nlp(transcribed_text)

    spacey_similarity_score = s1.similarity(s2)

    
    cosine_similarity_value = cosim_result.iloc[1, -1]

    similarity_score = lcs_similarity(base_text,transcribed_text)
    
     
    tts = gTTS(base_text, lang='en', tld='co.in')
    tts.save("correct_pronunciation.mp3")


    sample_rate = 44100
    weights = {
        'zcr_similarity': 0.2,
        'rhythm_similarity': 0.2,
        'chroma_similarity': 0.2,
        'energy_envelope_similarity': 0.1,
        'spectral_contrast_similarity': 0.1,
        'perceptual_similarity': 0.2
    }

    original_path = audio_file_path
    compare_path = "/Users/guest-user/Downloads/VOLA/flask_audio_upload/correct_pronunciation.mp3"

    audio_similarity = AudioSimilarity(original_path, compare_path, sample_rate, weights)
    stent_weighted_audio_similarity = audio_similarity.stent_weighted_audio_similarity(metrics='all')

    zcr_similarity_score = audio_similarity.zcr_similarity()

    weightedScore = ((0.7 * spacey_similarity_score) +(0.7 * similarity_score )+(0.4 * cosine_similarity_value )+(0.2 * zcr_similarity_score)) / 2

    percentageScore = weightedScore * 100

    return{
'cosine_similarity': float(cosine_similarity_value),
'spacy_similarity': float(spacey_similarity_score),
'lcs_similarity': float(similarity_score),
'zcr_similarity': float(zcr_similarity_score),
'PercentageScore': float(percentageScore)
}



if not os.path.exists('uploads'):
    os.makedirs('uploads')
    
    
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files or 'text' not in request.form:
        return jsonify({'error': 'No file part or text part'}), 400

    file = request.files['file']
    text = request.form['text']
    print(text)
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file:
        
        uploads_dir = os.path.join(app.root_path, 'uploads')
        os.makedirs(uploads_dir, exist_ok=True)
        file_path = os.path.join(uploads_dir, file.filename)
        file.save(file_path)

  
        result = process_audio_and_text(file_path, text)
        
        return jsonify(result), 200

    return jsonify({'error': 'File upload failed'}), 500


if __name__ == '__main__':
    app.run(debug=True, port=8080)