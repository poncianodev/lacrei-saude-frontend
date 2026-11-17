# Lacrei Saúde — Frontend

Boilerplate para o desafio técnico, com Next.js 15 (App Router), React 19,
TypeScript e Styled Components, com duas páginas demonstrativas do desafio.

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
public/assets/   Logos e ícones institucionais da demonstração
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
o mesmo tema no servidor e no cliente. As rotas usam entradas Server Components
e composições visuais/interativas Client Components.

## Fundação visual Marsha — etapa 1

Nunito é carregada por `next/font/local`, com `display: swap` e a variável
`--font-nunito`. O arquivo variável original (TTF, pesos 200–1000, incluindo
400/600/700) e a licença SIL OFL 1.1 estão em `src/styles/fonts/`.
O build não precisa acessar Google Fonts. Origem e hashes estão documentados
no [registro da fonte local](src/styles/fonts/README.md).

Os tokens em `src/styles/theme.ts` seguem as referências fornecidas para esta etapa:
13 estilos tipográficos, espaçamentos, raios, bordas, opacidades, paradas dos três
gradientes e breakpoints 600/1024/2560px. A escala em rem considera base de 16px.
As cores semânticas, todas as sombras e o ângulo de 90° dos gradientes são
**provisórios**, aguardando documentação oficial. Os breakpoints seguem mobile-first;
não há limite fixo de largura para telas ultra-wide nesta fundação.

Componentes em `src/components`: `Button` (primary, secondary, danger, loading),
`Input` (label, ajuda, erro), `Card`, `Typography`, `Header`, `Footer`,
`LoadingState`, `EmptyState` e `ErrorState`.
Use `Typography as="h1" $variant="headline-lg"` para separar tamanho e semântica.
`Card` aceita `headingLevel`, `status`, conteúdo complementar e ações.
`Button` usa `type="button"` por padrão; use `type="submit"` em formulários.

Header aceita slots `brand`, `search`, `help` e `userMenu`. Footer aceita `brand`,
`links`, `socialLinks` e `legal`. Destinos reais e conteúdo legal devem ser fornecidos
pelas páginas; listas vazias não geram links de navegação opcionais. Header e footer
usam logos institucionais locais, com link para Home, integrados na etapa 3.2.
As páginas compõem esses componentes com navegação e busca local.

Há foco visível global, alvos de toque de pelo menos 44px nos controles e suporte a
`prefers-reduced-motion`. Os testes verificam teclado, labels, descrições, estados,
composição e hidratação inicial. Uma fixture local com Header, busca, ações, Card,
Input, estados e Footer foi medida em Chrome headless: sem overflow horizontal em
320, 375, 768, 1024 e 1440px. Isso não substitui a validação das futuras páginas
com seus conteúdos reais. Os tokens provisórios devem ser revisados antes da entrega final.

## Páginas — etapa 2

- `/`: acolhimento, jornada em três etapas, benefícios e links para explorar profissionais.
- `/profissionais`: seis personagens fictícios em `src/mocks/professionals.ts`, busca
  por nome/especialidade sem distinção de acentos, filtro combinado, contador e estado vazio.

O painel de detalhes usa `dialog.showModal()`, nome e descrição acessíveis, Escape,
botão de fechamento, contenção de Tab/Shift+Tab e restauração de foco. Nenhum perfil
representa atendimento real. Não existem fotos, registros, contatos ou avaliações.
O carregamento de rota usa `LoadingState`; a filtragem local é imediata.
Os links de navegação permanecem visíveis em telas pequenas, sem exigir menu recolhível.

Os 11 testes anteriores foram preservados. Cinco testes adicionais cobrem Home,
destinos de navegação, busca, filtros, limpeza e modal (incluindo teclado e foco).
O jsdom recebe um substituto de showModal/close apenas no arquivo de testes;
o comportamento nativo é conferido no Chrome. As duas páginas foram medidas em
320, 375, 768, 1024 e 1440px sem overflow horizontal, com um H1 por página.

Pendências documentais: paleta semântica e sombras oficiais. Os valores provisórios
continuam identificados. O projeto é uma demonstração e não possui backend,
autenticação, agendamento ou navegação para serviços reais. Validações automatizadas
não substituem uma avaliação completa com leitores de tela.
