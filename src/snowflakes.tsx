import * as React from "react";

export interface SnowflakesProps {
  /** Container id */
  id?: string;
  
}

export const Snowflakes: React.FC<SnowflakesProps> = ({
  id = "snowflakes",
}) => {
  const canv = React.useRef<HTMLCanvasElement>(null)
  
  React.useEffect(() => {
    if(canv.current) {
      const NUMBER_OF_FLAKES = 100
      const MAX_FLAKES_SIZE = 3
      const MAX_FLAKES_BLUR = 2
      const MAX_FLAKES_SPEED = 0.5
      const FLAKES_COLOR = '#dddddd';
      const flakes:Array<object> = []

      canv.current.style.position = 'fixed'
      canv.current.style.top = '0'
      canv.current.style.left = '0'
      canv.current.style.pointerEvents = 'none'
      canv.current.width = window.innerWidth
      canv.current.height = window.innerHeight

      const ctx = canv.current.getContext('2d')
      const createFlake = () => canv.current && ({
        x: Math.random() * canv.current.width,
        y: Math.random() * canv.current.height - canv.current.height,
        radius: Math.random() * MAX_FLAKES_SIZE + 3,
        transparency: Math.random(),
        blur: Math.random() * MAX_FLAKES_BLUR,
        color: FLAKES_COLOR,
        speed: Math.random() * MAX_FLAKES_SPEED + 1,
        sway: Math.random() - 0.5
      })

      const drawFlakes = flake => {
        if(ctx) {
          ctx.beginPath()
          ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2)
          ctx.fillStyle = flake.color
          ctx.filter = `blur(${flake.blur}px)`
          ctx.globalAlpha = flake.transparency
          ctx.fill()
          ctx.closePath()
        }
      }

      const updateFlakes = flake => {
        flake.y += flake.speed
        flake.x += flake.sway
        if(canv.current && flake.y > canv.current.height) {
          Object.assign(flake, createFlake())
        }
      }

      const animate = () => {
        if(ctx && canv.current) {
          ctx.clearRect(0,0,canv.current.width, canv.current.height)
          flakes.forEach((flake) => {
            updateFlakes(flake)
            drawFlakes(flake)
          })

          requestAnimationFrame(animate)
        }
      }
      
      for(let i = 0; i < NUMBER_OF_FLAKES; i++) {
        flakes.push(createFlake() as object)
      }

      window.addEventListener('resize', () => {
        if(canv.current) {
          canv.current.width = window.innerWidth
          canv.current.height = window.innerHeight
        }
      })

      animate()
    }
  },[canv])

  return <canvas ref={canv} id={id} />
};
