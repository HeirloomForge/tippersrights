import { useState, useCallback, useMemo } from 'react'
import type { Product } from '../data/mockProducts'

export interface CartItem {
  product: Product
  quantity: number
  size?: string
}

export interface CartActions {
  cart: CartItem[]
  totalItems: number
  totalPrice: number
  addItem: (product: Product, size?: string) => void
  removeItem: (productId: string, size?: string) => void
  updateQuantity: (productId: string, quantity: number, size?: string) => void
  clearCart: () => void
}

/** Unique key for a cart item — includes size for apparel variants */
function cartKey(productId: string, size?: string): string {
  return size ? `${productId}:${size}` : productId
}

export default function useCart(): CartActions {
  const [cart, setCart] = useState<CartItem[]>([])

  const addItem = useCallback((product: Product, size?: string) => {
    setCart((prev) => {
      const key = cartKey(product.id, size)
      const existing = prev.find(
        (item) => cartKey(item.product.id, item.size) === key
      )
      if (existing) {
        return prev.map((item) =>
          cartKey(item.product.id, item.size) === key
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { product, quantity: 1, size }]
    })
  }, [])

  const removeItem = useCallback((productId: string, size?: string) => {
    const key = cartKey(productId, size)
    setCart((prev) =>
      prev.filter((item) => cartKey(item.product.id, item.size) !== key)
    )
  }, [])

  const updateQuantity = useCallback(
    (productId: string, quantity: number, size?: string) => {
      const key = cartKey(productId, size)
      if (quantity <= 0) {
        setCart((prev) =>
          prev.filter((item) => cartKey(item.product.id, item.size) !== key)
        )
        return
      }
      setCart((prev) =>
        prev.map((item) =>
          cartKey(item.product.id, item.size) === key
            ? { ...item, quantity }
            : item
        )
      )
    },
    []
  )

  const clearCart = useCallback(() => {
    setCart([])
  }, [])

  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  )

  const totalPrice = useMemo(
    () =>
      cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [cart]
  )

  return { cart, totalItems, totalPrice, addItem, removeItem, updateQuantity, clearCart }
}
