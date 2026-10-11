import { beforeEach, expect, test } from 'vitest'
import { useCartStore } from '../../src/stores/cart-store.js'
import { resetStore } from '../helpers/reset-store.js'
import { initialItems } from '../helpers/lesson-fixture.js'

beforeEach(() => resetStore(useCartStore))

test('store exposes the lesson initial cart items', () => {
  expect(useCartStore.getState().items).toEqual(initialItems)
})

test('adding a new product creates a cart item with quantity one', () => {
  useCartStore.getState().addItem({ id: 'notebook', name: 'สมุด', price: 50 })
  expect(useCartStore.getState().items).toEqual([
    { id: 'notebook', name: 'สมุด', price: 50, quantity: 1 },
  ])
})
