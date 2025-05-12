export const AUTH_FORM_CONFIG = {
  login: {
    title: 'Entrar',
    submitButtonText: 'Login',
    apiEndpoint: '/auth/login',
    redirectPath: '/',
    redirectText: 'Não tem uma conta?',
    redirectLink: '/register',
    successMessage: 'Login realizado com sucesso!',
    errorMessage: 'Erro ao realizar login. Tente novamente.',
  },
  register: {
    title: 'Criar Conta',
    submitButtonText: 'Cadastrar',
    apiEndpoint: '/auth/register',
    redirectPath: '/login',
    redirectText: 'Já tem uma conta?',
    redirectLink: '/login',
    successMessage: 'Cadastro realizado com sucesso! Faça login.',
    errorMessage: 'Erro ao cadastrar. Tente novamente.',
  },
};

export const AUTH_FORM_ACTIONS = {
  login: 'login',
  register: 'register',
} as const;
