import { AuthForm } from '../../components/auth-form';
import { AUTH_FORM_ACTIONS } from '../../components/auth-form/helper';

export function LoginPage() {
  return <AuthForm action={AUTH_FORM_ACTIONS.login} />;
}
