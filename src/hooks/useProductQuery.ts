import { useQuery, gql } from "@apollo/client"

interface Props {
  id: string | undefined
}

const GET_PRODUCT = gql`
  query Capputeno($id: ID!) {
    Product(id: $id) {
      id
      name
      price_in_cents
      image_url
      description
    }
  }
`

const useProductQuery = ({ id }: Props) => {
  if (typeof id !== 'string') {
    throw new Error('Não foi possível encontrar o produto')
  }

  const { error, data, loading } = useQuery(GET_PRODUCT, {
    variables: {
      id
    }
  })

  return { error, data, loading }
}

export default useProductQuery