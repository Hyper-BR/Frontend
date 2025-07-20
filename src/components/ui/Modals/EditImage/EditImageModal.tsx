import { useState } from 'react';
import { Modal } from '@/components/commons/Modal';
import { Button } from '@/components/commons/Button/Button';
import { ImageCropEditor } from '@/components/commons/ImageCrop/ImageCropEditor';
import { getCroppedImage } from '@/utils/getCroppedImage';

interface Props {
  modalId: string;
  title: string;
  aspect?: number;
  onApply: (imageData: string, crop: any) => void;
  onClose: () => void;
}

export function EditImageModal({ modalId, title, aspect = 1, onApply, onClose }: Props) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const handleSelectImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const url = URL.createObjectURL(file);
        setSelectedImage(url);
      }
    };
    input.click();
  };

  const handleApply = async () => {
    if (!selectedImage || !croppedAreaPixels) return;

    const imageData = await getCroppedImage(selectedImage, croppedAreaPixels);
    onApply(imageData, croppedAreaPixels);
    onClose();
  };

  return (
    <Modal.Root modal={modalId} size="md" onClose={onClose}>
      <Modal.Header title={title} />

      <Modal.Content>
        {!selectedImage ? (
          <div style={{ padding: 24 }}>
            <Button onClick={handleSelectImage}>Selecionar imagem</Button>
          </div>
        ) : (
          <ImageCropEditor
            image={selectedImage}
            aspect={aspect}
            onCropComplete={(area) => setCroppedAreaPixels(area)}
          />
        )}
      </Modal.Content>

      <Modal.Footer
        cancelButton={
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
        }
        submitButton={
          <Button onClick={handleApply} disabled={!selectedImage}>
            Aplicar
          </Button>
        }
      />
    </Modal.Root>
  );
}
