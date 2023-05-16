import { useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useQuery } from '@tanstack/react-query'
import { Layout } from '..'
import { CardSkeletonLoading } from 'src/common/CardSkeletonLoading'
import { Pagination } from 'src/common/Pagination'
import { QUERY_KEYS } from 'src/utils/keys'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { PlayIcon } from 'src/common/CustomIcons'
import {getMovieList} from "../../utils/api/movie";
import {IMovieListDataResponse} from "../../models/api/movie.interface";

export const SearchMultiScreen = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [page, setPage] = useState<number>(1)
  const [limit] = useState<number>(5);

  const { data: searchData, isLoading: isSearchLoading } = useQuery(
      [QUERY_KEYS.MOVIE_LIST, page, limit],
      async () => {
          try {
        const response = (await getMovieList({
          page,
          limit,
          name: searchParams.get('q') ?? '',
        })) as IMovieListDataResponse;

        if (response) {
          return response
        }
          } catch (error) {
              console.log(error)
          }
      },
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
        enabled: searchParams.get('q') !== '',
    },
  )

  const onChangePage = (page: number) => {
    setPage(page)
    navigate({
      pathname: '/search',
      search: `?&keyword=${searchParams.get('q') ?? ''}`,
    })
  }

  if (isSearchLoading && isSearchLoading) {
    return (
      <Layout>
        <CardSkeletonLoading card={20} />
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="w-[calc(100%-30px)] md:container lg:w-[1100px] mx-auto mt-[80px]">
        {searchData && !isSearchLoading && searchParams.get('q')  ? (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[20px] mt-[20px]">
            {searchData.items?.map((item: any, index: number) => (
              <Link
                key={index}
                to={`/movie/${item.id}`}
                className="relative group max-sm:mx-auto overflow-hidden"
              >
                <div className="absolute text-[#FFFFFF] group-hover:flex flex-col justify-center items-center hidden w-full h-full bg-[#00000088] z-10">
                  <PlayIcon width={48} height={48} color="#FFFFFF" />
                </div>
                <LazyLoadImage
                    src={item.poster}
                  className="relative z-1"
                  alt={ item.name ?? 'Image'}
                />
              </Link>
            ))}
          </div>
        ) : (
          <div className="w-full">
            <p className="text-[48px] font-semibold">Search</p>
            <p>Search movies or tv shows by typing a word or phrase in the search box at the top of this page.</p>
          </div>
        )}
        {searchData && searchData.items?.length > 0 && (
          <div className="w-fit mx-auto mt-[20px] pb-[30px]">
            <Pagination
              currentPage={searchData.page}
              pageSize={searchData.perPage}
              totalPages={searchData.totalPages}
              totalRecord={searchData.totalItems}
              onChange={onChangePage}
            />
          </div>
        )}
      </div>
    </Layout>
  )
}
