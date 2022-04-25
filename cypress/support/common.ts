const getTitle = (title) => {
  const language = Cypress.env("language") || "zh";

  if (language === "en") {
    return title;
  }
  const translate = Cypress.env("translate") || {};
  return translate[title] || title;
};

export default getTitle;
