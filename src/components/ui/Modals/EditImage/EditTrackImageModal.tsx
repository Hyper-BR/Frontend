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

export function EditTrackImageModal({ modalId, title, image, onApply, onClose }: Props) {
  const [crop, setCrop] = useState<any>(null);

  const handleApply = async () => {
    if (!image || !crop) return;
    try {
      const imageData = await getCroppedImage(image, crop, { type: 'avatar' });
      const blob = await (await fetch(imageData)).blob();
      const formData = new FormData();
      formData.append('file', blob);

      const res = await fetch('/api/tracks/image', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();
      console.log('Imagem da track enviada:', result);

      onApply(imageData, crop);
      onClose();
    } catch (err) {
      console.error('Erro ao enviar track:', err);
    }
  };

  return (
    <Modal.Root modal={modalId} size="sm" onClose={onClose}>
      <Modal.Header title={title} />
      <Modal.Content>
        <ImageCropEditor
          image={image}
          aspect={1}
          cropShape="rect"
          initialZoom={1.3}
          zoomRange={[1, 3]}
          showZoom={true}
          containerSize={{ width: 300, height: 300 }}
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
