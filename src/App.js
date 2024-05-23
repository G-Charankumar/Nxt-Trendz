import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
    removeAllCartItems: () => {},
    addCartItem: () => {},
    removeCartItem: () => {},
    incrementCartItemQuantity: () => {},
    decrementCartItemQuantity: () => {},
  }

  addCartItem = product => {
    const {cartList} = this.state
    const existingItemIndex = cartList.findIndex(item => item.id === product.id)
    if (existingItemIndex !== -1) {
      const updatedCartList = [...cartList]
      updatedCartList[existingItemIndex].quantity += 1
      this.setState({cartList: updatedCartList})
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
  }

  removeCartItem = product => {
    const updatedCartList = this.state.cartList.filter(
      item => item.id !== productId,
    )
    this.setState({cartList: updatedCartList})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = product => {
    const updatedCartList = this.state.cartList.map(item => {
      if (item.id === productId) {
        return {...item, quantity: item.quantity + 1}
      }
      return item
    })
    this.setState({cartList: updatedCartList})
  }

  decrementCartItemQuantity = product => {
    const updatedCartList = this.state.cartList.map(item => {
      if (item.id === productId && item.quantity > 1) {
        return {...item, quantity: item.quantity - 1}
      }
      return item
    })
    this.setState({cartList: updatedCartList})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
