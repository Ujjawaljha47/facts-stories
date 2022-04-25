import { Box, makeStyles, InputBase, Typography, TextareaAutosize, Button, CircularProgress, Dialog } from "@material-ui/core"
import {useState} from 'react'
import { postMessage } from "../services/api"
import { useHistory } from "react-router-dom"

const useStyle = makeStyles({
    component: {
        width: '100%',
        height: '70vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    formBx: {
        display: 'flex',
        flexDirection: 'column',
        width: '500px',
        background: '#dedede',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 10
    },
    input: {
        padding: '12px 15px',
        background: '#fff',
        borderRadius: '5px',
        width: '95%',
        marginTop: 10
    },
    message: {
        padding: '12px 15px',
        background: '#fff',
        borderRadius: '5px',
        width: '442px',
        marginTop: 10,
        border: 'none',
        '&:focus-visible': {
            outline: 'none'
        },
        resize: 'none',
        fontFamily: 'sans-serif'
    },
    submit: {
        margin: '10px 0',
        color: '#eee',
        padding: '8px 10px'
    },
    text: {
        fontSize: 18,
        marginBottom: 10
    },
    dialog: {
        padding: '12px 15px',
        fontWeight: 600,
        fontFamily: 'sans-serif'
    }
})

const initialValues = {
    name: "",
    email: "",
    mobile: "",
    message: ""
}
const Contact = () => {
    const classes = useStyle()
    const [data, setData] = useState(initialValues)
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    
    const history = useHistory()
    const handleClose = () => {
        setOpen(false)
        history.push('/')
    }
    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }
    const handleSubmit = async () => {
        setLoading(true)
        await postMessage(data)
        setLoading(false)
        setOpen(true)

    }
    return (
        <Box className={classes.component}>
            <Typography className={classes.text}>Contact the customer support below for more information</Typography>
            <Box className={classes.formBx}>
                <InputBase className={classes.input} placeholder="Name" name="name" onChange={e => handleChange(e)} />
                <InputBase className={classes.input} placeholder="Email" name="email" onChange={e => handleChange(e)} />
                <InputBase className={classes.input} placeholder="Mobile" name="mobile" onChange={e => handleChange(e)} />
                <TextareaAutosize placehholder="Messaage" placeholder="Leave a Message" name="message" className={classes.message} minRows={4} onChange={e => handleChange(e)}></TextareaAutosize>
                {loading && <Button variant='contained' style={{background: '#333'}} className={classes.submit}><CircularProgress color='#eee' /></Button>}
                {!loading && <Button variant='contained' style={{background: '#333'}} className={classes.submit} onClick={() => handleSubmit()}>Submit</Button>}
            </Box>
            <Dialog
                open={open}
                onClose={handleClose}
            > <Typography className={classes.dialog}>Thank you for you feedback. Our executives will contact you shortly.</Typography></Dialog>
        </Box>
    )
}

export default Contact