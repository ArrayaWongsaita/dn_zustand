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
  await page.getByRole('button', { name: 'เพิ่มกระเป๋า', exact: true }).click()
  const cart = page.getByRole('region', { name: 'ตะกร้าสินค้า' })
  await expect(cart.getByRole('listitem')).toHaveCount(initialItems.length + 1)
  const added = cart.getByRole('listitem').filter({ has: page.getByText('กระเป๋า', { exact: true }) })
  await expect(added).toContainText('จำนวน 1 ชิ้น')
})


test('quantity controls stop at one and the remove button removes the item', async ({ page }) => {
  await page.goto('/')
  // Arrange through user controls, including later lessons that start empty.
  const notebookQuantity = initialItems.find((item) => item.id === 'notebook')?.quantity ?? 0
  for (let quantity = notebookQuantity; quantity < 2; quantity += 1) {
    await page.getByRole('button', { name: 'เพิ่มสมุด', exact: true }).click()
  }
  if (!initialItems.some((item) => item.id === 'pen')) {
    await page.getByRole('button', { name: 'เพิ่มปากกา', exact: true }).click()
  }
  const notebook = page.getByRole('region', { name: 'ตะกร้าสินค้า' }).getByRole('listitem').filter({ has: page.getByText('สมุด', { exact: true }) })
  await page.getByRole('button', { name: 'เพิ่มจำนวนสมุด', exact: true }).click()
  await expect(notebook).toContainText('จำนวน 3 ชิ้น')
  await page.getByRole('button', { name: 'ลดจำนวนสมุด', exact: true }).click()
  await page.getByRole('button', { name: 'ลดจำนวนสมุด', exact: true }).click()
  await expect(notebook).toContainText('จำนวน 1 ชิ้น')
  await page.getByRole('button', { name: 'ลดจำนวนสมุด', exact: true }).click()
  await expect(notebook).toContainText('จำนวน 1 ชิ้น')
  await page.getByRole('button', { name: 'ลบปากกา', exact: true }).click()
  const cart = page.getByRole('region', { name: 'ตะกร้าสินค้า' })
  await expect(cart.getByRole('listitem')).toHaveCount(1)
  await expect(cart.getByText('ปากกา', { exact: true })).toHaveCount(0)
})

test('cart badge counts distinct product IDs rather than total quantity', async ({ page }) => {
  await page.goto('/')
  for (const product of [{ id: 'notebook', name: 'สมุด', quantity: 2 }, { id: 'pen', name: 'ปากกา', quantity: 1 }]) {
    const quantity = initialItems.find((item) => item.id === product.id)?.quantity ?? 0
    for (let count = quantity; count < product.quantity; count += 1) {
      await page.getByRole('button', { name: `เพิ่ม${product.name}`, exact: true }).click()
    }
  }
  const badge = page.getByRole('status', { name: 'จำนวนรายการ' })
  await expect(badge).toHaveText('2 รายการ')
  await page.getByRole('button', { name: 'เพิ่มสมุด', exact: true }).click()
  await expect(badge).toHaveText('2 รายการ')
  await page.getByRole('button', { name: 'เพิ่มกระเป๋า', exact: true }).click()
  await expect(badge).toHaveText('3 รายการ')
  await page.getByRole('button', { name: 'ลบปากกา', exact: true }).click()
  await expect(badge).toHaveText('2 รายการ')
})

test('cart summary updates total pieces and price after cart changes', async ({ page }) => {
  await page.goto('/')
  for (const product of [{ id: 'notebook', name: 'สมุด', quantity: 2 }, { id: 'pen', name: 'ปากกา', quantity: 1 }]) {
    const quantity = initialItems.find((item) => item.id === product.id)?.quantity ?? 0
    for (let count = quantity; count < product.quantity; count += 1) {
      await page.getByRole('button', { name: `เพิ่ม${product.name}`, exact: true }).click()
    }
  }
  const quantity = page.getByRole('status', { name: 'จำนวนชิ้นรวม' })
  const total = page.getByRole('status', { name: 'ยอดรวม', exact: true })
  await expect(quantity).toHaveText('3 ชิ้น')
  await expect(total).toHaveText('120 บาท')
  await page.getByRole('button', { name: 'เพิ่มกระเป๋า', exact: true }).click()
  await expect(quantity).toHaveText('4 ชิ้น')
  await expect(total).toHaveText('320 บาท')
  await page.getByRole('button', { name: 'เพิ่มจำนวนสมุด', exact: true }).click()
  await expect(quantity).toHaveText('5 ชิ้น')
  await expect(total).toHaveText('370 บาท')
  await page.getByRole('button', { name: 'ลบกระเป๋า', exact: true }).click()
  await expect(quantity).toHaveText('4 ชิ้น')
  await expect(total).toHaveText('170 บาท')
})

async function prepareTrainingCart(page) {
  for (const product of [{ id: 'notebook', name: 'สมุด', quantity: 2 }, { id: 'pen', name: 'ปากกา', quantity: 1 }]) {
    const quantity = initialItems.find((item) => item.id === product.id)?.quantity ?? 0
    for (let count = quantity; count < product.quantity; count += 1) {
      await page.getByRole('button', { name: `เพิ่ม${product.name}`, exact: true }).click()
    }
  }
}

test('searching a Thai substring filters products without changing the cart or totals', async ({ page }) => {
  await page.goto('/')
  await prepareTrainingCart(page)
  const catalog = page.getByRole('region', { name: 'สินค้า', exact: true })
  await expect(catalog.getByRole('listitem')).toHaveCount(3)
  await page.getByRole('searchbox', { name: 'ค้นหาสินค้า' }).fill('ปาก')
  await expect(catalog.getByRole('listitem')).toHaveCount(1)
  await expect(catalog.getByRole('listitem')).toContainText('ปากกา')
  const cart = page.getByRole('region', { name: 'ตะกร้าสินค้า' })
  await expect(cart.getByRole('listitem')).toHaveCount(2)
  await expect(cart.getByRole('listitem').filter({ has: page.getByText('สมุด', { exact: true }) })).toContainText('จำนวน 2 ชิ้น')
  await expect(cart.getByRole('listitem').filter({ has: page.getByText('ปากกา', { exact: true }) })).toContainText('จำนวน 1 ชิ้น')
  await expect(page.getByRole('status', { name: 'จำนวนชิ้นรวม' })).toHaveText('3 ชิ้น')
  await expect(page.getByRole('status', { name: 'ยอดรวม', exact: true })).toHaveText('120 บาท')
})

test('an unmatched search shows a message and clearing it restores all products', async ({ page }) => {
  await page.goto('/')
  const catalog = page.getByRole('region', { name: 'สินค้า', exact: true })
  const search = page.getByRole('searchbox', { name: 'ค้นหาสินค้า' })
  await search.fill('รองเท้า')
  await expect(catalog.getByRole('status')).toHaveText('ไม่พบสินค้า')
  await expect(catalog.getByRole('listitem')).toHaveCount(0)
  await search.fill('')
  await expect(catalog.getByRole('listitem')).toHaveCount(3)
  await expect(catalog.getByRole('status')).toHaveCount(0)
})

test('clearing the cart preserves the product filter and allows adding again', async ({ page }) => {
  await page.goto('/')
  await prepareTrainingCart(page)
  const search = page.getByRole('searchbox', { name: 'ค้นหาสินค้า' })
  await search.fill('กระเป๋า')
  await page.getByRole('button', { name: 'ล้างตะกร้า', exact: true }).click()
  const cart = page.getByRole('region', { name: 'ตะกร้าสินค้า' })
  await expect(cart.getByRole('status')).toHaveText('ตะกร้าว่าง')
  await expect(cart.getByRole('listitem')).toHaveCount(0)
  await expect(page.getByRole('status', { name: 'จำนวนชิ้นรวม' })).toHaveText('0 ชิ้น')
  await expect(page.getByRole('status', { name: 'ยอดรวม', exact: true })).toHaveText('0 บาท')
  await expect(search).toHaveValue('กระเป๋า')
  const catalog = page.getByRole('region', { name: 'สินค้า', exact: true })
  await expect(catalog.getByRole('listitem')).toHaveCount(1)
  await expect(catalog.getByRole('listitem')).toContainText('กระเป๋า')
  await page.getByRole('button', { name: 'เพิ่มกระเป๋า', exact: true }).click()
  await expect(cart.getByRole('listitem')).toHaveCount(1)
  await expect(cart.getByRole('listitem')).toContainText('กระเป๋า')
  await expect(cart.getByRole('listitem')).toContainText('จำนวน 1 ชิ้น')
  await expect(page.getByRole('status', { name: 'จำนวนชิ้นรวม' })).toHaveText('1 ชิ้น')
  await expect(page.getByRole('status', { name: 'ยอดรวม', exact: true })).toHaveText('200 บาท')
})
