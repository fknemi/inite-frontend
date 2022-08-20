const purgecss = require("@fullhuman/postcss-purgecss")({
  content: [
    "./public/**/*.html",
    "./src/**/*.jsx",
  ],


  defaultExtractor: content => {
    const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];
    const innerMatches = content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || [];
    return broadMatches.concat(innerMatches);
  },
});

module.exports = {
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
  ],
};