export async function getCroppedImage(imageSrc: string, crop: any): Promise<string> {
  const image = new Image();
  image.src = imageSrc;
  await new Promise((r) => (image.onload = r));

  const canvas = document.createElement('canvas');
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext('2d');

  ctx?.drawImage(image, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height);

  return canvas.toDataURL('image/jpeg');
}
