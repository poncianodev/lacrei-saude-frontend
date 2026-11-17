# Lacrei Saúde — Desafio Front-end

Projeto desenvolvido para o desafio técnico de Front-end da Lacrei Saúde, utilizando o Design System Marsha como referência para tipografia, espaçamentos, componentes e identidade visual.

## Sobre o projeto

A aplicação reúne duas rotas principais construídas com Next.js App Router:

- **Home (`/`)**: apresenta a proposta do espaço de cuidado, a jornada em três etapas, os principais diferenciais e atalhos para explorar os perfis.
- **Profissionais (`/profissionais`)**: exibe uma listagem demonstrativa com busca por nome ou especialidade, filtro por área de atuação e visualização de detalhes em modal.

Todos os perfis exibidos são fictícios (definidos localmente em `src/mocks/professionals.ts`) e não há integração com backend, autenticação ou agendamentos reais.

## Tecnologias

- [Next.js 15](https://nextjs.org/) (App Router) e React 19
- TypeScript
- Styled Components (com registro SSR no App Router)
- Vitest, React Testing Library, `@testing-library/jest-dom` e jsdom
- ESLint (`eslint-config-next`)

## Como executar

Ambiente de referência: Node.js 24 e npm 11. Nenhuma variável de ambiente ou API externa é necessária; a fonte Nunito é carregada localmente a partir de `src/styles/fonts/`.

Instale as dependências a partir do lockfile:

```bash
npm ci
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

A aplicação ficará disponível em `http://localhost:3000`.

### Scripts de validação e build

```bash
npm run lint        # Verificação com ESLint
npm run typecheck   # Checagem de tipos com TypeScript (tsc --noEmit)
npm test            # Executa a suíte de testes com Vitest
npm run test:watch  # Executa os testes em modo de observação
npm run build       # Gera o build de produção
npm start           # Sobe o servidor de produção após o build
```

## Funcionalidades

- **Navegação**: cabeçalho e rodapé compartilhados entre `/` e `/profissionais`, com links visíveis, menu mobile em telas menores e botão de voltar ao topo.
- **Busca**: filtragem local imediata por nome ou especialidade, sem distinção de acentos.
- **Filtros**: seleção de especialidade combinada com a busca textual, contador de resultados, estado vazio e opção para limpar filtros.
- **Modal de detalhes**: exibição das informações do profissional, com fechamento por botão ou Escape e navegação acessível por teclado.
- **Responsividade**: layout mobile-first adaptado para diferentes larguras de tela, com alvos de toque de pelo menos 44px e suporte a `prefers-reduced-motion`.

## Links

- Aplicação: https://lacrei-saude-frontend.onrender.com/
- Repositório: https://github.com/poncianodev/lacrei-saude-frontend

## Observação

Este projeto é uma demonstração desenvolvida exclusivamente para fins de avaliação no desafio técnico e não representa uma plataforma oficial de atendimento. A marca e a identidade visual pertencem à Lacrei Saúde.
