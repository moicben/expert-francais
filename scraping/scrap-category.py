from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import time

# URL de la page principale
main_url = 'https://www.amazon.fr/gp/bestsellers/pet-supplies/ref=zg_bs_nav_pet-supplies_0'

# Fonction pour scraper les catégories
def scrape_categories(url):
    # Utiliser Selenium pour charger la page
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
    driver.set_window_size(1440, 900)  # Définir la largeur à 1440 pixels
    driver.get(url)
    
    # Attendre 10 secondes pour permettre de passer le captcha manuellement
    time.sleep(10)
    
    soup = BeautifulSoup(driver.page_source, 'html.parser')
    driver.quit()
    
    category_elements = soup.select("div#zg .celwidget.c-f")
    if len(category_elements) > 2:
        categories = category_elements[2].select("div > div:nth-child(2) > div a")
        return [category['href'] for category in categories]
    else:
        return []

# Scraper les catégories
category_urls = scrape_categories(main_url)

# Afficher les URLs des catégories
for url in category_urls:
    print(url)