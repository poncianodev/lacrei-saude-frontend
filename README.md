# Lacrei Saúde — Frontend

Boilerplate para o desafio técnico, com Next.js 15 (App Router), React 19,
TypeScript e Styled Components. As páginas do desafio ainda não foram implementadas.

## Instalação

Ambiente de referência: Node.js 24 e npm 11. Utilize o lockfile para reproduzir as dependências:

```bash
npm ci
```

No Windows corporativo com inspeção HTTPS, execute instalações no Git Bash utilizando os certificados do sistema:

```bash
NODE_USE_SYSTEM_CA=1 npm ci
```

Não desabilite a validação SSL. Em caso de erro de certificado ou falta de espaço,
interrompa a instalação e resolva o problema do ambiente antes de continuar.

## Desenvolvimento

```bash
npm run dev
```

Acesse http://localhost:3000. Nenhuma variável de ambiente ou API é necessária.

## Validação

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Para testes em modo de observação, execute `npm run test:watch`.
O Vitest utiliza jsdom, React Testing Library e os matchers do jest-dom,
com limpeza do DOM após cada teste. Os testes ficam junto aos arquivos testados.

## Produção local

```bash
npm run build
npm start
```

## Estrutura

```text
public/images/   Imagens futuras
src/
  app/          Rotas, layout, providers, reset CSS e teste inicial
  components/   Componentes compartilhados futuros
  lib/          Registro SSR de Styled Components
  mocks/        Mocks futuros, sem integração com API real
  styles/       Tema neutro tipado e estilos globais
vitest.config.mts
vitest.setup.ts
```

As pastas vazias usam `.gitkeep` para serem preservadas pelo Git.
O compilador do Next.js habilita Styled Components. O registro de estilos coleta
o CSS no servidor e o insere durante o streaming do App Router. O provider aplica
o mesmo tema no servidor e no cliente. O layout e a página continuam Server Components.

O CSS global contém apenas um reset básico. As cores e fontes provisórias ficam
em `src/styles/theme.ts`; não constituem um design system da Lacrei Saúde.
São usadas fontes do sistema, sem downloads do Google Fonts.
