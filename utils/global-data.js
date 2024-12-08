export const getGlobalData = () => {
  const name = 'Jay Doe';

  const logo = "/images/alexandra-georges.png"; // Chemin mis à jour

  const blogTitle = process.env.BLOG_TITLE
    ? decodeURI(process.env.BLOG_TITLE)
    : 'Next.js Blog Theme';

  const footerText = process.env.BLOG_FOOTER_TEXT
    ? decodeURI(process.env.BLOG_FOOTER_TEXT)
    : 'All rights reserved.';

  return {
    name,
    logo,
    blogTitle,
    footerText,
  };
};