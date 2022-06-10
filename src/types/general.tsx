export type DogBreed = {
  weight: {
    imperial: string,
    metric: string
  },
  height: {
    imperial: string,
    metric: string
  },
  id: number,
  name: string,
  country_code?: string,
  bred_for: string,
  breed_group?: string,
  life_span: string,
  temperament: string,
  origin?: string,
  reference_image_id: string,
  image: {
    id: string,
    url: string,
    width: number,
    height: number,
  },
}

