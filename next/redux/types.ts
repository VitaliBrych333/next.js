export type Movie = {
  id: number,
  title: string,
  release_date: string,
  poster_path: string,
  vote_average: number,
  genres: Array<string>,
  overview: string,
  runtime: number,
  budget: number,
  revenue: number,
  tagline: string,
  vote_count: number
}

export type ResponseMovies = {
  data: Array<Movie>,
  limit: number,
  offset: number,
  totalAmount: number
}