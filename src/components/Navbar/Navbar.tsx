import { useContext } from 'react';
import { Modal } from '../Modal';
import { Button, Input, Link, useDisclosure } from '@nextui-org/react';
import { Login } from '../Login/Login';
import { AuthContext } from '../../context/AuthContext';
import { Avatar } from '../Avatar';

import './styles.scss';

export const Navbar = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { userSigned: signed, artists } = useContext(AuthContext);

  return (
    <>
      <div className="modal_root">
        <Modal.Root isOpen={isOpen} onOpenChange={onOpenChange}>
          <Modal.Header text="Login" />
          <Modal.Body>
            <div>
              <Link
                className="register_link"
                href={'/customer'}
                onClick={onClose}
              >
                Clique aqui para cadastrar
              </Link>
            </div>
            <Login onOpenChange={onOpenChange} />
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal.Root>
      </div>

      <div className="div_navbar_root">
        <div className="div_nav_logo">
          <Link href={'/'}>Logo</Link>
        </div>
        <div className="div_navbar_items flex">
          <div className="div_nav_item">
            <Link href={'/'}>Gêneros</Link>
          </div>
          <div className="div_nav_item">
            <Link href={'/'}>Músicas</Link>
          </div>
          <div className="div_nav_item">
            <Link href={'/'}>Artistas</Link>
          </div>
        </div>
        <div className="div_nav_search">
          <Input
            label="Procurar"
            isClearable
            classNames={{
              label: 'text-black/50 dark:text-white/90',
              input: [
                'bg-transparent',
                'text-black/90 dark:text-white/90',
                'placeholder:text-default-700/50 dark:placeholder:text-white/60',
              ],
              innerWrapper: 'bg-transparent',
            }}
            placeholder="artistas, músicas, álbums..."
          ></Input>
        </div>
        <div className="div_nav_avatar">
          {/* {signed ? ( */}
          <div className="flex">
            {/* {artists !== null && ( */}
            <div className="upload_button">
              <Button color="default" type="button" variant="ghost">
                <Link href={'/upload'}>Upload</Link>
              </Button>
            </div>
            {/* )} */}
            <div className="avatar_dropdown_nav">
              <Avatar.Root>
                <Avatar.Dropdown image="" />
              </Avatar.Root>
            </div>
          </div>
          {/* ) : ( */}
          <>
            <Button
              color="default"
              type="button"
              variant="ghost"
              onPress={onOpen}
            >
              Entrar
            </Button>
          </>
          {/* )} */}
        </div>
      </div>
    </>
  );
};
