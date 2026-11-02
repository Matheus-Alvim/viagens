# Como reutilizar a habilidade de testes

A habilidade deste projeto está em `.agents/skills/testes-playwright/SKILL.md`. Ela orienta o assistente a verificar o projeto, preparar testes relevantes e executá-los com Playwright.

Para usar em outro projeto, copie a pasta `.agents/skills/testes-playwright` para dentro da pasta `.agents/skills` daquele projeto. No início de uma conversa nesse projeto, peça: “Use a habilidade testes-playwright”. A disponibilidade automática depende do ambiente e do cliente; se ela não aparecer, peça ao assistente para ler o arquivo `SKILL.md` copiado. Para torná-la disponível em todos os seus projetos, verifique se o seu aplicativo oferece uma pasta pessoal de habilidades e siga as instruções dele; copiar para este projeto sozinho não cria memória global.
