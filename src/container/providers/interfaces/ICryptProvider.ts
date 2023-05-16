interface ICryptProvider {
  compare(hash: string, stringToCheck: string): Promise<boolean>;
  hash(stringToHash: string): Promise<string>;
}

export { ICryptProvider };
