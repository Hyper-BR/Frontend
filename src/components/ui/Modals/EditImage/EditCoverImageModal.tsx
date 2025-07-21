import { useState } from 'react';
import { Modal } from '@/components/commons/Modal';
import { Button } from '@/components/commons/Button/Button';
import { ImageCropEditor } from '@/components/commons/ImageCrop/ImageCropEditor';
import { getCroppedImage } from '@/utils/getCroppedImage';

interface Props {
  modalId: string;
  title: string;
  image: string;
  onApply: (imageData: string, crop: any) => void;
  onClose: () => void;
}

export function EditCoverImageModal({ modalId, title, image, onApply, onClose }: Props) {
  const [crop, setCrop] = useState<any>(null);

  const handleApply = async () => {
    if (!image || !crop) return;
    try {
      const imageData = await getCroppedImage(image, crop);
      const blob = await (await fetch(imageData)).blob();
      const formData = new FormData();
      formData.append('file', blob);

      const res = await fetch('/api/profile/cover', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();
      console.log('Capa enviada:', result);

      onApply(imageData, crop);
      onClose();
    } catch (err) {
      console.error('Erro ao enviar capa:', err);
    }
  };

  return (
    <Modal.Root modal={modalId} size="md" onClose={onClose}>
      <Modal.Header title={title} />
      <Modal.Content>
        <ImageCropEditor
          image={image}
          aspect={16 / 9}
          cropShape="rect"
          initialZoom={1.2}
          zoomRange={[1, 3]}
          showZoom={true}
          containerSize={{ width: 640, height: 360 }}
          onCropComplete={setCrop}
        />
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
