# Orientações para alterações

A calculadora ajuda a avaliar operações financeiras. Preserve as distinções entre estimativas, caixa recebido, faturamento, lucro e custos; não invente regras de promoções ou preços. Faça testes significativos para alterações relevantes.

Os testes de interface usam Playwright: https://github.com/microsoft/playwright. Antes de concluir mudanças que afetem o site, instale as dependências com `npm ci`, instale o Chromium do Playwright com `npx playwright install chromium` quando necessário e execute `npm test`. Cubra os fluxos e casos financeiros afetados em telas de celular e computador. Investigue falhas e informe resultados reais. Se houver impedimento, explique-o sem afirmar que os testes passaram. Não publique alterações sem autorização aplicável do usuário.
