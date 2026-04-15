const Image = require("@11ty/eleventy-img");
const path = require("path")
const { DateTime } = require("luxon"); // for formatting dates

module.exports = function(eleventyConfig) {

  // Add Nunjucks date filter
  eleventyConfig.addNunjucksFilter("date", (dateObj, format = "DD LLL yyyy") => {
    return DateTime.fromJSDate(dateObj).toFormat(format)
  });

  // Image shortcode
  async function imageShortcode(src, alt, sizes = "100vw") {
    if (!alt) throw new Error(`Missing alt attribute on image: ${src}`)

    let metadata = await Image(src, {
      widths: [400, 800, 1200],
      formats: ["webp", "jpeg"],
      outputDir: "./dist/assets/images/",
      urlPath: "/assets/images/",
      filenameFormat: function (id, src, width, format) {
        const name = path.basename(src, path.extname(src))
        return `${name}-${width}.${format}`
      }
    });

    const imageAttributes = {
      alt,
      sizes,
      loading: "lazy",
      decoding: "async"
    };

    return Image.generateHTML(metadata, imageAttributes);
  }

  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);

  eleventyConfig.addWatchTarget("./src/assets/");

  // Copy assets to dist
  eleventyConfig.addPassthroughCopy("src/assets/fonts");
  eleventyConfig.addPassthroughCopy("src/assets/images");
  
  // Copy robots.txt to dist
  eleventyConfig.addPassthroughCopy("src/robots.txt");

  // Server configuration
  eleventyConfig.setServerOptions({
    port: 8081,
    showVersion: true
  });

  // Add global data filter
  eleventyConfig.addGlobalData("environment", process.env.NODE_ENV || "production");

  // Print dev server info
  eleventyConfig.on('eleventy.before', () => {
    if (process.env.NODE_ENV === 'development') {
      console.log('\n✅ Dev server ready:\n   → http://localhost:8081/\n');
    }
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "dist"
    },
    templateFormats: ["njk", "html"],
    htmlTemplateEngine: "njk"
  }
}