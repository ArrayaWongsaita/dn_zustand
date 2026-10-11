import { products } from './data/products.js'
import { useCartStore } from './stores/cart-store.js'
import './cart.css'

function CartItems() {
  const { items } = useCartStore()

  return (
    <section aria-labelledby="cart-heading" className="cart-panel">
      <h2 id="cart-heading">ตะกร้าสินค้า</h2>
      {items.length === 0 ? <p role="status">ตะกร้าว่าง</p> : (
        <ul aria-label="รายการในตะกร้า">
          {items.map((item) => (
            <li key={item.id} data-testid={`cart-${item.id}`}>
              <div><strong>{item.name}</strong><p>{item.price} บาท / ชิ้น</p></div>
              <span>จำนวน {item.quantity} ชิ้น</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

function App() {
  // TODO 2: อ่าน addItem จาก store และเชื่อมกับปุ่มเพิ่มสินค้า

  return (
    <main className="shop">
      <header><p className="eyebrow">ZUSTAND / เรียนผ่านการลงมือทำ</p><h1>ร้านเครื่องเขียน</h1><p>เพิ่มสินค้าใหม่ผ่าน action ในบทที่ 2</p></header>
      <div className="shop-grid">
        <section aria-labelledby="products-heading" className="products-panel">
          <h2 id="products-heading">สินค้า</h2>
          <ul aria-label="สินค้า">
            {products.map((product) => (
              <li key={product.id}>
                <div><strong>{product.name}</strong><p>{product.price} บาท</p></div>
                <button type="button" aria-label={`เพิ่ม${product.name}`}>เพิ่มสินค้า</button>
              </li>
            ))}
          </ul>
          <p className="note">บทนี้ฝึกเพิ่มสินค้าที่ยังไม่มีในตะกร้า</p>
        </section>
        <CartItems />
      </div>
    </main>
  )
}

export default App
