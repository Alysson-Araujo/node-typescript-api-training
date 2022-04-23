import { SetupServer } from '@src/server';
import supertest from 'supertest';
//Esse arquivo é responsável por inicializar o servidor para todos os testes funcionais, não só os forecast

// beforeAll() vai rodar tudo antes dos testes, vai inicializar o server de teste primeiro
beforeAll(() => {
  const server = new SetupServer();
  server.init();
  //o testRequest n tem no global. Para isso, vamos compondo um tipo com outro tipo, seguindo essas
  //características que tem o typescript. Vamos fazer isso no arquivo global.d.ts lá nos arquivos test
  global.testRequest = supertest(server.getApp());
});
