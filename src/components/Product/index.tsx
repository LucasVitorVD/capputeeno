import { useContext } from "react"
import { CartContext } from "@/context/CartContext"
import { Trash2 } from "lucide-react"
import { StyledProductCard } from "./styles"
import ProductInterface from "@/shared/interfaces/product"
import useFormatPrice from "@/hooks/useFormatPrice"

interface ProductCardProps extends Partial<ProductInterface> { 
  page: "home" | "cart"
}

const ProductCard = ({ 
  id,
  image_url, 
  name, 
  description, 
  price_in_cents, 
  quantity, 
  page
}: ProductCardProps) => {
  const { cartItems, setCartItems } = useContext(CartContext)

  const formattedPrice = useFormatPrice(price_in_cents ?? 0)

  function handleDeleteItem(id: string) {
    if (!id) {
      throw new Error('Produto não encontrado!')  
    }

    const updatedCartItems = cartItems.filter(item => item.id !== id)

    setCartItems(updatedCartItems)
    localStorage.setItem("items", JSON.stringify(updatedCartItems))
  }

  function handleOnChangeProductQuantity(id: string, newQuantity: number) {
    const updatedItems = cartItems.map(item => {
      if (item.id === id) {
        return { ...item, quantity: newQuantity };
      }

      return item
    })

    setCartItems(updatedItems)
    localStorage.setItem("items", JSON.stringify(updatedItems))
  }

  return (
    <StyledProductCard page={page}>
      <figure>
        <img src={image_url} alt={name} />
      </figure>
      
      {page === 'home' && (
        <div className="infos">
          <p>{name}</p>
          <p>{formattedPrice}</p>
        </div>
      )}

      {page === 'cart' && (
        <div className="infosContainer">
        <div className="infos">
            <div>
              <p>{name}</p>
              <button onClick={() => handleDeleteItem(id ?? "")}>
                <Trash2 color="#DE3838" />
              </button>
            </div>
            <p className="productDesc">
              {description}
            </p>
          </div>
          <div className="cardSummary">
          <select 
            name="productQuantity" 
            id="productQuantity"
            value={quantity} 
            onChange={(e) => handleOnChangeProductQuantity(id ?? "", Number(e.target.value))}
            >
              <option value="1" selected>1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
            <span><strong>{formattedPrice}</strong></span>
          </div>
        </div>
      )}
    </StyledProductCard>
  )
}

export default ProductCard