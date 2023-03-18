import Circle from './Circle'

interface Props {
  width: number
  height: number
  level:any
}

function App({ width, height }: Props) {
  const circle = {
    cx: width / 2,
    cy: height / 2,
    level: [],
    r: 500,
  }

  return (
    <svg width={width} height={height}>
      <Circle cx={circle.cx} cy={circle.cy} r={circle.r} level={circle.level}/>
    </svg>
  )
}

export default App