import { v2 as cloudinary, type UploadApiResponse } from 'cloudinary';

cloudinary.config({
	cloud_name: 'dqvbbcdfd',
	api_key: '416113375373119',
	api_secret: 'yFUfFBuF2WCAcKeQYu0psVvEFdA'
});

export async function uploadImage(image: string, id: number): Promise<UploadApiResponse> {
	return cloudinary.uploader.upload(image, { public_id: 'image' + id });
}

export function getImageURLFromId(id: number): string {
	return cloudinary.url('image' + id);
}
