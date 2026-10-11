import { products } from './data/products.js'
import { useCartStore } from './stores/cart-store.js'
import './cart.css'

function CartItems() {
  const { items, increaseQuantity, decreaseQuantity, removeItem } = useCartStore()

  return (
    <section aria-labelledby="cart-heading" className="cart-panel">
      <h2 id="cart-heading">ตะกร้าสินค้า</h2>
      {items.length === 0 ? <p role="status">ตะกร้าว่าง</p> : (
        <ul aria-label="รายการในตะกร้า">
          {items.map((item) => (
            <li key={item.id} data-testid={`cart-${item.id}`}>
              <div><strong>{item.name}</strong><p>{item.price} บาท / ชิ้น</p></div>
              <span>จำนวน {item.quantity} ชิ้น</span>
              <div>
                <button type="button" aria-label={`ลดจำนวน${item.name}`} onClick={() => decreaseQuantity(item.id)}>−</button>
                <button type="button" aria-label={`เพิ่มจำนวน${item.name}`} onClick={() => increaseQuantity(item.id)}>+</button>
                <button type="button" aria-label={`ลบ${item.name}`} onClick={() => removeItem(item.id)}>ลบ</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

function App() {
  const { addItem } = useCartStore()

  return (
    <main className="shop">
      <header><p className="eyebrow">ZUSTAND / เรียนผ่านการลงมือทำ</p><h1>ร้านเครื่องเขียน</h1><p>อัปเดตจำนวนและลบแบบ immutable ในบทที่ 3</p></header>
      <div className="shop-grid">
        <section aria-labelledby="products-heading" className="products-panel">
          <h2 id="products-heading">สินค้า</h2>
          <ul aria-label="สินค้า">
            {products.map((product) => (
              <li key={product.id}>
                <div><strong>{product.name}</strong><p>{product.price} บาท</p></div>
                <button type="button" onClick={() => addItem(product)} aria-label={`เพิ่ม${product.name}`}>เพิ่มสินค้า</button>
              </li>
            ))}
          </ul>
          <p className="note">เพิ่มซ้ำเพื่อเพิ่มจำนวน ลดได้ต่ำสุด 1 ชิ้น ใช้ปุ่มลบเมื่อต้องการนำออก</p>
        </section>
        <CartItems />
      </div>
    </main>
  )
}

export default App
