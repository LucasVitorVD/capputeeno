function useFormatPrice(price: number) {
  const priceInDecimal = (price ?? 0) / 100

  const formattedPrice = priceInDecimal.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  return formattedPrice
}

export default useFormatPrice