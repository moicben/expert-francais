const axios = require('axios');
const cheerio = require('cheerio');
const OpenAI = require('openai');
require('dotenv').config();

// Configurez votre clé API OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// URL à scraper
const url = 'https://www.amazon.fr/gp/bestsellers/baby/3966365031';

// Fonction pour extraire des données spécifiques d'une URL
async function extractData(url) {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // Exemple de sélecteurs CSS pour extraire des données spécifiques
    const category = $('div#zg .celwidget.c-f:nth-of-type(2) > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(1)').text().trim();
    const parent = $('#zg > div > div > div:nth-child(2) > div > div > div:last-child > div:first-child').text().trim();

    return {
        category: category,
        parent: parent
    };
}

// Fonction pour générer le contenu de la page d'accueil en utilisant l'API OpenAI
async function generateHomepageContent(data) {
    const prompt = `
    Rédige le contenu  HTML complet de la page d'accueil pour une boutique spécialisée dans ${data.category} ${data.parent}
    La page doit contenir un titre unique, une description de 150-200 mots sur l'importance des produits,
    Insiste sur la qualité Made in France et la pertinence pour des acheteurs français.
    Formate le tout en HTML sémantique avec header, main, et footer.
    `;

    const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: prompt }
        ],
        max_tokens: 500
    });

    return response.choices[0].message.content.trim();
}

// Fonction principale
async function main() {
    const data = await extractData(url);
    const homepageContent = await generateHomepageContent(data);

    console.log(`URL: ${url}`);
    console.log(`Homepage Content: ${homepageContent}\n`);
}

main();
