# Typescript NodeJS APIRest

Estrutura básica para iniciar um projeto em `NodeJS` usando `Typescript`.

## Eslint
Configurado por padrão com `airbnb-base`

## Estrutura de pastas

### src/container

Responsável pelo controle das injeções de dependências.

```ts
import { container } from "tsyringe";

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);
```

### src/app/modules

Criado para adicionar os `Controllers` e `Services`.

#### Exemplo:
```
└───modules
    └───users
        └───getUserById
            ├───GetUserByIdController.ts
            └───GetUserByIdService.ts
```

##### `GetUserByIdController.ts`

```ts
import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetUserByIdService } from "./GetUserByIdService";

class GetUserByIdController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const service = container.resolve(GetUserByIdService);

    const getUserById = await service.execute(id);

    return res.json(getUserById);
  }
}

export default new GetUserByIdController();
```

##### `GetUserByIdService.ts`

```ts
import { inject, injectable } from "tsyringe";

@injectable()
class GetUserByIdService {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
  ) { }

  async execute(id: string): Promise<IUserDTO> {
    const user = await this.userRepository.find(id);

    if(!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    return user;
  }
}
```

### src/infra/database/orm_name

`orm_name` deve ser alterado para o nome do ORM que estiver utilizado.

Exemplo:
```
└───src
    └───infra
        └───database
            └───sequelize
                ├───migrations
                ├───models
                └───repositories
```

## tsconfig.json
`orm_name` também deve ser alterado dentro dos `paths` para o mesmo nome da pasta setado acima, para que o endereçamento dos `imports` possa funcionar corretamente.

### Exemplo usando sequelize

Alterar de:
```json
"paths": {
  "@models/*": [
    "infra/database/orm_name/models/*"
  ]
}
```

Para:
```json
"paths": {
  "@models/*": [
    "infra/database/sequelize/models/*"
  ]
}
```

## package.json
`orm_name` também deve ser alterado dentro dos `_moduleAliases` para o mesmo nome da pasta setado acima, para o endereçamento dos `imports` funcionar corretamente após compilado.

### Exemplo usando sequelize

Alterar de:
```json
"_moduleAliases": {
  "@models": "src/infra/database/orm_name/models",
}
```

Para:
```json
"_moduleAliases": {
  "@models": "src/infra/database/sequelize/models",
}
```

## Scripts

### Dependências

Tem por objetivo instalar as dependências básicas em sua última versão.

Instalar dependências:

```console
$ npm run add:deps
```

Instalar dependências dev:

```console
$ npm run add:devdeps
```

### Outros Scripts

Rodar em desenvolvimento:

```console
$ npm run dev
```

Compilar:

```console
$ npm run build
```

## Licença

  [MIT](LICENSE)
