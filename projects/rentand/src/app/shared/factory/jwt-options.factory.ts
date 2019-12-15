export function jwtOptionsFactory() {
  return {
    tokenGetter: () => {
      return localStorage.getItem('token');
    },
    skipWhenExpired: true
  };
}
