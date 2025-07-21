import { useState } from 'react';
import { Modal } from '@/components/commons/Modal';
import { Button } from '@/components/commons/Button/Button';
import { ImageCropEditor } from '@/components/commons/ImageCrop/ImageCropEditor';
import { getCroppedImage } from '@/utils/getCroppedImage';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { updateCustomer } from '@/services/customer';
import { buildFullUrl } from '@/utils/buildFullUrl';
import styles from './EditImageModal.module.scss';

interface Props {
  modalId: string;
  title: string;
  image: string;
  onApply: (imageData: string, crop: any) => void;
  onClose: () => void;
}

export function EditCoverImageModal({ modalId, title, image, onApply, onClose }: Props) {
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const navigate = useNavigate();

  const { customer } = useAuth();

  const handleApply = async () => {
    if (!image || !croppedAreaPixels) return;

    try {
      const imageData = await getCroppedImage(image, croppedAreaPixels, { type: 'cover' });

      const blob = await (await fetch(imageData)).blob();

      const formData = new FormData();
      formData.append('cover', blob, 'cover.png');
      formData.append('avatar', blob, 'avatar.png');

      await updateCustomer(customer.id, formData);
      onClose();
      navigate(0);
    } catch (err) {
      console.error('Erro ao enviar capa:', err);
    }
  };

  return (
    <Modal.Root modal={modalId} size="lg" onClose={onClose}>
      <Modal.Header title={title} />
      <Modal.Content>
        <ImageCropEditor
          image={image}
          aspect={4.77 / 1}
          cropShape="rect"
          initialZoom={1}
          zoomRange={[1, 3]}
          showZoom={true}
          containerSize={{ width: 2480, height: 520 }}
          onCropComplete={setCroppedAreaPixels}
        />
        <div className={styles.avatarPreview}>
          <img src={buildFullUrl(customer.avatarUrl)} alt="Avatar" />
        </div>
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
