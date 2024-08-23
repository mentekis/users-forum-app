interface IUserRegister {
  name: string;
  email: string;
  password: string;
}

interface IUserLogin {
  email: string;
  password: string;
}

export { IUserRegister, IUserLogin };
