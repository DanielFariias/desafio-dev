import { AuthForm } from '../../components/auth-form';
import { AUTH_FORM_ACTIONS } from '../../components/auth-form/helper';

export function RegisterPage() {
  return <AuthForm action={AUTH_FORM_ACTIONS.register} />;
}
