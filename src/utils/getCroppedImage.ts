interface CropExportOptions {
  type: 'avatar' | 'cover';
}

export async function getCroppedImage(
  imageSrc: string,
  crop: { x: number; y: number; width: number; height: number },
  options: CropExportOptions,
): Promise<string> {
  const image = new Image();
  image.crossOrigin = 'anonymous';
  image.src = imageSrc;
  await new Promise((resolve) => (image.onload = resolve));

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  const srcX = crop.x * scaleX;
  const srcY = crop.y * scaleY;
  const srcW = crop.width * scaleX;
  const srcH = crop.height * scaleY;

  const canvas = document.createElement('canvas');
  const isCover = options.type === 'cover';

  canvas.width = isCover ? srcW : 1000;
  canvas.height = isCover ? srcH : 1000;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas context not available');

  ctx.drawImage(image, srcX, srcY, srcW, srcH, 0, 0, canvas.width, canvas.height);

  return canvas.toDataURL('image/jpeg', 0.92);
}
