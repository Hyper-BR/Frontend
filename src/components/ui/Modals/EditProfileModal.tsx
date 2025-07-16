import { useState } from 'react';
import { Modal } from '@/components/commons/Modal';
import { useModal } from '@/contexts/ModalContext';
import { Input } from '@/components/commons/Input/Input';
import { Button } from '@/components/commons/Button/Button';
import { Droppable } from '@/components/commons/Droppable/Droppable';
import styles from './EditProfileModal.module.scss';
import { CustomerDTO } from '@/services/customer/types';
import { useAuth } from '@/hooks/useAuth';

const EditProfileModal = () => {
  const [loading, setLoading] = useState(false);
  const { closeModal } = useModal();
  const { customer } = useAuth();

  const [form, setForm] = useState<CustomerDTO>({
    name: customer?.name,
    email: customer?.email,
    birthDate: customer?.birthDate,
    country: customer?.country,
    avatarUrl: customer?.avatarUrl,
  });

  const handleChange =
    (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
    };

  const handleDrop = (files: File[]) => {
    const image = files[0];
    if (image) setForm((prev) => ({ ...prev }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Perfil editado:', form);
      closeModal();
    } catch (err) {
      alert('Erro ao enviar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal.Root modal="editProfile" size="md" onClose={closeModal}>
      <Modal.Header title="Editar Perfil" />

      <Modal.Content>
        <form onSubmit={handleSubmit} className={styles.editForm}>
          <div className={styles.topSection}>
            <Droppable
              label="Upload do avatar"
              onDrop={handleDrop}
              shape="round"
              size="md"
              accept="image/*"
            />
            {form?.avatarUrl && (
              <img
                src={form?.avatarUrl}
                alt="Avatar"
                className={styles.coverPreview}
              />
            )}

            <div className={styles.metadata}>
              <Input
                label="Nome"
                placeholder="Seu nome"
                value={form.name}
                onChange={handleChange('name')}
                width="md"
              />
              <Input
                label="Email"
                type="email"
                placeholder="email@dominio.com"
                value={form.email}
                onChange={handleChange('email')}
                width="md"
              />
              <Input
                label="Data de Nascimento"
                placeholder="DD/MM/AAAA"
                value={form.birthDate}
                onChange={handleChange('birthDate')}
                width="md"
              />
              <Input
                label="País"
                placeholder="Brasil"
                value={form.country}
                onChange={handleChange('country')}
                width="md"
              />
            </div>
          </div>
        </form>
      </Modal.Content>

      <Modal.Footer
        cancelButton={
          <Button variant="ghost" onClick={closeModal}>
            Cancelar
          </Button>
        }
        submitButton={
          <Button type="submit" loading={loading}>
            Salvar
          </Button>
        }
      />
    </Modal.Root>
  );
};

export default EditProfileModal;
