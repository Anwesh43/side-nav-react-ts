import React from 'react'
import {useStyle} from './hooks'
import withContext from './withContext'

interface SideNavProps {
    w : number, 
    h : number,
    scale : number, 
    onClick : Function 
}

const HamburgIcon : React.FC<SideNavProps> = (props : SideNavProps) => {
    const {parentHamburgStyle, lineStyle} = useStyle(props.w, props.h, props.scale)
    return (
        <div style = {parentHamburgStyle()} onClick = {() => props.onClick()}>
            {[0, 1].map((j : number) => (
              <React.Fragment>
                {[0, 1, 2].map((i : number) => (
                    <div style= {lineStyle(i, j)}>
                    </div>
                ))}
               </React.Fragment>   
            ))}
        </div>
    )
}

const SideNav : React.FC<SideNavProps> = (props : SideNavProps) => {
    const {parentStyle, sideNavStyle, headerStyle, overlayStyle} = useStyle(props.w, props.h, props.scale)
    return (
        <React.Fragment>
            <div style = {headerStyle()}></div>
            <div style = {overlayStyle()}></div>
            <div style = {parentStyle()}>
                <div style = {sideNavStyle()}>
                </div>
                <HamburgIcon {...props}/>
            </div>
        </React.Fragment>
    )
}

export default withContext(SideNav)