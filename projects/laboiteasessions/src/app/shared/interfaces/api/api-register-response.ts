export interface RegisterResponse {
  token: string;
}

export interface RegisterFailureResponse {
  form_errors: {
    [key: string]: string[] | string;
  };
}

export interface LoginFailureResponse {
  message: string;
}
