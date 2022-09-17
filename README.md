# Boas-vindas ao repositório do Car Shop!

<details>
  <summary>
    <strong> 🐳 Como subir o banco do MongoDB usando Docker</strong>
  </summary><br>

  Caso não tenha o MongoDB instalado em sua máquina e deseje usar o Docker, é só seguir os passos a seguir:

  1. Baixe a imagem do MongoDB:

  ```sh
  docker pull mongo
  ```

  2. Crie o contêiner do MongoDB:

  ```sh
  docker run --name <nome-do-container> -p 27017:27017 -d mongo
  ```

  3. Confira se o contêiner está rodando:

  ```sh
  docker ps
  ```

</details>

<details>
  <summary>
    <strong>🐳 Rodando no Docker vs Localmente</strong>
  </summary><br>

  ## Docker

  > Rode os serviços `node` e `mongodb` com o comando `docker-compose up -d`.
  - Lembre-se de parar o `mongo` se estiver usando localmente na porta padrão (`27017`), ou adapte, caso queria fazer uso da aplicação em containers
  - Esses serviços irão inicializar um container chamado `car_shop` e outro chamado `car_shop_db`.
  - A partir daqui você pode rodar o container `car_shop` via CLI ou abri-lo no VS Code.

  > Use o comando `docker exec -it car_shop bash`.
  - Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.

  > Instale as dependências [**Caso existam**] com `npm install`
  
  ⚠ Atenção ⚠ Caso opte por utilizar o Docker, **TODOS** os comandos disponíveis no `package.json` (npm start, npm test, npm run dev, ...) devem ser executados **DENTRO** do container, ou seja, no terminal que aparece após a execução do comando `docker exec` citado acima. 

  ⚠ Atenção ⚠ O **git** dentro do container não vem configurado com suas credenciais. Ou faça os commits fora do container, ou configure as suas credenciais do git dentro do container.

  ⚠ Atenção ⚠ Não rode o comando npm audit fix! Ele atualiza várias dependências do projeto, e essa atualização gera conflitos com o avaliador.


  ✨ **Dica:** A extensão `Remote - Containers` (que estará na seção de extensões recomendadas do VS Code) é indicada para que você possa desenvolver sua aplicação no container Docker direto no VS Code, como você faz com seus arquivos locais.

  <img src="images/remote-container.png" width="800px" >

  ## Localmente

  > Instale as dependências [**Caso existam**] com `npm install`
  
  ⚠ Atenção ⚠ Não rode o comando npm audit fix! Ele atualiza várias dependências do projeto, e essa atualização gera conflitos com o avaliador.

  ✨ **Dica:** Para rodar o projeto desta forma, obrigatoriamente você deve ter o `node` instalado em seu computador.
  ✨ **Dica:** O avaliador espera que a versão do `node` utilizada seja a 16.

</details>

<details>
  <summary>
    <strong>👷 Estruturação do projeto </strong>
  </summary><br>

  ## Estrutura das pastas dentro de `src`

  ⚠️**Importante**: é muito importante que a estrutura da imagem a seguir seja mantida para que os testes funcionem da maneira desejada.

  ![Estrutura de arquivos](./public/folder_structure.png)



  ⚠️**Importante**: Os testes do projeto DEVEM ser de unidade, testando cada camada ⚠️

</details>

<details>
  <summary>
    <strong>✅ Arquivos prontos para uso</strong>
  </summary><br>

  - O arquivo `src/models/connection.ts` possui o código necessário para realizar a conexão com o banco de dados:

  ```typescript
  import mongoose from 'mongoose';

  const MONGO_DB_URL = 'mongodb://localhost:27017/CarShop';
  const MONGO_DB_URL = 'mongodb://mongodb:27017/CarShop';

  const connectToDatabase = (
    mongoDatabaseURI = process.env.MONGO_URI
      || MONGO_DB_URL,
  ) => mongoose.connect(mongoDatabaseURI);

  export default connectToDatabase;

  ```

  - O arquivo `src/app.ts` contém o código necessário para subir o servidor:

  ```typescript
  import express from 'express';

  const app = express();

  export default app;

  ```
  ⚠️**Importante**: é muito importante que o arquivo `src/app.ts` exporte uma instância do `app express` para que os testes funcionem. ⚠️
</details>

<details>
  <summary>
    <strong>🔥⚠️ Tenha atenção para os seguintes pontos: ⚠️🔥</strong>
  </summary><br>

  ➡️ A conexão do banco local contida no arquivo `src/models/connection.ts` deverá estar na seguinte variável, ou no `.env`:

  ```typescript
  const MONGO_DB_URL = 'mongodb://localhost:27017/CarShop';
  ```
  - Para o avaliador funcionar mantenha a opção padrão com de URI do mongo como `process.env.MONGO_URI` em `src/models/connection.ts` :

  ```typescript
  const connectToDatabase = (
    mongoDatabaseURI = process.env.MONGO_URI // mantenha a env aqui
      || MONGO_DB_URL,
  ) => mongoose.connect(mongoDatabaseURI);
  ```

  ➡️ Lembre-se de não entregar o projeto com nenhum teste ignorado. Testes ignorados serão tratados como testes falhando!

  ➡️ Não apague, em hipótese alguma, qualquer teste ou arquivo deste repositório.

  ➡️ `src/models`, `src/services`, `src/controllers`, `src/interfaces` e seus respectivos arquivos criados durante a execução do projeto, devem seguir à risca os nomes informados no README.

  ➡️ Não altere ou instale novas dependências no arquivo `packages.json`, pois o mesmo está travado para essa avaliação.

</details>


