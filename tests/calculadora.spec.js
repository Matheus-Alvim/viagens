const { test, expect } = require('@playwright/test');
const fs = require('node:fs/promises');

async function preencher(page) {
  await page.goto('/');
  await page.selectOption('#programa-origem', { label: 'Esfera' });
  await page.selectOption('#programa-destino', { label: 'Smiles' });
  await page.locator('#pontos').fill('450');
  await page.locator('#bonus').fill('70');
  await page.locator('#custo').fill('11350');
}
async function calcular(page) {
  await page.getByRole('button', { name: 'Calcular simulação' }).click();
  await expect(page.locator('#imagem')).toBeVisible();
}

test('calcula transferência em milheiros e custo com bônus', async ({ page }) => {
  await preencher(page);
  await calcular(page);
  await expect(page.locator('#resultado')).toContainText('765.000');
  await expect(page.locator('#resultado')).toContainText('14,84');
  await expect(page.locator('#resumo')).toHaveValue(/Esfera → Smiles/);
  await expect(page.locator('#resumo')).toHaveValue(/Pontos transferidos: 450\.000/);
});

test('respeita conversão diferente e limite de bônus', async ({ page }) => {
  await preencher(page);
  await page.locator('#origem').fill('2');
  await page.locator('#destino').fill('1');
  await page.locator('#teto').fill('20000');
  await calcular(page);
  await expect(page.locator('#resultado')).toContainText('Milhas base: 225.000');
  await expect(page.locator('#resultado')).toContainText('Milhas bônus: 20.000');
  await expect(page.locator('#resultado')).toContainText('Total estimado: 245.000');
});

test('simula faturamento, lucro e prejuízo sem confundir custos', async ({ page }) => {
  await preencher(page);
  await page.locator('summary').click();
  await page.locator('#preco-venda').fill('20');
  await page.locator('#taxas-venda').fill('100');
  await calcular(page);
  await expect(page.locator('#resultado')).toContainText('15.300,00');
  await expect(page.locator('#resultado')).toContainText('3.850,00');
  await expect(page.locator('#resultado')).toContainText('33,92%');
  await page.locator('#preco-venda').fill('5');
  await calcular(page);
  await expect(page.locator('#resultado')).toContainText('Prejuízo estimado');
  await page.locator('#custo').fill('');
  await calcular(page);
  await expect(page.locator('#resultado')).toContainText('informe o custo total');
  await page.locator('#custo').fill('0');
  await calcular(page);
  await expect(page.locator('#resultado')).toContainText('indisponível com custo zero');
});

test('gera imagem PNG e invalida resultados após alteração', async ({ page }) => {
  await preencher(page);
  await calcular(page);
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Baixar imagem' }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe('simulacao-milhas.png');
  const bytes = await fs.readFile(await download.path());
  expect([...bytes.subarray(0, 8)]).toEqual([137, 80, 78, 71, 13, 10, 26, 10]);
  await page.locator('#bonus').fill('60');
  await expect(page.locator('#imagem')).toBeHidden();
  await expect(page.getByRole('button', { name: 'Baixar imagem' })).toBeDisabled();
});

test('aceita programas personalizados e página cabe na tela', async ({ page }) => {
  await preencher(page);
  await page.selectOption('#programa-origem', { label: 'Outro' });
  await page.locator('#outra-origem').fill('Meu programa');
  await calcular(page);
  await expect(page.locator('#resumo')).toHaveValue(/Meu programa → Smiles/);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
});
