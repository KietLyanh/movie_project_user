
export interface IMovieListData {
  id: string
  collectionId: string
  collectionName: string
  created: string
  updated: string
  name: string
  description: string
  actor: string;
  poster: string
  category: string;
  video: string
}
export interface IMovieListDataResponse {
  page: number
  perPage: number
  totalPages: number
  totalItems: number
  items: IMovieListData[]
}

export interface ICommentData {
  collectionId: string
  collectionName: string
  comments: string
  created: string
  field: string
  id: string
  movies: string
  updated: string
}

export interface ICommentDataResponse {
  items: ICommentData[]
  page: 1
  perPage: 30
  totalItems: 1
  totalPages: 1
}

export interface IVoteData {
  collectionId: string
  collectionName: string
  votes: number
  created: string
  field: string
  id: string
  movies: string
  updated: string
}

export interface IVoteDataResponse {
  items: IVoteData[]
  page: 1
  perPage: 30
  totalItems: 1
  totalPages: 1
}
