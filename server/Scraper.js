const axios = require("axios");
const cheerio = require("cheerio");

const URL = "http://scrapesite.com"; // site we scrape

const scrape = () => {
	// Just a demo for cheerio
	// =========================================================================
	// const $ = cheerio.load(page.data);
	// $(".first").each((i, element) => {
	// 	title.push($(element).text().trimStart().trimEnd());
	// 	ids.push($(element).find("a").attr("href").split("/")[4]);
	// 	$(element)
	// 		.siblings("td")
	// 		.each((siblingIndex, sibling) => {
	// 			if (siblingIndex === 0) author.push($(sibling).text());
	// 			if (siblingIndex === 2) {
	// 				date.push(chrono.parseDate($(sibling).text()).toUTCString());
	// 			}
	// 		});
	// });
};

module.exports = { scrape };
