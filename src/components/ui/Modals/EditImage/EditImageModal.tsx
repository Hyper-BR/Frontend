import { useState } from 'react';
import { Modal } from '@/components/commons/Modal';
import { Button } from '@/components/commons/Button/Button';
import { ImageCropEditor } from '@/components/commons/ImageCrop/ImageCropEditor';
import { getCroppedImage } from '@/utils/getCroppedImage';
import styles from './EditImageModal.module.scss';

interface Props {
  modalId: string;
  title: string;
  aspect?: number;
  image: string;
  onApply: (imageData: string, crop: any) => void;
  onClose: () => void;
}

export function EditImageModal({ modalId, title, aspect = 1, onApply, onClose, image }: Props) {
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const handleApply = async () => {
    if (!image || !croppedAreaPixels) return;

    const imageData = await getCroppedImage(image, croppedAreaPixels);
    onApply(imageData, croppedAreaPixels);
    onClose();
  };

  return (
    <Modal.Root modal={modalId} size="md" onClose={onClose}>
      <Modal.Header title={title} />

      <Modal.Content>
        <ImageCropEditor image={image} aspect={aspect} onCropComplete={(area) => setCroppedAreaPixels(area)} />
      </Modal.Content>

      <Modal.Footer
        cancelButton={
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
        }
        submitButton={
          <Button onClick={handleApply} disabled={!image}>
            Aplicar
          </Button>
        }
      />
    </Modal.Root>
  );
}
