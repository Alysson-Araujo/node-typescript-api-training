## Promise é um objeto usado para processamento assíncrono. Um Promise (de "promessa") representa um valor que pode estar disponível agora, no futuro ou nunca.

Uma Promise representa um proxy para um valor que não é necessariamente conhecido quando a promessa é criada. Isso permite a associação de métodos de tratamento para eventos da ação assíncrona num caso eventual de sucesso ou de falha. Isto permite que métodos assíncronos retornem valores como métodos síncronos: ao invés do valor final, o método assíncrono retorna uma promessa ao valor em algum momento no futuro.

Um Promise está em um destes estados: 

pending (pendente): Estado inicial, que não foi realizada nem rejeitada.
fulfilled (realizada): sucesso na operação.
rejected (rejeitado):  falha na operação.
Uma promessa pendente pode se tornar realizada com um valor ou rejeitada por um motivo (erro). Quando um desses estados ocorre, o método then do Promise é chamado, e ele chama o método de tratamento associado ao estado (rejected ou resolved).  Se a promessa foi realizada ou rejeitada quando o método de tratamento correspondente for associado, o método será chamado, desta forma não há uma condição de competição entre uma operação assíncrona e seus manipuladores que estão sendo associados.

[Link explicando mais aprofundado sobre o Promise.](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise)

<br>