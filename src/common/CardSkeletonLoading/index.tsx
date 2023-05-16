import Skeleton from 'react-loading-skeleton'

interface Props {
  card: number
}

export const CardSkeletonLoading = ({ card }: Props) => {
  return (
    <div className="container lg:w-[1100px] mx-auto grid grid-cols-4 gap-[20px] mt-[20px]">
      {Array(card)
        .fill(0)
        .map((_, index: number) => (
          <div key={index} className="relative">
            <Skeleton height={380} />
          </div>
        ))}
    </div>
  )
}
