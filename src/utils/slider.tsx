export const SampleNextArrow = (props: any) => {
  const { className, style, onClick } = props
  return <div className={className} style={{ ...style, display: 'block' }} onClick={onClick} />
}

export const SamplePrevArrow = (props: any) => {
  const { className, style, onClick } = props
  return <div className={className} style={{ ...style, display: 'block' }} onClick={onClick} />
}

export const settings = {
  dots: true,
  fade: true,
  infinite: true,
  speed: 500,
  swipeToSlide: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  appendDots: (dots: any) => (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        translate: '-50%',
        bottom: '10px',
      }}
    >
      <ul style={{ margin: '0px' }}> {dots} </ul>
    </div>
  ),
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
}

export const settingSlideList = {
  infinite: true,
  speed: 500,
  swipeToSlide: true,
  slidesToShow: 3,
  slidesToScroll: 3,
}
