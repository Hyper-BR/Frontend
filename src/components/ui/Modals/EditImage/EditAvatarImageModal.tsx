import { useRef, useState, useEffect } from 'react';
import { Modal } from '@/components/commons/Modal';
import { Button } from '@/components/commons/Button/Button';
import { ImageCropEditor } from '@/components/commons/ImageCrop/ImageCropEditor';
import { updateCustomer } from '@/services/customer';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface Props {
  modalId: string;
  title: string;
  image: string;
  onClose: () => void;
}

export function EditAvatarImageModal({ modalId, title, image, onClose }: Props) {
  const navigate = useNavigate();
  const { customer } = useAuth();
  const [editorCanvas, setEditorCanvas] = useState<HTMLCanvasElement | null>(null);

  const handleApply = async () => {
    if (!editorCanvas) return;

    try {
      const blob = await new Promise<Blob>((resolve) => editorCanvas.toBlob((b) => b && resolve(b), 'image/png', 0.92));

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
    <Modal.Root modal={modalId} size="fit" onClose={onClose}>
      <Modal.Header title={title} />
      <Modal.Content>
        <ImageCropEditor
          image={image}
          cropShape="round"
          zoomRange={[1, 10]}
          showZoom={true}
          containerSize={{ width: 320, height: 320 }}
          onCropComplete={(canvas) => setEditorCanvas(canvas)}
        />
      </Modal.Content>
      <Modal.Footer
        cancelButton={
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
        }
        submitButton={
          <Button onClick={handleApply} disabled={!editorCanvas}>
            Aplicar
          </Button>
        }
      />
    </Modal.Root>
  );
}
