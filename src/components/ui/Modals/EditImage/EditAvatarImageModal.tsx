import { useState } from 'react';
import { Modal } from '@/components/commons/Modal';
import { Button } from '@/components/commons/Button/Button';
import { ImageCropEditor } from '@/components/commons/ImageCrop/ImageCropEditor';
import { getCroppedImage } from '@/utils/getCroppedImage';
import { updateCustomer } from '@/services/customer';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import styles from './EditImageModal.module.scss';

interface Props {
  modalId: string;
  title: string;
  image: string;
  onClose: () => void;
}

export function EditAvatarImageModal({ modalId, title, image, onClose }: Props) {
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const navigate = useNavigate();

  const { customer } = useAuth();

  const handleApply = async () => {
    if (!image || !croppedAreaPixels) return;

    try {
      const imageData = await getCroppedImage(image, croppedAreaPixels, { type: 'avatar' });

      const blob = await (await fetch(imageData)).blob();

      const formData = new FormData();
      formData.append('avatar', blob, 'avatar.png');

      await updateCustomer(customer.id, formData);
      onClose();
      navigate(0);
    } catch (err) {
      console.error('Erro ao enviar avatar:', err);
    }
  };

  return (
    <Modal.Root modal={modalId} size="md" onClose={onClose}>
      <Modal.Header title={title} />
      <Modal.Content>
        <div className={styles.container}>
          <ImageCropEditor
            image={image}
            aspect={1 / 1}
            cropShape="round"
            initialZoom={1}
            zoomRange={[1, 3]}
            showZoom={true}
            containerSize={{ width: 1000, height: 1000 }}
            onCropComplete={setCroppedAreaPixels}
          />
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
