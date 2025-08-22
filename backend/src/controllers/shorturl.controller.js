import { getShortUrl } from "../dao/short_url.js"
import { createShortUrlWithoutUser, createShortUrlWithUser } from "../services/short_url.service.js"
import wrapAsync from "../utils/tryCatchWrapper.js"
import UrlModel from "../models/short_url.model.js";

export const createShortUrl = wrapAsync(async (req, res) => {
    const { longUrl, slug } = req.body;
    if (!longUrl) {
        return res.status(400).json({ success: false, message: "longUrl is required" });
    }

    // Check if a short link for this long URL already exists for this user (if authenticated)
    const existingQuery = { full_url: longUrl };
    if (req.user?._id) existingQuery.user = req.user._id;
    const existing = await UrlModel.findOne(existingQuery);
    if (existing && !slug) {
        // If no custom slug requested, reuse existing
        return res.status(200).json({ shortUrl: `${process.env.APP_URL}/${existing.short_url}`, message: "Short link already exists" });
    }

    let shortUrl;
    if (req.user) {
        shortUrl = await createShortUrlWithUser(longUrl, req.user._id, slug);
    } else {
        shortUrl = await createShortUrlWithoutUser(longUrl);
    }

    return res.status(201).json({ shortUrl: `${process.env.APP_URL}/${shortUrl}` });
})


export const redirectFromShortUrl = wrapAsync(async (req, res) => {
    const { id } = req.params
    const url = await getShortUrl(id)
    if (!url) throw new Error("Short URL not found")
    res.redirect(url.full_url)
})

export const createCustomShortUrl = wrapAsync(async (req, res) => {
    const { url, slug } = req.body
    const shortUrl = await createShortUrlWithoutUser(url, slug)
    res.status(200).json({ shortUrl: process.env.APP_URL + shortUrl })
})