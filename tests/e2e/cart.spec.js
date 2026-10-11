import { expect, test } from '@playwright/test'
import { initialItems } from '../helpers/lesson-fixture.js'

test('screen displays the lesson cart items and quantities', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'ร้านเครื่องเขียน' })).toBeVisible()
  const cart = page.getByRole('region', { name: 'ตะกร้าสินค้า' })
  if (initialItems.length === 0) {
    await expect(cart.getByRole('status')).toHaveText('ตะกร้าว่าง')
  } else {
    await expect(cart.getByRole('listitem')).toHaveCount(initialItems.length)
    for (const item of initialItems) {
      const row = cart.getByRole('listitem').filter({ has: page.getByText(item.name, { exact: true }) })
      await expect(row).toContainText(`${item.price} บาท / ชิ้น`)
      await expect(row).toContainText(`จำนวน ${item.quantity} ชิ้น`)
    }
  }
})

test('adding a product from the catalog displays it in the cart', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'เพิ่มสมุด', exact: true }).click()
  const cart = page.getByRole('region', { name: 'ตะกร้าสินค้า' })
  await expect(cart.getByRole('listitem')).toHaveCount(1)
  await expect(cart.getByRole('listitem')).toContainText('สมุด')
  await expect(cart.getByRole('listitem')).toContainText('จำนวน 1 ชิ้น')
})
