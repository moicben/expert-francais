import React from 'react';
import { allContent } from '../utils/local-content';
import { getComponent } from '../components/components-registry';
import { resolveStaticProps } from '../utils/static-props-resolvers';
import { resolveStaticPaths } from '../utils/static-paths-resolvers';
import headerData from '../../content/data/header.json';
import footerData from '../../content/data/footer.json';

function Page(props) {
    const { page, site } = props;
    const { modelName } = page.__metadata;
    if (!modelName) {
        throw new Error(`page has no type, page '${props.path}'`);
    }
    const PageLayout = getComponent(modelName);
    if (!PageLayout) {
        throw new Error(`no page layout matching the page model: ${modelName}`);
    }
    return <PageLayout page={page} site={site} />;
}

export function getStaticPaths() {
    const data = allContent();
    const paths = resolveStaticPaths(data);
    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const data = allContent();
    const urlPath = '/' + (params.slug || []).join('/');
    const props = await resolveStaticProps(urlPath, data);

    // Ensure site is initialized
    props.site = props.site || {};

    // Validate header and footer
    props.site.header = {
        title: headerData.title,
        primaryLinks: headerData.primaryLinks,
        secondaryLinks: headerData.secondaryLinks,
        variant: headerData.variant,
        colors: headerData.colors,
        logo: headerData.logo
    };
    props.site.footer = {
        logo: footerData.logo,
        text: footerData.text,
        primaryLinks: footerData.primaryLinks,
        secondaryLinks: footerData.secondaryLinks,
        socialLinks: footerData.socialLinks,
        legalLinks: footerData.legalLinks,
        copyrightText: footerData.copyrightText,
        colors: footerData.colors
    };

    return { props };
}

export default Page;
