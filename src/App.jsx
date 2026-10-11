import { useState } from 'react'
import { products } from './data/products.js'
import { useCartStore } from './stores/cart-store.js'
import { selectCartTotal, selectTotalQuantity } from './stores/cart-selectors.js'
import './cart.css'

function CartBadge() {
  const itemCount = useCartStore((state) => state.items.length)
  return <p role="status" aria-label="จำนวนรายการ">{itemCount} รายการ</p>
}

function CartSummary() {
  const totalQuantity = useCartStore(selectTotalQuantity)
  const cartTotal = useCartStore(selectCartTotal)
  return (
    <section aria-label="สรุปตะกร้า">
      <h2>สรุปตะกร้า</h2>
      <p role="status" aria-label="จำนวนชิ้นรวม">{totalQuantity} ชิ้น</p>
      <p role="status" aria-label="ยอดรวม">{cartTotal} บาท</p>
    </section>
  )
}

function AddProductButton({ product }) {
  const addItem = useCartStore((state) => state.addItem)
  return <button type="button" onClick={() => addItem(product)} aria-label={`เพิ่ม${product.name}`}>เพิ่มสินค้า</button>
}

function CartItemActions({ item }) {
  const increaseQuantity = useCartStore((state) => state.increaseQuantity)
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity)
  const removeItem = useCartStore((state) => state.removeItem)
  return (
    <div>
      <button type="button" aria-label={`ลดจำนวน${item.name}`} onClick={() => decreaseQuantity(item.id)}>−</button>
      <button type="button" aria-label={`เพิ่มจำนวน${item.name}`} onClick={() => increaseQuantity(item.id)}>+</button>
      <button type="button" aria-label={`ลบ${item.name}`} onClick={() => removeItem(item.id)}>ลบ</button>
    </div>
  )
}

function CartItems() {
  const items = useCartStore((state) => state.items)

  return (
    <section aria-labelledby="cart-heading" className="cart-panel">
      <h2 id="cart-heading">ตะกร้าสินค้า</h2>
      {items.length === 0 ? <p role="status">ตะกร้าว่าง</p> : (
        <ul aria-label="รายการในตะกร้า">
          {items.map((item) => (
            <li key={item.id} data-testid={`cart-${item.id}`}>
              <div><strong>{item.name}</strong><p>{item.price} บาท / ชิ้น</p></div>
              <span>จำนวน {item.quantity} ชิ้น</span>
              <CartItemActions item={item} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

function ProductCatalog() {
  const [query, changeQuery] = useState('')
  const visibleProducts = products.filter((product) => product.name.includes(query))
  return (
        <section aria-labelledby="products-heading" className="products-panel">
          <h2 id="products-heading">สินค้า</h2>
          <label htmlFor="product-filter">ค้นหาสินค้า</label>
          <input id="product-filter" type="search" value={query} onChange={(event) => changeQuery(event.target.value)} placeholder="ค้นชื่อสินค้า" />
          {visibleProducts.length === 0 ? <p role="status">ไม่พบสินค้า</p> : (
          <ul aria-label="สินค้า">
            {visibleProducts.map((product) => (
              <li key={product.id}>
                <div><strong>{product.name}</strong><p>{product.price} บาท</p></div>
                <AddProductButton product={product} />
              </li>
            ))}
          </ul>
          )}
          <p className="note">เพิ่มซ้ำเพื่อเพิ่มจำนวน ลดได้ต่ำสุด 1 ชิ้น ใช้ปุ่มลบเมื่อต้องการนำออก</p>
        </section>
  )
}

function App() {
  return (
    <main className="shop">
      <header><p className="eyebrow">ZUSTAND / เรียนผ่านการลงมือทำ</p><h1>ร้านเครื่องเขียน</h1><p>กรองเฉพาะสินค้าให้เลือกซื้อด้วย local state ในบทที่ 6</p></header>
      <div className="shop-grid">
        <ProductCatalog />
        <div><CartBadge /><CartItems /><CartSummary /></div>
      </div>
    </main>
  )
}

export default App
