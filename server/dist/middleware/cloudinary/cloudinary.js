import { v2 as cloudinary } from 'cloudinary';
const { cloud_name, api_key, api_secret } = process.env;
cloudinary.config({
    cloud_name,
    api_key,
    api_secret
});
export async function handleUpload(file) {
    const res = await cloudinary.uploader.upload(file, {
        resource_type: "auto",
    });
    return res;
}
//# sourceMappingURL=cloudinary.js.map