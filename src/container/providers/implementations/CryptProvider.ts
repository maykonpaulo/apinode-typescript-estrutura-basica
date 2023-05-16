import bcrypt from "bcryptjs";

import { ICryptProvider } from "../interfaces/ICryptProvider";

class CryptProvider implements ICryptProvider {
  async compare(hash: string, stringToCheck: string): Promise<boolean> {
    return bcrypt.compare(stringToCheck, hash);
  }

  async hash(stringToHash: string): Promise<string> {
    return bcrypt.hash(stringToHash, 8);
  }
}

export { CryptProvider };
