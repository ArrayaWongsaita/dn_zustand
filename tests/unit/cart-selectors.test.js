import { beforeEach, expect, test } from 'vitest'
import { useCartStore } from '../../src/stores/cart-store.js'
import { selectCartTotal, selectTotalQuantity } from '../../src/stores/cart-selectors.js'
import { resetStore } from '../helpers/reset-store.js'

beforeEach(() => resetStore(useCartStore))

function prepareCart() {
  useCartStore.setState({ items: [
    { id: 'notebook', name: 'สมุด', price: 50, quantity: 2 },
    { id: 'pen', name: 'ปากกา', price: 20, quantity: 1 },
  ] })
}

test('total quantity sums pieces and updates after adding another product', () => {
  prepareCart()
  expect(selectTotalQuantity(useCartStore.getState())).toBe(3)
  useCartStore.getState().addItem({ id: 'bag', name: 'กระเป๋า', price: 200 })
  expect(selectTotalQuantity(useCartStore.getState())).toBe(4)
})

test('cart total sums price times quantity and updates after adding another product', () => {
  prepareCart()
  expect(selectCartTotal(useCartStore.getState())).toBe(120)
  useCartStore.getState().addItem({ id: 'bag', name: 'กระเป๋า', price: 200 })
  expect(selectCartTotal(useCartStore.getState())).toBe(320)
})

test('an empty cart has zero total quantity and zero cart total', () => {
  useCartStore.setState({ items: [] })
  expect(selectTotalQuantity(useCartStore.getState())).toBe(0)
  expect(selectCartTotal(useCartStore.getState())).toBe(0)
})
