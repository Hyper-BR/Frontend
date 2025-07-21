interface CropExportOptions {
  type: 'avatar' | 'cover';
}

export async function getCroppedImage(
  imageSrc: string,
  croppedAreaPixels: { x: number; y: number; width: number; height: number },
  options: { type: 'cover' | 'avatar' },
): Promise<string> {
  const image = new Image();
  image.src = imageSrc;
  await new Promise((r) => (image.onload = r));

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

  ctx.drawImage(
    image,
    croppedAreaPixels.x,
    croppedAreaPixels.y,
    croppedAreaPixels.width,
    croppedAreaPixels.height,
    0,
    0,
    w,
    h,
  );

  return canvas.toDataURL('image/jpeg');
}
