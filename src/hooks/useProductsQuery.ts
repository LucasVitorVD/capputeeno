import { useQuery, gql } from "@apollo/client"

interface Props {
  name: string,
  category: string,
  orderBy: string,
  currentPage: number
}

interface Filters {
  name: string,
  category: string,
  orderBy?: string
}

interface Fields {
  sortField: string, 
  sortOrder: string
}

interface OrderByProps {
  news: Fields,
  bigSmall: Fields,
  smallBig: Fields,
  bestSellers: Fields
}

const GET_PRODUCTS = gql`
  query Capputeno($page: Int, $filter: ProductFilter, $sortField: String, $sortOrder: String) {
    allProducts(page: $page, filter: $filter, sortField: $sortField, sortOrder: $sortOrder) {
      id
      name
      price_in_cents
      image_url
    }
  }
`

const useProductsQuery = ({ name, category, currentPage, orderBy }: Props) => {
  const filters: Filters = {
    category,
    name,
  }

  const orderByToSort: OrderByProps = {
    news: { sortField: "sales", sortOrder: "ASC" },
    bigSmall: { sortField: "price_in_cents", sortOrder: "DSC" },
    smallBig: { sortField: "price_in_cents", sortOrder: "ASC" },
    bestSellers: { sortField: "sales", sortOrder: "DSC" },
  }

  const activeFilters = {} as Filters

  for (const [filterName, filterValue] of Object.entries(filters)) {
    if (filterValue !== "") {
      activeFilters[filterName as keyof Filters] = filterValue
    }
  }

  const { error, data, loading } = useQuery(GET_PRODUCTS, {
    variables: {
      page: currentPage,
      filter: activeFilters,
      sortField: orderByToSort?.[orderBy as keyof OrderByProps]?.sortField ?? "",
      sortOrder: orderByToSort?.[orderBy as keyof OrderByProps]?.sortOrder ?? ""
    }
  })

  return { error, data, loading }
}

export default useProductsQuery