<p align="center">
   <a href="https://www.linkedin.com/in/filipefmotta/">
      <img alt="filipe Motta" src="https://img.shields.io/badge/-Filipe%20Motta-4e5acf?style=flat&logo=Linkedin&logoColor=white" />
   </a>

  <a aria-label="Last Commit" href="https://github.com/filipefdm/desafio-salaryfits/commits/master">
    <img alt="Last commit on GitHub" src="https://img.shields.io/github/last-commit/filipefdm/desafio-salaryfits?color=4e5acf">
  </a>
</p>

# Desafio da API Node.js com TypeScript, Prisma e Express

Este projeto é uma API desenvolvida em Node.js que utiliza TypeScript como linguagem de programação, Prisma como ORM (Object-Relational Mapping) e Express como framework web. A API tem como objetivo realizar chamadas a uma API externa, persistir os dados recebidos em um banco de dados MySQL e implementar um sistema de armazenamento em um repositório.

# Endpoints da API

A API possui os seguintes endpoints:

## 1. POST /save-weather

Endpoint para salvar o clima da cidade.

### Corpo da requisição

```
{
  "city": "Nome da cidade"
}
```

### Resposta de sucesso

- Status: 200 OK
- Corpo da resposta:
  ```
  {
    "message": "Dados de clima salvos com sucesso."
  }
  ```

## 2. GET /current-weather

Endpoint para obter os dados de clima atual.

### Parâmetros de consulta

- `city` (obrigatório): Nome da cidade.

### Resposta de sucesso

- Status: 200 OK
- Corpo da resposta:
  ```
  {
    "city": "Nome da cidade",
    "temperature": 25,
    "humidity": 70,
    "windSpeed": 10
  }
  ```

## 3. GET /saved-weather

Endpoint para recuperar os dados de clima salvos.

### Resposta de sucesso

- Status: 200 OK
- Corpo da resposta:
  ```
  [
    {
      "city": "Nome da cidade",
      "temperature": 25,
      "humidity": 70,
      "windSpeed": 10
    },
    {
      "city": "Outra cidade",
      "temperature": 22,
      "humidity": 65,
      "windSpeed": 8
    },
    ...
  ]
  ```

## 4. GET /5-day-forecast

Endpoint para obter a previsão do tempo para 5 dias.

### Parâmetros de consulta

- `city` (obrigatório): Nome da cidade.

### Resposta de sucesso

- Status: 200 OK
- Corpo da resposta:
  ```
  {
    "forecasts": [
    {
      "date": "2023-05-28",
      "weather": "Sunny",
      "description": "Clear sky",
      "temperature": 28
    },
    {
      "date": "2023-05-29",
      "weather": "Cloudy",
      "description": "Partly cloudy",
      "temperature": 26
    },
    ...
   ]
  }
  ```

## Funcionalidades

- Realizar chamadas a uma API externa para obter dados
- Armazenar os dados recebidos em um banco de dados MySQL
- Implementar um sistema de armazenamento em um repositório

## Pré-requisitos
- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com)

## Tecnologias

Foram utilizadas as seguintes tecnologias e ferramentas:

- [NodeJS](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [Prisma](https://www.prisma.io/)

## Como executar?

### Server

```bash
# Clone este repositório em sua máquina local utilizando o comando:
git clone https://github.com/filipefdm/desafio-salaryfits.git

# Instale as dependências do projeto
$ cd desafio-salaryfits
$ npm install

# Crie um arquivo de ambiente .env no diretório raiz do projeto e configure as seguintes variáveis de ambiente para conexão com o banco de dados MySQL:
DATABASE_URL=
OPEN_WEATHER_API_KEY=

# Execute as migrações do banco de dados:
$ npx prisma migrate dev

# Rode o servidor:
$ npm run dev
```

Após seguir essas instruções, o servidor estará em execução localmente. Você poderá acessar a API através do endpoint principal http://localhost:3000 e começar a utilizar as funcionalidades fornecidas pela API.

---

Feito com 💜 por [Filipe Motta](https://github.com/filipefdm) 😊
