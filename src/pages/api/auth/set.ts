import { authenticationRepository } from "../../../core/service/authenticationService/authenticationRepository";

export default async function handler(req: any, res: any) {
  authenticationRepository.setAuthCookie(req, res);
}
