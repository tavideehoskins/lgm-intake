// Browser-side image compression for inspiration photo uploads.
// Vercel serverless functions reject request bodies over ~4.5MB, so photos
// must be downscaled client-side before they are POSTed to /api/submissions.

const MAX_DIMENSION = 1600;
const JPEG_QUALITY = 0.82;

async function decodeToBitmap(file: File): Promise<ImageBitmap | HTMLImageElement> {
  try {
    return await createImageBitmap(file, { imageOrientation: "from-image" });
  } catch {
    // Fallback decode path (e.g. older browsers) — <img> applies EXIF
    // orientation automatically in all modern engines.
    const url = URL.createObjectURL(file);
    try {
      const img = new Image();
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("decode failed"));
        img.src = url;
      });
      return img;
    } finally {
      URL.revokeObjectURL(url);
    }
  }
}

/**
 * Downscale + re-encode an image to a web-friendly JPEG.
 * Returns the original file untouched if it can't be decoded (rare formats)
 * or if re-encoding wouldn't make it smaller.
 */
export async function compressImage(file: File): Promise<File> {
  try {
    const source = await decodeToBitmap(file);
    const width = "naturalWidth" in source ? source.naturalWidth : source.width;
    const height = "naturalHeight" in source ? source.naturalHeight : source.height;
    if (!width || !height) return file;

    const scale = Math.min(1, MAX_DIMENSION / Math.max(width, height));
    const w = Math.max(1, Math.round(width * scale));
    const h = Math.max(1, Math.round(height * scale));

    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(source, 0, 0, w, h);
    if ("close" in source) source.close();

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", JPEG_QUALITY)
    );
    if (!blob) return file;
    if (blob.size >= file.size) return file;

    const name = file.name.replace(/\.[^.]+$/, "") + ".jpg";
    return new File([blob], name, { type: "image/jpeg" });
  } catch {
    return file;
  }
}
