# Desenvolvimento
Para o processo de desenvolvimento selecionei o NodeJS para a execução.
Segmentei os processos em camadas de Infra | Gateway | Services | Route | Middleware e Helpers. Cada um tendo sua responsabilidade de camada. 

Utilizei o Redis para o processo de cache pensando no cenário de muitas requisições para ter um retorno mais rápido dentro de alguns cenários buscas mais repetidas dentro de um ciclo de tempo. O tempo utilizado foi de 300 segundos (5 minutos).

A previsão do tempo utilizei a API do WeatherAPI para as pesquisas via nome da cidade.

A playlist utilizei a API do Spotify para retornar as músicas com base na categoria. No início eu tinha feito um mock de conteúdo com um link do Youtube. Mas usei como referência o processo de Gateway também para isso.

Para os testes unitários utilizei o Vitest. 
Abaixo tem as instruções de execução dos testes.

# Acesso
Link de acesso da API `https://companyhero-api.onrender.com/`.
Realizando um GET no endpoint `api/v1/recommendation/?city=Taubate` passando o parametro da cidade, retorna um objeto com city, state, country, temp_c e um objeto com o array da playlist, contendo title, artist, url, duração e o album.

Para as requisições é necessário a utilização de um Authorization.
Estarei compartilhando o curl com a Olivia.

# Infraestrutura
Utilizei a ferramenta Render `https://render.com/` para a API e para o Redis.
O Render foi escolhido pela praticidade em poder disponibilizar o link para vocês.

Mas pensando em um cenário de Amazon Web Services, utilizaria o ECS para alta disponibilidade e o próprio serviço do Redis dentro da AWS para cache.

Caso GCP ou outros, iria para o mesmo caminho.

O ECS conseguimos configurar para alta escala e tudo sob demanda. Então se houvesse pouco consumo, estaria com o mínimo disponível e em caso de demanda, ele tem um warmup muito rápido pela estratégia do Fargate.

Uma outra possibilidade também seria a utilização de Lambdas para os retornos. Mas o warmup delas não são o dos melhores. Então usar algo que esteja meio que "quente", sempre é uma opção sensata no meu ponto de vista.


# Ferramentas
Gerar a API em Weather API `https://www.weatherapi.com`;

Gerar a key e o secret para o JWT;

Gerar credencial no Spotify;


# Processo de execução do projeto
ENV - preencher as informações do ENV para execução do projeto, conforme o arquivo .env.example na raiz do projeto;
Instalar as depências do projeto
```js
yarn install ou npm install
```
Para executar local o projeto
```js
yarn dev ou npm run dev
```
Para gerar o build do projeto
```js
yarn start:prod ou npm run start:prod
```

# Processo de execução via Docker Compose
Para executar a aplicação via Docker Compose

```js
yarn docker ou npm run docker
```
Para remover a aplicação via Docker Compose

```js
yarn docker:down ou npm run docker:down
```

# Processo de execução dos testes
Vitest com UI
```js
npm run test:ui ou yarn test:ui
```
Vitest sem UI
```js
npm run test ou yarn test
```

# Aprendizados
Durante o desenvolvimento pensei em diversas formas de executar, porém o que fez com que eu executasse dessa forma foi para deixar de forma simples e funcional toda a estrutura.
O pensamento durante todo o desenvolvimento, foi que um "junior" pudesse entender tudo que está sendo executado e como está sendo executado.
Então o desafio de deixar o complexo de forma simples, sempre é desafiador.

# Possibilidades de melhoria
- Escalabilidade:
Nesse ponto poderíamos pensar em diversas situações.
Seja de forma horizontal no qual alocaríamos recursos, por exemplo: o NodeJS tem o recurso de Cluster. Quanto mais CPUs, mais Workers ele consegue gerar.
Mas o cenário acima precisa estar muito bem desenhado, já que quanto mais processos de execução "concorrentes", vejo uma necessidade de uma implementação segura de fila para o reprocessamento em caso de falhas.

- Fallback para requisições de terceiros.
Por exemplo se existe uma falha em uma determinada API no qual ela é o core do negócio em determinadas situações poderíamos fazer a chamada, até que a "principal" volte com a estabilidade.

# Ressalvas
- Cache
Processo de cache com o serviço executando no Render em Oregon. 
Houve uma média de 196ms de tempo de resposta com o cache e 333ms sem o cache.
A latência demostrou relevante quando se trata dentro da mesma região, mas quando a região é diferente, fica uma valor considerável. Mas que ainda assim é bem baixo.

- Segurança
Nesse ponto sou fã de trabalhar com a Cloudflare, utilização de VPN para toda a infraestrutura e redes privadas. 
Com isso o ambiente não fica exposto e conseguimos limitar os acessos ao produto.
Para a aplicação utilizei apenas o Authorization, já que não envolve Login / acesso em si para identificação de um usuário.

- Organização das pastas
Inclusão da pasta gateway para serviços externos, foi uma forma de abstrair a chamada externa, mas deixando uma simples leitura com o caso de uso.
Uma referência seria esse artigo do Martin Fowler sobre o termo. 
https://martinfowler.com/articles/gateway-pattern.html