import { NetlifyAPI } from 'netlify';
import { execSync } from 'child_process';
import path from 'path';
const fs = require('fs');
require('dotenv').config();

const NETLIFY_API_TOKEN = process.env.NETLIFY_API_TOKEN;
const NETLIFY_TEAM_ID = process.env.NETLIFY_TEAM_ID;
const DOMAIN = process.env.DOMAIN;

const subdomains = [
    'test'
    // Ajoutez autant de sous-domaines que nécessaire
];

const api = new NetlifyAPI(NETLIFY_API_TOKEN);

async function createSite(subdomain) {
    try {
        const site = await api.createSite({
            body: {
                name: `${subdomain}.${DOMAIN}`,
                custom_domain: `${subdomain}.${DOMAIN}`
            }
        });

        console.log(`Site created: ${site.url}`);

        // Construire le projet Next.js
        buildProject();

        // Déployer le répertoire actuel sur le site créé
        await deploySite(site.id, site.name);
    } catch (error) {
        console.error(`Error creating site for ${subdomain}:`, error.message);
    }
}

function buildProject() {
    try {
        // Exécuter la commande de construction Next.js
        execSync('npm run build', { stdio: 'inherit' });
        console.log('Project built successfully');
    } catch (error) {
        console.error('Error building project:', error.message);
        process.exit(1);
    }
}

async function deploySite(siteId, siteName) {
    try {
        const outDir = path.resolve('./out'); // Répertoire de sortie après la construction
        // Utiliser netlify-cli pour déployer le répertoire de sortie
        execSync(`netlify deploy --prod --dir=${outDir} --site=${siteId}`, { stdio: 'inherit' });
        console.log(`Site deployed: https://${siteName}.netlify.app`);
    } catch (error) {
        console.error(`Error deploying site:`, error.message);
    }
}

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function createSites() {
    for (const subdomain of subdomains) {
        await createSite(subdomain);
        await delay(10000); // Ajoute un délai de 10 secondes entre les requêtes
    }
}

createSites();
