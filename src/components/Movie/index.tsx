import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Layout } from '..'
import { CardSkeletonLoading } from 'src/common/CardSkeletonLoading'
import { Pagination } from 'src/common/Pagination'
import { getMovieList } from 'src/utils/api/movie'
import { QUERY_KEYS } from 'src/utils/keys'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { PlayIcon } from 'src/common/CustomIcons'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import {
  IMovieListData,
  IMovieListDataResponse,
} from 'src/models/api/movie.interface'

export const MovieListScreen = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [page, setPage] = useState(Number(searchParams.get('page') ?? 1))
  const [limit] = useState<number>(5);
  const [keyword] = useState<string>('');

  const { data: MovieList, isLoading: MovieListLoading } = useQuery(
      [QUERY_KEYS.MOVIE_LIST, page, limit, keyword],
      async () => {
        const response = (await getMovieList({
          page,
          limit,
          name: keyword
        })) as IMovieListDataResponse;

        if (response) {
          return response
        }
      },
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    },
  )

  const onChangePage = (page: number) => {
    setPage(page)
    navigate({
      pathname: '/phim_moi',
      search: `?page=${page}`,
    })
  }

  if (MovieListLoading) {
    return (
      <Layout>
        <CardSkeletonLoading card={20} />
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="w-[calc(100%-30px)] md:container lg:w-[1100px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[20px] mt-[80px]">
        {MovieList &&
          MovieList.items?.map((item: IMovieListData, index: number) => (
            <Link key={index} to={`/movie/${item.id}`} className="relative group max-sm:mx-auto overflow-hidden">
              <div className="absolute text-[#FFFFFF] group-hover:flex flex-col justify-center items-center hidden w-full h-full bg-[#00000088] z-10">
                <PlayIcon width={48} height={48} color="#FFFFFF" />
              </div>
              <LazyLoadImage
                  src={item.poster}
                className="relative z-1"
                alt={item.name ?? 'Image'}
              />
            </Link>
          ))}
      </div>
      {MovieList && (
        <div className="w-fit mx-auto mt-[20px] pb-[30px]">
          <Pagination
            currentPage={MovieList.page}
            pageSize={MovieList.perPage}
            totalPages={MovieList.totalPages}
            totalRecord={MovieList.totalItems}
            onChange={onChangePage}
          />
        </div>
      )}
    </Layout>
  )
}
