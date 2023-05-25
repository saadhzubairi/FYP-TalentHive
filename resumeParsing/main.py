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
from typing import List
from pymongo import MongoClient




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
    company = []
    date = []
    location= []
    reiteration = []
    softskills = []
    hardskills = []
    position = []
    experience = []
    university = []
    school = []
    degree = []
    discipline = []
    education = []
    person = []
    for ent in p.ents:
        if ent.label_ == "PERSON":
            #dict['PERSON'] = ent.text
            person.append(ent.text)
            print('Names: ', ent.text)
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
        if ent.label_ == "SCHOOL":
            school.append(ent.text)
        if ent.label_ == "DATE":
            date.append(ent.text)      
        if ent.label_ == "POSITION":
            position.append(ent.text)
        if ent.label_ == "EXPERIENCE":
            experience.append(ent.text)       
        if ent.label_ == "SOFTSKILLS":
            softskills.append(ent.text)
        if ent.label_ == "HARDSKILLS":
            hardskills.append(ent.text)
        if ent.label_ == "COMPANY":
            company.append(ent.text)
        if ent.label_ == "REITERATION":
            reiteration.append(ent.text)


    #dict['PERSON'] = person[0]
    dict['DEGREE'] = degree
    dict['DISCIPLINE'] = discipline
    dict['UNIVERSITY'] = university
    dict['SCHOOL'] = school
    dict['DATE'] = date
    dict['EDUCATION'] = [degree[0], discipline[0], university[0],date[0]]
    dict['EXPERIENCE'] = experience
    dict['LOCATION'] = location
    dict['COMPANY'] = company   
    dict['SOFTSKILLS'] = softskills   
    dict['HARDSKILLS'] = hardskills   
    dict['REITERATION'] = reiteration   

    
    return dict

""" def joblabelExtractor(jobTitle, workplace,location,type,skills, description,requirments):
    
    jobPosting = jobTitle , "  " , workplace , "  " , location , "  " ,type , "  " ,skills, "  " , description , "  " , requirments
    
    doc = jobPosting.replace("\n", " ")
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

    nlp = spacy.load("en_core_web_lg")
    skill_pattern_path = "jz_skill_patterns.jsonl"
    ruler = nlp.add_pipe("entity_ruler",before ="ner")
    ruler.from_disk(skill_pattern_path)

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
 """



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

# Create a MongoDB client
client = MongoClient(os.getenv('MONGO_URL'))

# Access the desired database
#db = client["your_database_name"]


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
    


@app.post("/score/")
async def calculate_score(req: dict):
    candidate = req["candidate"]
    job = req["jobScore"]
    job_skills = job['HARDSKILLS']
    candidate_skills = candidate['HARDSKILLS']
    job_softskills = job['SOFTSKILLS']
    candidate_softskills = candidate['SOFTSKILLS']
    #HARDSKILLS MATCHER 
    skills_score = 0
    bonus_score = 0.5  # Bonus score for each occurrence of a skill in candidate_skills

    candidate_skills_lower = [skill.lower() for skill in candidate_skills]
    job_skills_lower = [skill.lower() for skill in job_skills]

    for skill in job_skills_lower:
        skill_count = candidate_skills_lower.count(skill)
        skills_score += skill_count + (bonus_score * skill_count)

    skills_score = skills_score/len(job_skills) * 10
    
    #SOFTSKILLS Matcher
    softskills_score = 0
    bonus_score = 0.5  # Bonus score for each occurrence of a skill in candidate_skills

    candidate_softskills_lower = [skill.lower() for skill in candidate_softskills]
    job_softskills_lower = [skill.lower() for skill in job_softskills]

    for skill in job_softskills_lower:
        skill_count = candidate_skills_lower.count(skill)
        softskills_score += skill_count + (bonus_score * skill_count)

    softskills_score = softskills_score/len(job_skills) * 10
    
    #Education and Experience Scoring
    candidate_education = candidate['education']
    candidate_experience = candidate['work_experience']
   
    candidate_degree = []
    for items in candidate_education:
        candidate_degree.append(items.get('degree'))
    candidate_discipline = []
    for items in candidate_education:
        candidate_discipline.append(items.get('discipline'))
    past_titles = []
    for items in candidate_experience:
        past_titles.append(items.get('title'))

    candidate_degree = [degree.lower() for degree in candidate_degree]
    candidate_discipline = [discipline.lower() for discipline in candidate_discipline]
    past_titles = [title.lower() for title in past_titles]
    
    job_degree = []
    for degree in job['DEGREE']:
        job_degree.append(degree)
    job_degree = [degree.lower() for degree in job_degree]

    job_discipline = []
    for discipline in job['DISCIPLINE']:
        job_discipline.append(discipline)
    job_discipline = [discipline.lower() for degree in job_discipline]

    job_experience  = []
    for experience in job['EXPERIENCE']:
        job_experience.append(experience)

    job_experience = [experience.lower() for experience in job_experience]
    

    # Calculate degree matching score
    degree_score = 0
    print(job_degree)
    if any(item in job_degree for item in candidate_degree):
        degree_score = 1 #Edit for lower cases
    
    # Calculate past discipline matching score
    discipline_score = 0
    if any(item in job_discipline for item in candidate_discipline):
        discipline_score = 1


    # Calculate past position matching score
    position_score = 0
    if any(item in job_experience for item in past_titles):
        position_score = 1

    
    # Calculate total score
    total_score = skills_score + softskills_score + degree_score + discipline_score + position_score
    print(total_score)
    
    return {"score": round(total_score,1)}

@app.post("/jobScoringList/")
async def joblabelExtractor(req: dict):
    jobPosting = req["jobPosting"]
    skills = req["skills"]
    
    doc = jobPosting.replace("\n", " ")
    doc = doc.replace("%20", " ")
    doc = doc.replace("•", " ")
    doc = doc.replace("|", " ")
    doc = doc.replace("–", " ")
    doc = doc.replace("- ", "-")
    doc = doc.replace(" -", "-")#for linkedin/github link
    doc = doc.replace("BS", "Bachelor of Sciences ")
    doc = doc.replace("BS.", "Bachelor of Sciences ")
    doc = doc.replace(".BS.", "Bachelor of Sciences ")
    doc = doc.replace(".BS", "Bachelor of Sciences ")
    doc = doc.replace("BS-", "Bachelor of Sciences - ")
    doc = doc.replace("-BS", " Bachelor of Sciences ")
    doc = doc.replace("B.S", "Bachelor of Sciences ")
    doc = doc.replace(".B.S.", "Bachelor of Sciences ")
    doc = doc.replace("B.S.", "Bachelor of Sciences ")

    doc = " ".join(re.split("\s+", doc, flags=re.UNICODE)) #removing unwanted space between words
    doc = re.sub('(?<=\d) (?=\d)', '', doc) #removes space between numbers only

    #Loading spaCy large vector model  
    nlp = spacy.load("./output/model-last")
    


    p = nlp(doc)
    dict = {}
    company = []
    date = []
    location= []
    reiteration = []
    softskills = []
    hardskills = []
    position = []
    experience = []
    university = []
    school = []
    degree = []
    discipline = []
    education = []
    person = []
    for ent in p.ents:
        if ent.label_ == "PERSON":
            person.append(ent.text)
            print('Names: ', ent.text)
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
        if ent.label_ == "SCHOOL":
            school.append(ent.text)
        if ent.label_ == "DATE":
            date.append(ent.text)      
        if ent.label_ == "POSITION":
            position.append(ent.text)
        if ent.label_ == "EXPERIENCE":
            experience.append(ent.text)       
        if ent.label_ == "SOFTSKILLS":
            softskills.append(ent.text)
        if ent.label_ == "HARDSKILLS":
            hardskills.append(ent.text)
        if ent.label_ == "COMPANY":
            company.append(ent.text)
        
    for item in skills:
        hardskills.append(item)

    dict['DEGREE'] = degree
    dict['DISCIPLINE'] = discipline
    dict['POSITION'] = position
    dict['EXPERIENCE'] = experience
    dict['LOCATION'] = location
    dict['COMPANY'] = company   
    dict['SOFTSKILLS'] = softskills   
    dict['HARDSKILLS'] = hardskills 
   

# Remove duplicates from dictionary values
    for key, value in dict.items():
        dict[key] = list(set(value))
    
        
    return dict

    
@app.get("/")
async def root():
    return {"message":"Nikal L"}

