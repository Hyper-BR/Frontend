import { Button, Checkbox, Input, Link } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { LoginDTO } from '../../services/customer/types';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';

import './styles.scss';

interface LoginProps {
  onOpenChange: (isOpen: boolean) => void;
}

export const Login = ({ onOpenChange }: LoginProps) => {
  const { signIn } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();

  async function handleLogin(data: LoginDTO) {
    try {
      await signIn(data);
      onOpenChange(false);
    } catch (error) {
      console.log('Error to logIn', error);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleLogin)}>
        <Input {...register('email')} type="text" placeholder="Email" />
        <Input
          {...register('password')}
          type="password"
          placeholder="Password"
        />

        <Button color="default" type="submit" variant="shadow">
          Entrar
        </Button>

        <div className="flex py-2 px-1 justify-between">
          {/* <Checkbox
            classNames={{
              label: 'text-small',
            }}
          > */}
          Relembrar
          {/* </Checkbox> */}
          {/* <Link color="primary" href="#" size="sm"> */}
          Esqueceu a senha?
          {/* </Link> */}
        </div>
      </form>
    </>
  );
};
