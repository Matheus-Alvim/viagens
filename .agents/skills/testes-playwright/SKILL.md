---
name: testes-playwright
description: Use ao desenvolver ou alterar interfaces web para verificar fluxos importantes com Playwright e evitar regressões.
---

# Testes de interface com Playwright

Use https://github.com/microsoft/playwright como referência. Inspecione as instruções do projeto, dependências e testes existentes antes de mudar qualquer coisa. Reutilize a configuração existente; adicione Playwright apenas quando apropriado e preserve alterações do usuário.

Identifique os fluxos importantes e os riscos da mudança. Escreva testes que exerçam comportamento observável, incluindo entradas inválidas, valores limites e resultados relevantes quando aplicável. Para interfaces, verifique os tamanhos de tela que o projeto suporta e a acessibilidade dos controles essenciais. Evite depender de dados de produção ou executar compras, envios ou outras ações externas reais.

Execute a aplicação e os testes no ambiente apropriado; registre quantos testes passaram e quais falharam ou ficaram bloqueados. Corrija os problemas causados pela mudança e execute novamente os testes afetados. Testes não garantem ausência total de erros. Adicione execução automatizada no CI do projeto quando solicitada e compatível com a infraestrutura existente. Nunca declare um teste como aprovado sem executá-lo.
