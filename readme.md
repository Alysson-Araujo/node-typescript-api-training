#### Nesse projeto vamos usar ESLint, que é uma ferramenta de análise de código estática para identificar padrões problemáticos encontrados no código JavaScript. O script que adiciona essa dependência no nosso projeto como sendo dev:

- OBS: tive que instalar o nvm e colocar a versão mais recente do node para colocar o eslint

``` shell

yarn add -D @typescript-eslint/eslint-plugin eslint @typescript-eslint/parser

```
<br>
<br>

Precisamos desse comando abaixo para executar o eslint no código do projeto.

> "lint": "eslint ./src ./test --ext .ts",

>    "lint:fix": "eslint ./src ./test --ext .ts --fix"

O fix serve para fixar o problema no código para nós. Se um acabar quebrando, o outro vai e arruma.

<br>
<br>
<br>

### Setup do modo de desenvolvimento

Aqui vamos usar o ts-node-dev que consegue compilar apenas os arquivos que foram mudados. Isso diminui o trabalho de toda hora ter que compilar a mão toda mudança feita dentro do código. Para adicionar essa dependência como dev, usamos o seguinte script:

~~~
yarn add -D ts-node-dev
~~~

Isso é muito bom para a parte de desenvolvimento, porém é desnecessário para produção. 


<br>
<br>

### Jest 
É uma estrutura de teste JavaScript mantida pela Meta, projetada e construída por Christoph Nakazawa com foco na simplicidade e suporte para grandes aplicativos da web. Segue abaixo o script de instalação dele mais seus tipos:

~~~
yarn add -D jest ts-jest @types/jest
~~~

Temos os testes globais e a outra são para teste funcionais.

Em conjunto com o jest, temos o supertest para poder rodar o servidor no modo de teste. Ele é bem útil, pois não precisamos subir o express pra testar a aplicação de end-2-end, aí podemos fazer requisições para a aplicação sem precisar chamar pela url. Segue abaixo o script de instalação dele mais seus tipos:

~~~
yarn add -D supertest  @types/supertest 
~~~

no package.json, "test:functional": "jest --projects ./test --runInBand" onde runInBand serve para podermos fazer os teste em ordem e não em paralelo.

### Início da construção da API

Primeiramente vamos instalar as dependêcias que iremos usar nessa API. Aqui vamos usar o express, body-parser pois vamos precisamos especificar o formato do body (que será json) e o overnightjs que será de fato o framework que será utilizado no back-end, mais do que o express.

~~~
yarn add express body-parser @overnightjs/core
yarn add -D @types/express
~~~

após isso, podemos criar a base do server no src/server.ts

Uma coisa importante relacionada a criar tipos de outros tipos está nesse vídeo ![aqui](https://youtu.be/OJYsN4DcLQQ?t=1413). Isso é importante para fazer os testes da aplicação. Esse ![link](https://stackoverflow.com/questions/39040108/import-class-in-definition-file-d-ts/51114250#51114250) explica um pouco como funciona o arquivos do tipo **.d.ts**. Realmente é bom ver essa parte, ela é um diferencial.

- Obs: mudei "@types/node": "^17.0.23" em package.json para "@types/node": "^14.0.0", pois estava dando problema em criar o tipo global.testResponse.

Também coloquei npm install --dev ts-node pois estava com problemas em importar alguns módulos.

<br>
<br>
<br>

## Prettier para organizar o código

Para organizar os códigos do projeto, usamos o Prettier. Primeiro adicionamos ele como uma dependência de dev. e em seguida criamos um arquivo chamado .prettierrc onde irá conter os estilos do código que desejamos colocar. Comando para adicionar ele:

```script
yarn add -D prettier
```

Dicas: 
-     "semi": true, refere a colocar ; no fim de cada linha
-     "singleQuote": true, se refere a usar aspas simples 

<br>

Após isso, vamos adicionar um comando no package.json para a gente conseguir executar o prettier. Segue o comando abaixo:

```json
"style:check":"prettier --check 'src/**/*.ts' 'test/**/*.ts'"
```

Por fim, para executar o comando basta usar esse comando:

~~~~
yarn style:check
~~~~

Obs: Caso tenha algum erro, coloque o seguinte comando no package.json:

```json
"style:fix":"prettier --write 'src/**/*.ts' 'test/**/*.ts'"
```


#

### Criando o API client para consumir a API externa de meteorologia

Inicialmente, vamos fazer a configuração para executar testes unitários. Para isso vamos colocar o comando abaixo no package.json. Vamos apenas colocar o "jest" no valor, pois vamos ter as configurações globais que estão configurados no jest.config.js. 

```json
    "test:unit":"jest"
```


Vamos falar um pouco sobre a estrutura da API. 

Vamos ter os controllers onde vão receber as requisições e delegar para alguma coisa. E nós vamos ter uma lógica específica para falar com os recursos internos (falar com BD são modulos) e externos (são clients).

Vamos criar as pastas clients/__test__ dento do src. Ele servirá para colocar os testes que envolvem os clients e como temos o jest, que consegue localizar todos os testes presentes no projeto.

**DICA:** Para que fique rodando os testes automaticamente, usamos o seguinte comando:
```script
    yarn test:unit --watch
```

<br>

Para fazer um fatch em uma API externa, vamos precisar de uma biblioteca onde disponibilize uma de fazer requisição http. Nesse projeto, vamos usar o **Axios**. Vamos adicionar o Axios e seus tipos no projeto da seguinte forma:

```script
    yarn add axios && yarn add -D @types/axios
``` 

<br>

Para ter uma compreensão melhor do sistema de testes comunicação com uma API externa, seria bom ler um pouco sobre o jest.mack('axios'). [link](https://jestjs.io/pt-BR/docs/mock-functions)

além disso pesquisar também sobre o axios e seus métodos, e jest e seus métodos.

<br>
<br>

### Normalização de dados

[Link da parte explicando](https://youtu.be/x4Llr0DwOaA?t=703)

É bom dar uma lida sobre [Partial](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype) do TS. 

A parte de normalização vai ser feita por duas funções:
- isValidPoint
- normalizeResponse

Elas estão em clients/StormGlass.ts