import { StyledNavigationWrapper } from "./styles"
import { useContext } from "react"
import { FilterContext } from "@/context/FilterContext"

const navigations = [
  {
    category: "",
    title: "TODOS OS PRODUTOS"
  },
  {
    category: "t-shirts",
    title: "CAMISETAS"
  },
  {
    category: "mugs",
    title: "CANECAS"
  }
]

const Navigation = () => {
  const { setCategory, category, setName, setOrderBy } = useContext(FilterContext)

  function handleSetCategory(category: string) {
    if (category === "") {
      setCategory(category)
      setName("")
      setOrderBy("")
    } else {
      setCategory(category)
    }
  }

  return (
    <StyledNavigationWrapper>
      {navigations.map(navigation => (
        <p
          key={navigation.category}
          onClick={() => handleSetCategory(navigation.category)}
          className={navigation.category === category ? "isActive" : ""}
        >
          {navigation.title}
        </p>
      ))}
    </StyledNavigationWrapper>
  )
}

export default Navigation