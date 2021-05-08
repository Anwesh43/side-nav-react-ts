import React from 'react'
import {useDimension, useAnimatedScale} from './hooks'

const withContext  = (MainComponent : React.FC<any>) : React.FC<any> => {
    
    return (mainProps : any) => {
        const {scale, start : onClick} = useAnimatedScale()
        const {w, h} = useDimension()
        const props = {
            w, 
            h, 
            scale, 
            onClick 
        }
        return (
            <MainComponent {...props}></MainComponent>
        )
    }
}

export default withContext