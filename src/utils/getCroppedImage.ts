interface CropExportOptions {
  type: 'avatar' | 'cover';
}

export async function getCroppedImage(
  imageSrc: string,
  croppedAreaPixels: { x: number; y: number; width: number; height: number },
  options: CropExportOptions,
): Promise<string> {
  const image = new Image();
  image.src = imageSrc;
  await new Promise((resolve) => (image.onload = resolve));

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas context not available');

  const sizes = {
    avatar: { w: 1000, h: 1000 },
    cover: { w: 2480, h: 520 },
  };

  const { w, h } = sizes[options.type];
  canvas.width = w;
  canvas.height = h;

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  const sourceX = croppedAreaPixels.x * scaleX;
  const sourceY = croppedAreaPixels.y * scaleY;
  const sourceWidth = croppedAreaPixels.width * scaleX;
  const sourceHeight = croppedAreaPixels.height * scaleY;

  const scaleToFitX = w / sourceWidth;
  const scaleToFitY = h / sourceHeight;
  const autoScale = Math.max(scaleToFitX, scaleToFitY);

  const finalWidth = sourceWidth * autoScale;
  const finalHeight = sourceHeight * autoScale;

  const offsetX = sourceX - (finalWidth - w) / 2 / autoScale;
  const offsetY = sourceY - (finalHeight - h) / 2 / autoScale;

  ctx.drawImage(image, offsetX, offsetY, sourceWidth, sourceHeight, 0, 0, w, h);

  return canvas.toDataURL('image/jpeg');
}
