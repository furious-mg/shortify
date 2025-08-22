import axiosInstance from "../utils/axiosInstance"

export const createShortUrl = async (longUrl, slug) =>{
    const payload = { longUrl }
    if (slug) payload.slug = slug
    const {data} = await axiosInstance.post("/api/create", payload)
    return data;
}