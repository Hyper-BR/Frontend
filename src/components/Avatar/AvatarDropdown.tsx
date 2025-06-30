import { ArtistDTO } from '@/src/services/artist/types';
import { AuthContext } from '../../context/AuthContext';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  DropdownSection,
  User,
  Link,
  Button,
  Chip,
} from '@nextui-org/react';
import { HtmlHTMLAttributes, useContext, useEffect } from 'react';
import { parseCookies } from 'nookies';

interface AvatarDropdownProps extends HtmlHTMLAttributes<HTMLButtonElement> {
  image: string;
}

export function AvatarDropdown({ image }: AvatarDropdownProps) {
  const { signOut, artists, selectArtist, updateUserInfo, artist } =
    useContext(AuthContext);
  const { user } = parseCookies();

  function handleSignOut() {
    signOut();
  }

  function handleSelectArtist(id: number) {
    selectArtist(id);
  }

  useEffect(() => {
    updateUserInfo(user);
  }, []);

  return (
    <div>
      <Dropdown>
        <DropdownTrigger>
          <Avatar
            isBordered
            as={Button}
            className="transition-transform"
            src={image}
            alt="Avatar"
          />
        </DropdownTrigger>

        <DropdownMenu>
          <DropdownSection aria-label="Artist Profiles" showDivider>
            {artists !== null &&
              artists.map((item: ArtistDTO) => (
                <DropdownItem
                  key={item.id}
                  textValue={item.username}
                  onClick={() => handleSelectArtist(item.id)}
                >
                  <div>
                    <User
                      avatarProps={{
                        size: 'md',
                        src: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
                      }}
                      description={'Credits: ' + item.credits}
                      name={item.username}
                    />
                    <div>{artist.id === item.id && <Chip>Ativo</Chip>}</div>
                  </div>
                </DropdownItem>
              ))}
          </DropdownSection>

          <DropdownSection aria-label="Profile Actions" showDivider>
            <DropdownItem key="artist_profile" textValue="Seja um artista!">
              <Link href={'/artist/register'}>Criar perfil de artista</Link>
            </DropdownItem>
          </DropdownSection>
          <DropdownSection aria-label="Profile Actions">
            <DropdownItem key="profile" textValue="Perfil">
              <Link href={'/profile'}>Perfil</Link>
            </DropdownItem>
            <DropdownItem key="settings" textValue="Configurações">
              Configurações
            </DropdownItem>
            <DropdownItem
              key="logout"
              color="danger"
              onClick={handleSignOut}
              textValue="Sair"
            >
              Sair
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
