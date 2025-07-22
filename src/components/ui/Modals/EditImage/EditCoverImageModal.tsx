import { useState } from 'react';
import { Modal } from '@/components/commons/Modal';
import { Button } from '@/components/commons/Button/Button';
import { ImageCropEditor } from '@/components/commons/ImageCrop/ImageCropEditor';
import { useAuth } from '@/hooks/useAuth';
import { updateCustomer } from '@/services/customer';
import { useNavigate } from 'react-router-dom';

interface Props {
  modalId: string;
  title: string;
  image: string;
  onClose: () => void;
}

export function EditCoverImageModal({ modalId, title, image, onClose }: Props) {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const { customer } = useAuth();
  const navigate = useNavigate();

  const handleApply = async () => {
    try {
      if (!canvas) {
        console.warn('Canvas não está disponível para exportação');
        return;
      }

      canvas.toBlob(
        async (blob) => {
          try {
            if (!blob) {
              console.error('Erro ao gerar blob da imagem');
              return;
            }

            const formData = new FormData();
            formData.append('cover', blob, 'cover.jpg');

            await updateCustomer(customer.id, formData);
            onClose();
            navigate(0);
          } catch (uploadError) {
            console.error('Erro ao atualizar imagem de capa:', uploadError);
          }
        },
        'image/jpeg',
        0.9,
      );
    } catch (err) {
      console.error('Erro inesperado ao processar imagem de capa:', err);
    }
  };

  return (
    <Modal.Root modal={modalId} size="fit" onClose={onClose}>
      <Modal.Header title={title} />
      <Modal.Content>
        <ImageCropEditor
          image={image}
          cropShape="rect"
          showZoom={false}
          zoomRange={[1, 10]}
          containerSize={{ width: 500, height: 100 }}
          outputSize={{ width: 1000, height: 200 }}
          onCropComplete={setCanvas}
        />
      </Modal.Content>

      <Modal.Footer
        cancelButton={
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
        }
        submitButton={
          <Button onClick={handleApply} disabled={!canvas}>
            Aplicar
          </Button>
        }
      />
    </Modal.Root>
  );
}
