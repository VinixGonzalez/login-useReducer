export type FormState = {
  username: string;
  password: string;
  loading: boolean;
  error: boolean;
  isLoggedIn: boolean;
};

export type FormAction = {
  type: "changeField" | "login" | "logout" | "success" | "error";
  field?: string;
  value?: string | number;
};

export type AuthProps = {
  username: string;
  password: string;
};
