# Esthien SEO, Sitemap, OG, And Webmaster Setup Guide

Prepared: 1 July 2026

## 1. SEO Keywords

Use keywords in real page copy, headings, titles, descriptions, articles, image alt text, and structured data. Do not hide keyword lists on the page. Search engines reward useful, crawlable information; invisible keyword stuffing can look spammy and should not be part of the operating plan.

Primary branded terms:
- Esthien
- Esthien Labs
- Esthien Pvt Ltd
- Esthien PVT LTD
- Esthien Private Limited
- Esthien bionic arms
- Esthien chipsets

Technical terms:
- FPGA chipsets
- FPGA-first custom silicon
- FPGA-class mobile-grade chipsets
- edge AI hardware
- bionic-arm control systems
- prosthetics electronics
- automotive radar
- ADAS edge modules
- safety-critical embedded systems
- deterministic physical intelligence

## 2. Sitemaps And Indexing

Current sitemap URL:
`https://www.esthien.com/sitemap.xml`

Current robots URL:
`https://www.esthien.com/robots.txt`

Steps:
1. Open the sitemap in a browser and confirm it loads.
2. Confirm `robots.txt` includes the sitemap URL.
3. Submit the sitemap in Google Search Console.
4. Submit the sitemap in Bing Webmaster Tools.
5. After each deployment, use URL Inspection in Google Search Console for the homepage and major pages.
6. Track indexed pages, crawl errors, duplicate canonical warnings, and blocked URLs weekly.

## 3. Open Graph Tags

OG tags control how Esthien appears when shared on LinkedIn, WhatsApp, X/Twitter, Slack, and other platforms.

Required tags:
- `og:type`
- `og:site_name`
- `og:title`
- `og:description`
- `og:url`
- `og:image`
- `og:image:width`
- `og:image:height`
- `og:image:alt`
- `twitter:card`
- `twitter:title`
- `twitter:description`
- `twitter:image`

Current OG image:
`https://www.esthien.com/esthien-og.png`

After updating OG tags:
1. Rebuild and deploy.
2. Test a social preview in LinkedIn Post Inspector and other preview tools.
3. If old images appear, clear platform cache by re-scraping the URL.

## 4. Google Search Console

Setup:
1. Go to `https://search.google.com/search-console/`.
2. Add a Domain property for `esthien.com`.
3. Verify DNS ownership through the domain DNS provider.
4. Submit `https://www.esthien.com/sitemap.xml`.
5. Inspect these URLs:
   - `https://www.esthien.com/`
   - `https://www.esthien.com/about`
   - `https://www.esthien.com/vision`
   - `https://www.esthien.com/capabilities`
   - `https://www.esthien.com/contact`
6. Watch Performance for branded and technical queries.

## 5. Bing Webmaster Tools

Setup:
1. Go to `https://www.bing.com/webmasters/`.
2. Add `https://www.esthien.com/`.
3. Import the verified Google Search Console property or verify manually.
4. Submit `https://www.esthien.com/sitemap.xml`.
5. Check Index Explorer, SEO Reports, and Search Performance monthly.

## 6. Monthly Operating Rhythm

Weekly:
- Check indexing issues.
- Check top queries.
- Inspect homepage after major deployment.
- Publish one technical/company update.

Monthly:
- Add one useful page or article around a real search term.
- Update LinkedIn with technical progress.
- Check OG preview quality.
- Review backlinks and referring domains.
- Export Search Console and Bing reports.

## Official References

- Google sitemap documentation: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- Google Search Console: https://search.google.com/search-console/about
- Bing Webmaster Tools: https://www.bing.com/toolbox/webmaster/
- Bing sitemap help: https://www.bing.com/webmasters/help/Sitemaps-3b5cf6ed
- Google robots meta documentation: https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag
- Google supported meta tags: https://developers.google.com/search/docs/crawling-indexing/special-tags
- Open Graph protocol: https://ogp.me/
