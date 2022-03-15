import { Visibility, VisibilityOff } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core'
import { useState } from 'react'

const useStyle = makeStyles({
    eye: {
        width: 20,
        color: '#ababab',
        cursor: 'pointer'
    }
})

const Eye = ({elm}) => {
    const classes = useStyle()
    const [visible, setVisible] = useState(false)

    const element = document.getElementById(elm)
    if(element) {
        if(visible) {
            document.getElementById(elm).type='text'
        }
        else document.getElementById(elm).type='password'
    }

    return !visible
    ? (
        <VisibilityOff className={classes.eye} onClick={() => setVisible(true)} />
    )
    : (
        <Visibility className={classes.eye} onClick={() => setVisible(false)} />
    )
}

export default Eye