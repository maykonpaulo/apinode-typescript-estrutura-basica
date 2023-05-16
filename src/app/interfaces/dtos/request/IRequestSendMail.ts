import { IRequestFromMail } from "./IRequestFromMail";
import { IRequestToMail } from "./IRequestToMail";

interface IRequestSendMail {
  to: IRequestToMail;
  subject: string;
  body: string;
  from?: IRequestFromMail
}

export { IRequestSendMail };
