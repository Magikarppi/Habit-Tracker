interface Username {
  type: string;
  value: string;
  onChange: () => void;
  reset: () => void;
}

interface Password {
  type: string;
  value: string;
  onChange: () => void;
  reset: () => void;
}

export interface SignUpProps {
  username: Username;
  password: Password;
  handleSignUpSubmit: () => void;
}

export interface LoginProps {
  username: Username;
  password: Password;
  handleLoginSubmit: () => void;
}
