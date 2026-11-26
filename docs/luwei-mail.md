# Luwei Mail — instalação em produção

Endereço: **https://mail.luwei.com.br** · Worker `mailflare` · conta Cloudflare da Luwei (`33f952c97154d6497a9ec998c490d3d6`).

## Infraestrutura

| Recurso | Nome |
| --- | --- |
| Worker | `mailflare` (Custom Domain `mail.luwei.com.br`) |
| D1 | `luwei-mail` (`baeaea86-986d-442d-a751-d2d0125bc329`) |
| R2 | `luwei-mail-raw` |
| Filas | `mailflare-inbound`, `mailflare-outbound`, `mailflare-agent` (criadas pelo pipeline) |

Deploy: exclusivamente `.github/workflows/publicacao.yml` (push em `main` ou execução manual). O workflow de atualização automática do upstream (`deploy-update.yml`) foi removido: ele substituiria a árvore inteira pelo upstream e apagaria a identidade Luwei.

Secrets do GitHub Actions:

| Secret | Obrigatório | Uso |
| --- | --- | --- |
| `CLOUDFLARE_API_TOKEN` | sim | deploy (Workers, D1, R2, Queues, Custom Domains) |
| `MAILFLARE_CF_TOKEN` | recomendado | `CF_TOKEN` do app: DNS Edit, Zone Read, Zone Settings Edit e Email Routing Rules Edit na zona `luwei.com.br`. Sem ele o pipeline reutiliza o token de deploy e emite aviso. |
| `RESEND_API_KEY` | opcional | também pode ser cadastrado em Admin → Domínios → Resend |

## Decisão de provedores (2026-11-26)

- **Envio: Resend.** O domínio `luwei.com.br` já está verificado no Resend (sa-east-1, SPF/DKIM ativos), é o motor já usado pelos outros produtos da Luwei, tem logs, supressões e webhooks de entrega, e não exige o plano pago de Email Sending da Cloudflare (ainda recente). Reputação e entregabilidade compartilham o histórico que o domínio já construiu.
- **Recebimento: Cloudflare Email Routing**, nativo do Worker (handler `email`): sem webhook público intermediário, sem custo por mensagem e com rejeição/encaminhamento antes da fila.
- **MX do domínio raiz:** hoje `luwei.com.br` recebe pelo Google Workspace. O Mailflare só permite um dono de MX por domínio. Trocar o MX raiz desliga o Google Workspace — é decisão de negócio, não técnica, e não foi feita. Para receber sem impacto, use um subdomínio (ex.: `equipe.luwei.com.br`) ou faça a migração planejada do Workspace.

## Primeiro acesso

1. Abra `https://mail.luwei.com.br/setup`; a etapa Sistema inicializa o D1.
2. Crie a conta de administrador.
3. Admin → Domínios: adicione `luwei.com.br` com envio **Resend** e informe a chave; adicione o domínio de recebimento escolhido com **Cloudflare**.
4. Crie as caixas e envie uma mensagem de teste.

## Identidade visual

`src/app/luwei-theme.css` remapeia a paleta do Tailwind para os tokens Flow OS (`--flow-*`, mesma fonte de `luwei-flow/src/styles/flowos-tokens.css`) em claro e escuro, aplica o degradê da marca na ação primária e usa Geist + Bricolage Grotesque. Ícones e nome padrão: Luwei Mail. Idioma padrão: pt-BR.
