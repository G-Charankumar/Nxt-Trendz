import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const showEmptyView = cartList.length === 0

      const handleRemoveAll = () => {
        removeAllCartItems()
      }

      const calculateTotal = cartList => {
        let total = 0
        cartList.forEach(item => {
          total += item.price * item.quantity
        })
        return total
      }

      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <CartListView />
                <h2>Order Total: {calculateTotal(cartList)}</h2>
                <p>{cartList.length} Items in cart</p>
                <button onClick={handleRemoveAll}>Remove All</button>
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
