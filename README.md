# Calculadora de milhas

Abra `index.html` em um navegador para usar a calculadora. Ela funciona sem conta, servidor, instalação ou envio de dados. Cada pessoa preenche sua própria simulação; dados e promoções não são compartilhados nem salvos. A publicação em hospedagem estática é necessária para acesso por um link.

A proporção de conversão, bônus, teto e custos devem ser conferidos em cada campanha. O resultado é uma estimativa e não substitui o regulamento ou a análise do fluxo de caixa.

## Testes automatizados

O projeto usa [Playwright](https://github.com/microsoft/playwright) para testar cálculos e fluxos no navegador em tamanhos de celular e computador. Com Node.js e Python 3 instalados, execute:

```sh
npm ci
npx playwright install chromium
npm test
```

O GitHub Actions executa os testes em alterações enviadas para `main` e em solicitações de alteração. A publicação do GitHub Pages é independente desses testes; o resultado deles deve ser conferido antes de uma publicação. A habilidade reutilizável está em `.agents/skills/testes-playwright/SKILL.md`; veja `docs/HABILIDADE-TESTES.md`.
