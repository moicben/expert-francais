import requests
from bs4 import BeautifulSoup
import pandas as pd

# Liste des URL à scraper
base_url = 'https://www.amazon.fr'
urls = [
    '/gp/bestsellers/amazon-renewed/ref=zg_bs_nav_amazon-renewed_0',
    '/gp/bestsellers/pet-supplies/ref=zg_bs_nav_pet-supplies_0',
    '/gp/bestsellers/amazon-devices/ref=zg_bs_nav_amazon-devices_0',
    '/gp/bestsellers/mobile-apps/ref=zg_bs_nav_mobile-apps_0',
    '/gp/bestsellers/automotive/ref=zg_bs_nav_automotive_0',
    '/gp/bestsellers/beauty/ref=zg_bs_nav_beauty_0',
    '/gp/bestsellers/baby/ref=zg_bs_nav_baby_0',
    '/gp/bestsellers/gift-cards/ref=zg_bs_nav_gift-cards_0',
    '/gp/bestsellers/digital-text/ref=zg_bs_nav_digital-text_0',
    '/gp/bestsellers/hi/ref=zg_bs_nav_hi_0',
    '/gp/bestsellers/music/ref=zg_bs_nav_music_0',
    '/gp/bestsellers/climate-pledge/ref=zg_bs_nav_climate-pledge_0',
    '/gp/bestsellers/industrial/ref=zg_bs_nav_industrial_0',
    '/gp/bestsellers/kitchen/ref=zg_bs_nav_kitchen_0',
    '/gp/bestsellers/dvd/ref=zg_bs_nav_dvd_0',
    '/gp/bestsellers/grocery/ref=zg_bs_nav_grocery_0',
    '/gp/bestsellers/officeproduct/ref=zg_bs_nav_officeproduct_0',
    '/gp/bestsellers/appliances/ref=zg_bs_nav_appliances_0',
    '/gp/bestsellers/electronics/ref=zg_bs_nav_electronics_0',
    '/gp/bestsellers/hpc/ref=zg_bs_nav_hpc_0',
    '/gp/bestsellers/computers/ref=zg_bs_nav_computers_0',
    '/gp/bestsellers/musical-instruments/ref=zg_bs_nav_musical-instruments_0',
    '/gp/bestsellers/lawn-garden/ref=zg_bs_nav_lawn-garden_0',
    '/gp/bestsellers/toys/ref=zg_bs_nav_toys_0',
    '/gp/bestsellers/videogames/ref=zg_bs_nav_videogames_0',
    '/gp/bestsellers/books/ref=zg_bs_nav_books_0',
    '/gp/bestsellers/software/ref=zg_bs_nav_software_0',
    '/gp/bestsellers/lighting/ref=zg_bs_nav_lighting_0',
    '/gp/bestsellers/fashion/ref=zg_bs_nav_fashion_0',
    '/gp/bestsellers/boost/ref=zg_bs_nav_boost_0',
    '/gp/bestsellers/handmade/ref=zg_bs_nav_handmade_0',
    '/gp/bestsellers/sports/ref=zg_bs_nav_sports_0',
    '/gp/bestsellers/dmusic/ref=zg_bs_nav_dmusic_0'
]

# Fonction pour scraper une URL
def scrape_url(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    category_elements = soup.select("div#zg .a-fixed-left-grid-inner .celwidget.c-f")
    if len(category_elements) > 1:
        elements = category_elements[1].select("div > div:nth-child(2) > div:nth-child(2) a")
        return [(element.get_text(), element['href']) for element in elements]
    else:
        return []

# Stocker les résultats
results = []

# Scraper toutes les URL
for relative_url in urls:
    full_url = base_url + relative_url
    elements = scrape_url(full_url)
    for text, href in elements:
        results.append({'Category': relative_url, 'Text': text, 'Link': base_url + href})

# Créer un DataFrame pandas
df = pd.DataFrame(results)

# Enregistrer dans un fichier Excel
df.to_excel('scraped_data.xlsx', index=False)