// Restore public initial state without depending on a learner's clearCart action.
// Clone data so a mutation in one test cannot leak into the next.
export function resetStore(store) {
  const initial = store.getInitialState()
  store.setState({ ...initial, items: structuredClone(initial.items) }, true)
}
