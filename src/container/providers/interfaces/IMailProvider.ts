import { IRequestSendMail } from "@interfaces/dtos/request/IRequestSendMail";

interface IMailProvider {
  sendMail({
    to, subject, body, from,
  }: IRequestSendMail): Promise<{ enviado: boolean, error?: string }>
}

export { IMailProvider };
