import { beforeEach, expect, test } from 'vitest'
import { useCartStore } from '../../src/stores/cart-store.js'
import { resetStore } from '../helpers/reset-store.js'
import { initialItems } from '../helpers/lesson-fixture.js'

beforeEach(() => resetStore(useCartStore))

test('store exposes the lesson initial cart items', () => {
  expect(useCartStore.getState().items).toEqual(initialItems)
})

test('adding a new product creates a cart item with quantity one', () => {
  const unchanged = captureCart()
  useCartStore.getState().addItem({ id: 'bag', name: 'กระเป๋า', price: 200 })
  expect(useCartStore.getState().items).toEqual([
    ...initialItems,
    { id: 'bag', name: 'กระเป๋า', price: 200, quantity: 1 },
  ])
  unchanged()
})

// These scenarios arrange their own cart through the public store API so the
// behavior contract remains valid when later lessons change their initial cart.
function prepareQuantityCart() {
  useCartStore.setState({ items: [
    { id: 'notebook', name: 'สมุด', price: 50, quantity: 2 },
    { id: 'pen', name: 'ปากกา', price: 20, quantity: 1 },
  ] })
}

// Observe only the store's public state, retaining the original array and every
// original item reference so replacing the array cannot hide object mutation.
function captureCart() {
  const array = useCartStore.getState().items
  const objects = [...array]
  const snapshot = structuredClone(array)
  return () => {
    expect(array).toEqual(snapshot)
    objects.forEach((item, index) => expect(item).toEqual(snapshot[index]))
  }
}

test('adding an existing product increases its quantity without mutating previous items', () => {
  prepareQuantityCart()
  const unchanged = captureCart()
  useCartStore.getState().addItem({ id: 'notebook', name: 'สมุด', price: 50 })
  expect(useCartStore.getState().items).toEqual([
    { id: 'notebook', name: 'สมุด', price: 50, quantity: 3 },
    { id: 'pen', name: 'ปากกา', price: 20, quantity: 1 },
  ])
  unchanged()
})

test('increasing quantity preserves the previous cart and its item objects', () => {
  prepareQuantityCart()
  const unchanged = captureCart()
  useCartStore.getState().increaseQuantity('notebook')
  expect(useCartStore.getState().items).toEqual([
    { id: 'notebook', name: 'สมุด', price: 50, quantity: 3 },
    { id: 'pen', name: 'ปากกา', price: 20, quantity: 1 },
  ])
  unchanged()
})

test('decreasing quantity preserves the previous cart and its item objects', () => {
  prepareQuantityCart()
  const unchanged = captureCart()
  useCartStore.getState().decreaseQuantity('notebook')
  expect(useCartStore.getState().items).toEqual([
    { id: 'notebook', name: 'สมุด', price: 50, quantity: 1 },
    { id: 'pen', name: 'ปากกา', price: 20, quantity: 1 },
  ])
  unchanged()
})

test('decreasing quantity stops at one without removing or mutating the item', () => {
  prepareQuantityCart()
  const unchanged = captureCart()
  useCartStore.getState().decreaseQuantity('pen')
  expect(useCartStore.getState().items).toEqual([
    { id: 'notebook', name: 'สมุด', price: 50, quantity: 2 },
    { id: 'pen', name: 'ปากกา', price: 20, quantity: 1 },
  ])
  unchanged()
})

test('removing an item preserves the previous cart and its item objects', () => {
  prepareQuantityCart()
  const unchanged = captureCart()
  useCartStore.getState().removeItem('pen')
  expect(useCartStore.getState().items).toEqual([
    { id: 'notebook', name: 'สมุด', price: 50, quantity: 2 },
  ])
  unchanged()
})

test('clearing the cart empties items and keeps actions usable for adding again', () => {
  prepareQuantityCart()
  const unchanged = captureCart()
  useCartStore.getState().clearCart()
  expect(useCartStore.getState().items).toEqual([])
  unchanged()
  useCartStore.getState().addItem({ id: 'bag', name: 'กระเป๋า', price: 200 })
  expect(useCartStore.getState().items).toEqual([
    { id: 'bag', name: 'กระเป๋า', price: 200, quantity: 1 },
  ])
})
