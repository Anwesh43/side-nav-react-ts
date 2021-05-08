import {useState, useEffect, CSSProperties} from 'react'

const scGap : number = 0.1 
const delay : number = 20
export const useAnimatedScale = () => {
    const [scale, setScale] = useState(0)
    const [animated, setAnimated] = useState(false)
    const [dir, setDir] = useState(1)
    return {
        scale, 
        start() {
            if (!animated) {
                console.log(animated, dir)
                setAnimated(true)
                const interval = setInterval(() => {
                    setScale((prev : number) => {
                        if ((prev > 1 && dir == 1)  || (prev < 0 && dir == -1)) {
                            setAnimated(false)
                            clearInterval(interval)
                            setDir(dir * -1)
                            return (1 + dir) / 2
                        }
                        return prev + scGap * dir
                    })
                }, delay)
            }
        }
    }
}

export const useDimension = () => {
    const [w, setW] = useState(window.innerWidth)
    const [h, setH] = useState(window.innerHeight)
    useEffect(() => {
        window.onresize = () => {
            setW(window.innerWidth)
            setH(window.innerHeight)
        }
    })
    return {
        w, 
        h
    }
}

export const useStyle = (w : number, h : number, scale : number) => {
    const position = 'absolute'
    const maxX : number = w < 640 ? w * 0.6 : w * 0.33
    const x : number = maxX * scale 
    const size : number = Math.min(w, h) / 15 
    const background = '#2962FF'
    return {
        parentStyle() : CSSProperties {
            const left : string = `${x}px`
            
            return {
                position,
                left,
            }
        },

        headerStyle() : CSSProperties {
            const position = 'absolute'
            const height : string = `${size * 2}px`
            const width : string = `${w}px`
            return {
                position, 
                width, 
                height, 
                background
            }
        },
        parentHamburgStyle() : CSSProperties {
            const height : string = `${size}px`
            const width : string = `${size}px`
            return {
                position, 
                top : `${size}px`,
                width, 
                height, 
                background

            }
        },
        lineStyle(i : number, j : number) : CSSProperties {
            const top = `${(-size * 0.5 + size * 0.5 * i ) * (1 - scale)}px`
            const transform = `rotate(${45 * scale * (1 - 2 * j)}deg)`
            const left = `${size / 10}px`
            return {
                position,
                top,
                left,
                transform,
                width : `${size}px`,
                height : `${6}px`,
                background:'white'
            }
        },
        sideNavStyle() : CSSProperties {
            const zIndex : number = 1000
            const boxShadow = `3px 3px rgba(0, 0, 0, 0.1)`
            const left : string = `${-maxX}px`
            const width = `${maxX}px`
            const height = `${h}px`
            const overflow = 'scroll'
            return {
                position,
                zIndex, 
                boxShadow, 
                left, 
                width,
                height,
                background
            }
        }
    }
}