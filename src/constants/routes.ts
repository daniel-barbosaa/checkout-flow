export const ROUTES = {
  auth: {
    signIn: "/account/signin",
    signUp: "/account/signup",
    signOut: "/api/sair",
  },

  dashboard: {
    main: "/",
    patients: {
      main: "/pacientes",
      details: {
        info: (id: string) => `/pacientes/${id}/informacoes`,
        history: (id: string) => `/pacientes/${id}/historico`,
      },
    },
    forwarded: {
      main: "/encaminhados",
    },
    approvals: {
      main: "/aprovacoes",
    },
    teams: {
      main: "/equipes",
      specialists: "/equipes/especialistas",
    },
    settings: {
      main: "/configuracoes",
    },
    support: {
      main: "/suporte",
    },
  },
};
