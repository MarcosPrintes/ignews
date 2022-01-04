# Fundamentos do Next

- Para as rotas, cada pasta criada dentro de /pages será uma rota no navegador

- _app.tsx, é o ponto de entrada para a renderização da aplicação, tudo que for global para o app deverá ser importado ou inserido dentro dele (header, estilos globais ....).

- _app.tsx, possui uma propriedade Component, essa propriedade é quem renderiza o núcleo das páginas conforme são acessadas no navegador, esse mesmo componente recebe as propriedades de cada página.

- index.tsx, é o arquivo raiz da aplicação para a rota "/"

- _document.tsx, sobrescreve o documento base da aplicação (tags <html> e <body>) bem como o <head> para importação de fontes. Como cada página deve ter um título próprio e informações únicas de SEO, dentrod e cada página posso importar componentes como o <Head /> e de meta dados, assim consigo definir títulos e dados customizados para cada página.

- Estilos: para os estilos globais, posso usar a sintaxe padrão para nomear os arquivos (global.scss), quando se tratarem de estilos de componentes devo nomeá-los sempre como módulos, issp ajuda a não haver conflitos para o nomes dos estilos.


## SSR - Chamadas do lado do servidor (Somente em PÁGINAS)
- Com react normalmente fazemos chamadas a api no própria página, por exemplo, ao iniciar uma tela, usar o useEffect para buscar dados da API. No next, podemos fazer essa chamada no lado do servidor e devolver a página toda pronta para o browser, porém, preciso atentar para isso, pois se a página só irá renderizar depois que o servidor do netx devolver o resultado.

- Chamadas SSR só funcionam em páginas, se eu quiser passar informações de uma chamada a API para componentes, elas precisam ser passadas das páginas para os componentes.

- No final da página preciso exportar uma função com o nome "getServerSideProps"

- Agora a página terá acesso as propriedades retornadas pela função getServerSideProps, como ao fazer a desestruturação das props da página o tipo estará setado como 'any', podemos criar uma interface com as mesmas informações retornadas e com seus devidos tipos.

## Adicionando o stripe
```
yarn add stripe
```

Ler a documentação de referência da API do stripe, por lá tenho todas as informações que posso acessar pela lib do stripe.

## Backend no frontend
- No next temos as api roots, como todo arquivo que exporta um componente por default é uma página, conseguimos criar rotas para uma api no frontend, essas rotas são executadas no servidor do next e servem para serem requisitadas pelo frontend. Cada vez que uma rota é executada o next levanta momentaneamente um ambiente serveless, executa a rota é destroi.

```
/pages/api/users => acessando pelo browser tenho acesso a uma listade usuários, somente.
```

## Autenticação
- JWT (storage)
- Next Auth (Autenticação simples, usando terceiros como github, google, etc..., quando não quero armazenar credenciais do usuário no backend)
- Cognito, Auth0...

## Parametrização das rotas
- Para acessar rotas dinâmicas, criamos dentroem pages, o nome desejado da rota e para as rotas dinâmicas utilizamos o padrão:
[id].tsx ou [name].tsx.

- Para o next auth, podemos usar o padrão [...params].ts e tudo que for passado para essa rota será acessível dentro dela.

## Utilizando o Fauna DB
- Banco para aplicações serveless acessível via cloud API.
- Em aplicações serveless não é preciso manter uma conexão aberta com banco de dados.
- A cada nova requisição é "aberta" uma nova conexão com a base, e esse é um processo custoso para bancos como Postgres, MongoDB ...
- FaunaDb, Dynamo AWS são exemplos de bancos de dados para aplicações serveless
- FIREBASE, SUPABASE, FAUNADB, DYNAMO AWS
- O FRONTEND ESTÁ CADA VEZ MAIS GANHANDO RESPONSABILIDADES DE REGRAS DE NEGÓCIOS
- Criar a conta, gerar a chave da API, criar collections (Fauna é um db não relacional)
- Operações serveless não podem ser feitas na página em si, precisam seer feitas via api roots ou pelos métodos
getStaticProps (Static Site Generation) ou getServerSideProps (Server Side Rendering) pois elas não podem ser acessadas pelo usuário no navegador. Rodam apenas no backend da aplicação, nunca no client.
- Documentação de integração do next-auth copm fauna =>  https://next-auth.js.org/adapters/fauna
## Configurações no github
- Deixar o email público, caso não esteja