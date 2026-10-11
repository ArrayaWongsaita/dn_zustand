import { expect, test } from '@playwright/test'

// Playwright creates a fresh browser context/storage for every test.
// Each scenario changes and reloads its own cart within the same test.
function cart(page) {
  return page.getByRole('region', { name: 'ตะกร้าสินค้า' })
}

test('adding a product survives reload while the local filter resets', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('searchbox', { name: 'ค้นหาสินค้า' }).fill('กระเป๋า')
  await page.getByRole('button', { name: 'เพิ่มกระเป๋า', exact: true }).click()
  await page.reload()
  await expect(cart(page).getByRole('listitem')).toHaveCount(1)
  await expect(cart(page).getByRole('listitem')).toContainText('กระเป๋า')
  await expect(cart(page).getByRole('listitem')).toContainText('จำนวน 1 ชิ้น')
  await expect(page.getByRole('status', { name: 'ยอดรวม', exact: true })).toHaveText('200 บาท')
  await expect(page.getByRole('searchbox', { name: 'ค้นหาสินค้า' })).toHaveValue('')
  await page.getByRole('button', { name: 'เพิ่มปากกา', exact: true }).click()
  await expect(cart(page).getByRole('listitem')).toHaveCount(2)
})

test('adjusted quantities survive reload and quantity actions remain usable', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'เพิ่มสมุด', exact: true }).click()
  await page.getByRole('button', { name: 'เพิ่มจำนวนสมุด', exact: true }).click()
  await page.reload()
  await expect(cart(page).getByRole('listitem')).toContainText('จำนวน 2 ชิ้น')
  await expect(page.getByRole('status', { name: 'ยอดรวม', exact: true })).toHaveText('100 บาท')
  await page.getByRole('button', { name: 'ลดจำนวนสมุด', exact: true }).click()
  await expect(cart(page).getByRole('listitem')).toContainText('จำนวน 1 ชิ้น')
  await page.getByRole('button', { name: 'ลบสมุด', exact: true }).click()
  await expect(cart(page).getByRole('status')).toHaveText('ตะกร้าว่าง')
})

test('clearing a saved cart remains empty after reload and actions still work', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'เพิ่มกระเป๋า', exact: true }).click()
  await page.reload()
  // Establish that there really was saved data before clearing it.
  await expect(cart(page).getByRole('listitem')).toContainText('กระเป๋า')
  await page.getByRole('button', { name: 'ล้างตะกร้า', exact: true }).click()
  await page.reload()
  await expect(cart(page).getByRole('status')).toHaveText('ตะกร้าว่าง')
  await expect(page.getByRole('status', { name: 'จำนวนชิ้นรวม' })).toHaveText('0 ชิ้น')
  await expect(page.getByRole('status', { name: 'ยอดรวม', exact: true })).toHaveText('0 บาท')
  await page.getByRole('button', { name: 'เพิ่มปากกา', exact: true }).click()
  await expect(cart(page).getByRole('listitem')).toContainText('ปากกา')
  await expect(cart(page).getByRole('listitem')).toContainText('จำนวน 1 ชิ้น')
})

test('persist saves only cart items under the course storage key', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('searchbox', { name: 'ค้นหาสินค้า' }).fill('ปาก')
  await page.getByRole('button', { name: 'เพิ่มปากกา', exact: true }).click()
  const saved = await page.evaluate(() => localStorage.getItem('zustand-course-cart'))
  expect(saved).not.toBeNull()
  const payload = JSON.parse(saved)
  expect(payload.state).toEqual({
    items: [{ id: 'pen', name: 'ปากกา', price: 20, quantity: 1 }],
  })
})
