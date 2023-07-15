import requests
import json
import pandas as pd
import numpy as np

#scraper.py
#Script for retrieving frame data from Dustloop Wiki
#Maybe other wiki's in the future

def getHtml(url):
  r = requests.get(url)
  html = r.text
  return html

def getTable(html):
  table = pd.read_html(html)
  return table
