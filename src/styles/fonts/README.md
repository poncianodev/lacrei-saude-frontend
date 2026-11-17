# Nunito local

Arquivo original variável, estilo normal, sem conversão ou alterações:
`Nunito-Variable.ttf` (nome original: `Nunito[wght].ttf`).
Eixo de peso: 200–1000, incluindo 400, 600 e 700 usados no tema.

Origem oficial: https://github.com/google/fonts/tree/main/ofl/nunito

Obtido em 17/11/2026:

- https://raw.githubusercontent.com/google/fonts/main/ofl/nunito/Nunito%5Bwght%5D.ttf
- https://raw.githubusercontent.com/google/fonts/main/ofl/nunito/OFL.txt

Hashes Git blob conferidos contra a API do repositório na obtenção:

- Fonte: `2ec1f4b0676c83ef33049db87b311171699e9192`
- Licença: `c8210f08ca3cece05b4f7baa428afe8e1abe3293`

Licença SIL Open Font License 1.1 preservada integralmente em `OFL.txt`.
Foi escolhido o TTF variável disponibilizado pelo repositório oficial, evitando
conversão ou uso de arquivos de cache sem proveniência. `next/font/local` inclui
o arquivo no build e o serve pelo próprio aplicativo, sem solicitação a Google Fonts.

## Validação da integração

Lint, TypeScript, 16 testes e build de produção aprovados. O build foi executado
com um bloqueador temporário de requisições HTTP/HTTPS, fetch e resolução DNS
externa, herdado pelos subprocessos Node; nenhuma tentativa externa foi registrada.
O bloqueador foi removido após a verificação. Código-fonte e CSS gerado não contêm
`next/font/google`, `fonts.gstatic.com` ou `fonts.googleapis.com`.

No Chrome, ambas as páginas renderizaram os títulos com a fonte customizada Nunito
(PostScript `Nunito-Bold`). Os pesos 400, 600 e 700 carregaram corretamente via
`document.fonts`. A única requisição de fonte foi para `/_next/static/media/*.ttf`,
na própria origem, sem chamadas ao Google Fonts ou erros JavaScript.
