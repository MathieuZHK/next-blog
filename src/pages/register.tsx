import { authenticationRepository } from "../core/service/authenticationService/authenticationRepository";
import { userRepository } from "../core/service/userService/userRepository";
import { RoleEnum } from "../core/enum/RoleEnum";
import RegisterForm from "../compoments/register-form/RegisterForm";
import NavBar from "../compoments/nav-bar/NavBar";

export default function Register() {
  const onRegister = async (
    email: string,
    password: string,
    nickName: string
  ) => {
    const respAuthUser = await authenticationRepository.signUp({
      email: email,
      password: password,
    });
    const respUser = await userRepository.createUser({
      nickname: nickName,
      role: RoleEnum.USER,
      auth_user_id: respAuthUser.user?.id,
    });
  };

  return (
    <>
      <RegisterForm onRegister={onRegister} />
    </>
  );
}
