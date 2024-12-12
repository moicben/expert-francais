import requests
from bs4 import BeautifulSoup

# Liste des URL à scraper
urls = [
    'https://www.amazon.fr/gp/bestsellers/pet-supplies/ref=zg_bs_nav_pet-supplies_0'
    # Ajoutez d'autres URL ici
]

# Fonction pour scraper une URL
def scrape_url(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    elements = soup.select("div#zg .a-fixed-left-grid-inner .celwidget.c-f")[1].select("div > div:nth-child(2) > div:nth-child(2) a")
    return elements

# Scraper toutes les URL
for url in urls:
    elements = scrape_url(url)
    for element in elements:
        print(element.get_text(), element['href'])