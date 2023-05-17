import PyPDF2
import docx2txt
import re
import spacy
from spacy.pipeline import EntityRuler
from spacy.lang.en import English
from spacy.tokens import Doc
from spacy import displacy 
from spacy.lang.en import English
from spacy.pipeline import EntityRuler

from fastapi import FastAPI,UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

import boto3
from dotenv import load_dotenv
import io
import os 
from uuid import uuid4




def resumeparse(file_path):
    if file_path.endswith('.pdf'):
        with open(file_path, 'rb') as pdf_file:
            pdf_reader = PyPDF2.PdfFileReader(pdf_file)
            text = ''
            for page_num in range(pdf_reader.getNumPages()):
                page_obj = pdf_reader.getPage(page_num)
                text += page_obj.extractText()
            
    elif file_path.endswith('.docx'):
        text = docx2txt.process(file_path)
   
#Cleaning extracted text     

    doc = text.replace("\n", " ")
#doc = doc.replace("-", "")
#doc = doc.replace(",", "")
#doc = doc.replace(":", " ")
    doc = doc.replace("•", " ")
#doc = doc.replace("-", "")
#doc = doc.replace(".", " ")
    doc = doc.replace("|", " ")
    doc = doc.replace("–", " ")
    doc = doc.replace("- ", "-")
    doc = doc.replace(" -", "-")#for linkedin/github link
    doc = doc.replace("BS", "Bachelor of Sciences ")
    doc = doc.replace("B.S", "Bachelor of Sciences ")
    doc = doc.replace("B.S", "Bachelor of Sciences ")
    doc = doc.replace("B.S.", "Bachelor of Sciences ")

    doc = " ".join(re.split("\s+", doc, flags=re.UNICODE)) #removing unwanted space between words
    doc = re.sub('(?<=\d) (?=\d)', '', doc) #removes space between numbers only

    
#Loading spaCy large vector model  
    nlp = spacy.load("en_core_web_lg")
    skill_pattern_path = "jz_skill_patterns.jsonl"
    ruler = nlp.add_pipe("entity_ruler",before ="ner")
    ruler.from_disk(skill_pattern_path)

    patterns = [
                    {
                        "label": "EMAIL", "pattern": [{"TEXT": {"REGEX": "([^@|\s]+@[^@]+\.[^@|\s]+)"}}
                                                            ]
                    },
                    {
                        "label": "LINKEDIN", "pattern": [{"TEXT": {"REGEX": "^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile)"}}
                                                            ]
                    },
                    {
                        "label": "GITHUB", "pattern": [{"TEXT": {"REGEX": "^(http(s?):\/\/)?(www\.)?github\.([a-z])+\/([A-Za-z0-9]{1,})+\/?$"}}
                                                            ]
                    },
                    {
                        "label": "PHONE-NUMBER", "pattern": [{"TEXT": {"REGEX": "^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$"}}
                                                            ]
                    }
                ]

    ruler.add_patterns(patterns)
    p = nlp(doc)

    dict = {}
    skills = []
    experience = []
    university = []
    degree = []
    discipline = []
    education = []
    person = []
    for ent in p.ents:
        if ent.label_ == "PERSON":
            #dict['PERSON'] = ent.text
            person.append(ent.text)
            #print('Names: ', ent.text)
        if ent.label_ == "EMAIL":
            dict['EMAIL'] = ent.text
        if ent.label_ == "LINKEDIN":
            dict['LINKEDIN'] = ent.text
        if ent.label_ == "GITHUB":
            dict['GITHUB'] = ent.text
        if ent.label_ == "PHONE-NUMBER":
            dict['PHONE-NUMBER'] = ent.text 
        if ent.label_ == "DEGREE":
            degree.append(ent.text)
        if ent.label_ == "DISCIPLINE":
            discipline.append(ent.text)
        if ent.label_ == "UNIVERSITY":
            university.append(ent.text)      
        if ent.label_ == "EXPERIENCE":
            experience.append(ent.text)       
        if ent.label_ == "SKILL":
            skills.append(ent.text)
            

    dict['PERSON'] = person[0]
    dict['DEGREE'] = degree
    dict['DISCIPLINE'] = discipline
    dict['UNIVERSITY'] = university
    dict['EXPERIENCE'] = experience         
    dict['SKILLS'] = skills   
    return dict




load_dotenv() 

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

access_key = os.environ.get('access_key')
access_secret = os.getenv("access_secret")

#Connecting to AWS S3 Bucket
s3 = boto3.client('s3',
        aws_access_key_id= access_key,
        aws_secret_access_key= access_secret)

AWS_BUCKET_NAME = 'resumesbucket'


@app.post("/uploadfile/")
async def upload_file(file: UploadFile):
    if file.content_type == 'application/pdf' or file.content_type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        file_contents = await file.read()
        file_uuid = uuid4().hex
        file_name = file_uuid + '-' + file.filename
        s3.upload_fileobj(
            Fileobj=io.BytesIO(file_contents),
            Bucket=AWS_BUCKET_NAME,
            Key = file_name
        )
        s3.download_file(
        Bucket = AWS_BUCKET_NAME,
        Key = file_name,
        Filename = f"./temp/{file_name}"
    )
        print("> Temporary file downloaded to parse")
        file_url = f"./temp/{file_name}"
        data = resumeparse(file_url)
        os.remove(file_url)
        print("> Temporary file deleted after parsing")
        data['FILE_NAME'] = (file_name) 
        return JSONResponse(content=data)
    else:
        return {"error": "Invalid file type."}
    
    
@app.get("/")
async def root():
    return {"message":"Nikal L"}
