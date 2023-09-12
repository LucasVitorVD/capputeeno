import useProductsQuery from "@/hooks/useProductsQuery"
import { StyledSectionWrapper, StyledNavWrapper, StyledProductsWrapper } from "./styles"
import Pagination from "@/components/Pagination"
import { useState, useContext, useEffect } from "react"
import Navigation from "@/components/Navigation"
import Filter from "@/components/Filter"
import { Link } from "react-router-dom"
import ProductInterface from "@/shared/interfaces/product"
import ProductCard from "@/components/Product"
import { TailSpin } from "react-loader-spinner"
import { FilterContext } from "@/context/FilterContext"

const Home = () => {
  const [products, setProducts] = useState<ProductInterface[]>([])

  const { name, category, orderBy, currentPage } = useContext(FilterContext)

  const { error, data, loading } = useProductsQuery({ currentPage, category, name, orderBy })

  useEffect(() => {
    if (data !== undefined) {
      setProducts(data.allProducts)
    }
  }, [data])

  return (
    <StyledSectionWrapper>
      <StyledNavWrapper>
        <Navigation />
        <Filter />
      </StyledNavWrapper>

      <Pagination />

      <StyledProductsWrapper>
        {loading && <TailSpin color="black" />}

        {error && <p>{error.message}</p>}

        {!error && !loading && products?.length > 0 ? (
          products?.map((product) => (
            <Link key={product.id} to={`product/${product.id}`}>
              <ProductCard 
                image_url={product.image_url}
                name={product.name} 
                price_in_cents={product.price_in_cents}
                page="home"
              />
            </Link>
          ))
        ) : (
          <p>Não há produtos</p>
        )}
      </StyledProductsWrapper>

      <Pagination />
    </StyledSectionWrapper>
  )
}

export default Home