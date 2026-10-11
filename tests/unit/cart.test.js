import { beforeEach, expect, test } from 'vitest'
import { useCartStore } from '../../src/stores/cart-store.js'
import { resetStore } from '../helpers/reset-store.js'
import { initialItems } from '../helpers/lesson-fixture.js'

beforeEach(() => resetStore(useCartStore))

test('store exposes the lesson initial cart items', () => {
  expect(useCartStore.getState().items).toEqual(initialItems)
})
