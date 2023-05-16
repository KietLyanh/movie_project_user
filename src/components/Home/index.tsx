import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { useState } from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useQuery } from '@tanstack/react-query'
import { Layout } from '..'
import { LoadingScreen } from 'src/common/LoadingScreen'
import { IMovieListData, IMovieListDataResponse } from 'src/models/api/movie.interface'
import { QUERY_KEYS } from 'src/utils/keys'
import { getMovieList } from 'src/utils/api/movie'
import { PlayIcon } from 'src/common/CustomIcons'
import { settingSlideList, settings } from 'src/utils/slider'

dayjs.extend(utc)

export const HomeScreen = () => {
  const [page] = useState<number>(0)
  const [limit] = useState<number>(5)
  const [keyword] = useState<string>('')


  const { data: MovieList, isLoading: MovieListLoading } = useQuery(
    [QUERY_KEYS.MOVIE_LIST, page, limit, keyword],
    async () => {
      const response = (await getMovieList({
        page,
        limit,
        name: keyword,
      })) as IMovieListDataResponse

      if (response) {
        return response.items
      }
    },
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
      cacheTime: 5000000,
    },
  )

  if ( MovieListLoading) {
    return (
      <div className="w-screen h-screen">
        <LoadingScreen />
      </div>
    )
  }

  return (
    <Layout>
      <div className="w-[calc(100%-50px)] md:container lg:w-[1100px] mt-[100px] mx-auto pb-[50px]">
        {MovieList && (
          <Slider {...settings} className="h-[400px] relative">
            {MovieList?.map((item: IMovieListData, index: number) => (
              <div className={`w-full h-[400px]`} key={index}>
                <div className="absolute w-full h-full bg-[#00000074] z-10" />

                <LazyLoadImage
                  src={item.poster}
                  height={400}
                  width={1100}
                  effect="blur"
                  wrapperClassName="object-cover w-full absolute top-0 left-0 z-1"
                  alt={item.name ?? 'Image'}
                />

                <div className="text-[#FFFFFF] absolute bottom-[40px] left-[20px] z-100">
                  <Link
                    to={`/movie/${item.id}`}
                    className="w-[100px] py-[10px] bg-yellow-500 flex items-center gap-[6px] justify-center rounded-lg"
                  >
                    <PlayIcon width={24} height={24} color="#FFFFFF" />
                    <p>Watch</p>
                  </Link>
                  <p className="text-[42px] font-semibold">{item.name}</p>
                  <div className="flex gap-[10px] items-center"></div>
                </div>
              </div>
            ))}
          </Slider>
        )}

        {MovieList && (
          <div className="w-full mt-[30px]">
            <div className="flex justify-between items-center">
              <p className="text-[22px]">Phim Mới</p>
              <Link to={'/now_playing'} className="underline">
                See all
              </Link>
            </div>
            <Slider {...settingSlideList} className="h-[500px] mt-[10px] relative">
              {MovieList?.map((item: IMovieListData, index: number) => (
                <Link key={index} to={`/movie/${item.id}`} className="relative group max-sm:mx-auto h-[800x] w-[90%]">
                  <div className="absolute text-[#FFFFFF] group-hover:flex flex-col justify-center items-center hidden w-[95%] h-full bg-[#00000088] z-10">
                    <PlayIcon width={48} height={48} color="#FFFFFF" />
                  </div>
                  <LazyLoadImage
                    src={item.poster}
                    className="relative z-1 h-full w-[95%] object-cover"
                    alt={item.name ?? 'Image'}
                  />
                </Link>
              ))}
            </Slider>
          </div>
        )}
      </div>
    </Layout>
  )
}
