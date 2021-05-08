import {useState, useEffect, CSSProperties} from 'react'

const scGap : number = 0.02 
const delay : number = 20
export const useAnimatedScale = () => {
    const [scale, setScale] = useState(0)
    const [animated, setAnimated] = useState(false)
    const [dir, setDir] = useState(1)
    return {
        scale, 
        start() {
            if (!animated) {
                setAnimated(true)
                const interval = setInterval(() => {
                    setScale((prev : number) => {
                        if (scale > 1) {
                            setAnimated(false)
                            clearInterval(interval)
                            setDir((prevDir : number) => prevDir * -1)
                            return 1
                        }
                        return prev + scGap 
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
    return {
        parentStyle() {
            const left : string = `${x}px`
            return {
                position,
                left 
            }
        },
        parentHamburgStyle() {
            return {
                position, 
                top : `${size / 2}px`

            }
        },
        lineStyle(i : number, j : number) : CSSProperties {
            const top = `${(-size * 0.5 + size * 0.5 * i ) * (1 - scale)}px`
            const transform = `rotate(${45 * scale * (1 - 2 * j)})deg`
            const left = `${size / 10}px`
            return {
                top,
                left,
                transform
            }
        },
        sideNavStyle() {
            const zIndex : number = 1000
            const boxShadow = `10px 10px rgba(0, 0, 0, 0.5)`
            const left : string = `${-x + x * scale}px`
            const width = `${size}px`
            const height = `${h}px`
            const overflow = 'scroll'
            return {
                zIndex, 
                boxShadow, 
                left, 
                width,
                overflow
            }
        }
    }
}