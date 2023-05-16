import { container } from "tsyringe";

import { CryptProvider } from "./implementations/CryptProvider";
import { DateProvider } from "./implementations/DateProvider";
import { MailProvider } from "./implementations/MailProvider";
import { ICryptProvider } from "./interfaces/ICryptProvider";
import { IDateProvider } from "./interfaces/IDateProvider";
import { IMailProvider } from "./interfaces/IMailProvider";

container.registerInstance<IDateProvider>("DateProvider", new DateProvider());

container.registerInstance<IMailProvider>("MailProvider", new MailProvider());

container.registerInstance<ICryptProvider>("CryptProvider", new CryptProvider());
