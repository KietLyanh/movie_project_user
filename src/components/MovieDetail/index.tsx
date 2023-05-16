import { useQuery, useQueryClient } from '@tanstack/react-query'
import React, { ChangeEvent, useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Layout } from '..'
import { LoadingScreen } from 'src/common/LoadingScreen'
import {
  ICommentData,
  ICommentDataResponse,
  IMovieListData,
  IVoteData,
  IVoteDataResponse,
} from '../../models/api/movie.interface'
import { IUserInfo } from 'src/models/api/auth.interface'
import { USER_INFO } from 'src/utils/api/auth'
import {
  createCommentMovieData,
  getCommentData,
  getMovieData,
  getVoteMovieData,
  voteMovie,
} from '../../utils/api/movie'
import { QUERY_KEYS } from 'src/utils/keys'



type ParamProps = {
  id: string
}

export const MovieScreen = () => {
  const { id } = useParams<ParamProps>()
  const queryClient = useQueryClient()
  const commentValue = useRef() as React.MutableRefObject<HTMLInputElement>
  const [voteNumber, setVoteNumber] = useState<number>(1)
  const userInfo = useMemo(() => {
    return localStorage.getItem(USER_INFO) ? JSON.parse(localStorage.getItem(USER_INFO) ?? '{}') : undefined
  }, []) as IUserInfo

  const { data: movie, isLoading: isMovieLoading } = useQuery(
    [QUERY_KEYS.MOVIE_LIST, id],
    async () => {
      try {
        if (id) {
          const response = (await getMovieData({
            id,
          })) as IMovieListData
          if (response) {
            return response
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
      cacheTime: 5000000,
      enabled: !!id,
    },
  )

  const { data: comments, isLoading: isCommentLoading } = useQuery(
    [QUERY_KEYS.COMMENT_MOVIE, id],
    async () => {
      try {
        if (id) {
          const response = (await getCommentData({
            name: id,
          })) as ICommentDataResponse
          if (response) {
            return response
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
      cacheTime: 5000000,
      enabled: !!id,
    },
  )

  const { data: votes, isLoading: isVoteLoading } = useQuery(
    [QUERY_KEYS.VOTE_MOVIE, id],
    async () => {
      try {
        if (id) {
          const response = (await getVoteMovieData({
            name: id,
          })) as IVoteDataResponse
          if (response.items.length === 0) return 0
          const initialValue = 0
          const sum = response.items.reduce(
            (accumulator: number, currentValue: IVoteData) => accumulator + currentValue.votes,
            initialValue,
          )
          return sum / response.items.length
        }
      } catch (error) {
        console.log(error)
      }
    },
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
      cacheTime: 5000000,
      enabled: !!id,
    },
  )

  const handleChangeNumber = (e: ChangeEvent<HTMLInputElement>) => {
    if (!(Number(e.target.value) < 0 || Number(e.target.value) > 10)) {
      setVoteNumber(Number(e.target.value))
    }
  }

  const handleComment = async (e: { keyCode: number }) => {
    try {
      if (e.keyCode === 13 && userInfo && id && commentValue.current.value !== '') {
        await createCommentMovieData({ field: userInfo.id, comments: commentValue.current.value, movies: id })
        commentValue.current.value = ''
        await queryClient.invalidateQueries([QUERY_KEYS.COMMENT_MOVIE])
      }
    } catch (error) {}
  }

  const handleVote = async () => {
    try {
      if (userInfo && id && voteNumber !== 0) {
        await voteMovie({ field: userInfo.id, votes: voteNumber, movies: id })
        setVoteNumber(0)
        await queryClient.invalidateQueries([QUERY_KEYS.VOTE_MOVIE])
      }
    } catch (error) {}
  }

  if (isMovieLoading || isCommentLoading || isVoteLoading) {
    return (
      <div className="w-screen h-screen">
        <LoadingScreen />
      </div>
    )
  }

  return (
    <Layout>
      {movie && (
        <div className="w-full h-fit">
          <div className="w-full h-screen">
            <img className="absolute w-full object-cover brightness-50" src={movie.poster} alt={movie.name ?? 'Image'} />
            <div className="absolute w-full h-full z-10" />
            <div className="relative container lg:w-[1100px] mx-auto z-10 pt-[60px] max-sm:px-[10px]">
              <div className="flex justify-between items-center flex-wrap">
                <div className="text-[#FFFFFF]">
                  <p className="text-[32px]">{movie.name}</p>
                </div>
                <div className="flex items-center gap-[20px]">
                  <div className="flex items-center gap-[6px]">
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={voteNumber}
                      onChange={handleChangeNumber}
                      className="w-[50px] border-[1px] border-[#FFFFFF]"
                    />
                    <p className="text-[#FFFFFF] cursor-pointer" onClick={handleVote}>
                      Vote
                    </p>
                  </div>
                  <div className="flex flex-col justify-center items-center text-[#FFF] gap-[4px]">
                    <p className="text-[22px]">Rate</p>
                    <div>{votes ? votes : 0}/10</div>
                  </div>
                </div>
              </div>
              <div className="mt-[30px] flex flex-wrap h-fit sm:h-[450px] gap-[10px]">
                <img className="object-cover h-full max-md:hidden" src={movie.poster} alt={movie.name ?? 'Image'} />
                <iframe
                  src={`${movie.video}`}
                  className="md:flex-1 max-md:w-full h-full cursor-pointer max-sm:h-[200px] mx-auto"
                  title={movie.name}
                />
              </div>
              <div className="mt-[15px] max-sm:px-[10px]">
                <div className="mt-[10px] flex gap-[20px]">
                  <div className="w-full md:w-[calc(100%-350px)] max-sm:block max-md:flex">
                    <p className="text-[#FFFFFF] max-md:block max-sm:text-[12px]">{movie.description}</p>
                  </div>
                </div>
              </div>
              <div className="mt-[15px] max-sm:px-[10px]">
                <div className="flex gap-[15px] flex-wrap">
                  <div
                      className="px-[20px] text-center py-[5px] border-[#808080] text-[#FFFFFF] border-[1px] rounded-full"
                  >
                    {movie.category}
                  </div>
                </div>
              </div>
              <div className="mt-[10px] flex gap-[20px]">
                <div className="w-full md:w-[calc(100%-350px)] max-sm:block max-md:flex">
                  <div className="mt-[5px] pb-[30px]">
                    <div className="flex items-center gap-[20px] text-[#FFFFFF] border-[#FFFFFF] border-b-[1px]">
                      <p className="text-[15px] md:text-[22px] font-semibold">Actor: </p>
                      <div className="flex items-center gap-[10px]">
                            <div className="flex items-center gap-[10px]">
                              <p className="max-md:text-[10px]">
                                {movie.actor}
                              </p>
                              <div className="w-[2px] h-[2px] bg-[#FFFFFF]" />
                            </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Link
                to={`/watch/${movie.id}`}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-24 rounded"
              >
                Xem Phim
              </Link>
              <div className="container lg:w-[1100px] mx-auto mt-[20px]">
                <p className="text-[26px] font-semibold text-white">Comments</p>
                <div className="mt-[10px] pb-[30px]">
                  <div className="flex items-center gap-[20px] text-white">
                    <img
                        src={`http://127.0.0.1:8090/api/files/_pb_users_auth_/qbxkznqh7rnh95m/${userInfo.avatar}`}
                        alt={userInfo.name}
                        className="w-[60px] h-[60px] rounded-full object-cover"
                    />
                    <div>
                      <p>{userInfo.name}</p>
                      <input
                          ref={commentValue}
                          className="border-[1px] border-[#808080] w-[300px] py-[5px] px-[10px] rounded-md"
                          placeholder="Comment here"
                          onKeyDown={handleComment}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-[10px] pb-[100px] text-white font-semibold">
                  {comments &&
                      comments.items.map((comment: ICommentData) => {
                        if (comment.field !== userInfo.id) {
                          return (
                              <div key={comment.id} className="flex gap-[6px] mt-[5px]">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/1946/1946429.png"
                                    alt="Unknown User"
                                    className="w-[60px] h-[60px] rounded-full object-cover "
                                />
                                <div>
                                  <p>Unknown User</p>
                                  <p>{comment.comments}</p>
                                </div>
                              </div>
                          )
                        } else {
                          return (
                              <div key={comment.id} className="flex mt-[5px] gap-[6px]">
                                <img
                                    src={`http://127.0.0.1:8090/api/files/_pb_users_auth_/qbxkznqh7rnh95m/${userInfo.avatar}`}
                                    alt={userInfo.name}
                                    className="w-[60px] h-[60px] rounded-full object-cover"
                                />
                                <div className="pl-[20px]">
                                  <p>{userInfo.name}</p>
                                  <p>{comment.comments}</p>
                                </div>
                              </div>
                          )
                        }
                      })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}
