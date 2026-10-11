// Public numeric selectors shared by the screen and unit checks.
export const selectTotalQuantity = (state) =>
  state.items.reduce((sum, item) => sum + item.quantity, 0)

export const selectCartTotal = (state) =>
  state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
