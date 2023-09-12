export default interface ProductInterface {
  id?: string,
  name: string,
  description: string,
  image_url: string,
  price_in_cents: number,
  quantity?: number
}