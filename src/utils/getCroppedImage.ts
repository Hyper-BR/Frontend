interface CropExportOptions {
  type: 'avatar' | 'cover';
}

export async function getCroppedImage(imageSrc: string, crop: any, options: CropExportOptions): Promise<string> {
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

  ctx.drawImage(image, crop.x, crop.y, crop.width, crop.height, 0, 0, w, h);

  return canvas.toDataURL('image/jpeg');
}
