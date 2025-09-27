# B2Bit – Desafio Front-end

Aplicação desenvolvida como parte do desafio para vaga de Front-end da B2Bit.

> Stack principal: Next.js 15 (com Turbopack), React 19, TypeScript e Tailwind CSS 4.

## Demo (Deploy)

- URL de produção: https://b2bit-challenger.vercel.app/

- Credenciais de acesso:

  E-mail: cliente@youdrive.com Senha: password

---

## Requisitos

- Node.js 18.18+ (recomendado 20 LTS)
- bun (ou npm, yarn ou pnpm, se preferir)

Verifique sua versão com:

```bash
node -v
bun -v
```

---

## Como rodar localmente

1. Clone o repositório

```bash
git clone https://github.com/EdGabrielOliveira/b2bit-challenger.git
cd b2bit-challenger
```

2. Instale as dependências

```bash
bun install
# ou
npm install
```

3. Configure variáveis de ambiente

- Crie um arquivo `.env.local` na raiz do projeto.

```bash
NEXT_PUBLIC_API_URL=https://api.exemplo.com
```

4. Ambiente de desenvolvimento

```bash
bun run dev
```

- Acesse em: http://localhost:3000

---

## Tecnologias e bibliotecas

- Front-end
  - Next.js
  - React
  - TypeScript
  - Tailwind CSS
  - ShadCN
  - `axios` para requisições HTTP
  - `yup` para validação
