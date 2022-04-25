import { Box, makeStyles, FormControl, InputBase, Button, TextareaAutosize, InputLabel, MenuItem, Select, CircularProgress } from '@material-ui/core'
import { AddCircle } from '@material-ui/icons'
import { useState, useEffect } from 'react'
import { createPost, uploadFile } from '../services/api'
import { useHistory } from 'react-router-dom'

const useStyle = makeStyles(theme=> ({
    container: {
        padding: '0px 100px',
        [theme.breakpoints.down("md")]: {
            padding: '0 2px'
        }
    },
    image: {
        width: '100%',
        height: '50vh',
        objectFit: 'cover'
    },
    form: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10,
    },
    textField: {
        flex: 1,
        padding: '0 10px'
    },
    textArea: {
        width: '100%',
        marginTop: 30,
        border: 'none',
        '&:focus-visible': {
            outline: 'none'
        },
        fontSize: 16,
        resize: 'vertical'
    },
    category: {
        minWidth: 90,
        marginRight: 15
    },
    progressBx: {
        width: '100%',
        height: '50vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}))
const initialValue = {
    title: "",
    description: "",
    picture: "",
    username: "",
    category: "All",
    date: new Date()
}
const CreateView = ({userInfo}) => {
    console.log(userInfo)
    const classes = useStyle()
    const [post, setPost] = useState(initialValue)
    const [file, setFile] = useState('')
    const [image, setImage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [open, setOpen] = useState(false);
    const history = useHistory()

    const url = image || "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"

    useEffect(() => {
        const getImage = async () => {
            console.log(file)
            if(file) {
                const data = new FormData()
                data.append('name', file.name)
                data.append('file', file)
                
                const image = await uploadFile(data)
                post.picture = image.data
                setImage(image.data)
                setIsLoading(false)
            }
        }
        getImage()
    }, [file])

    useEffect(() => {
        setPost({...post, ['username']: userInfo.name})
    }, [])

    const handleChange = (e) => {
        setPost({...post, [e.target.name]:e.target.value})
    }
    const handleChangeCategory = (e) => {
        setPost({...post, ['category']: e.target.value})
    }
    const savePost = async () => {
        await createPost(post)
        history.push('/')
    }
    const handleFileChange = (e) => {
        setIsLoading(true)
        setFile(e.target.files[0])
    }
    
      const handleClose = () => {
        setOpen(false);
      };
    
      const handleOpen = () => {
        setOpen(true);
      };
    return (
        <Box className={classes.container}>
            {isLoading && <Box className={classes.progressBx}><p>Uploading image...  </p><CircularProgress /></Box>}
            {!isLoading && <img className={classes.image} src={url} alt="thumbnail"></img>}
            <FormControl className={classes.form}>
                <label htmlFor='fileInput'>
                    <AddCircle color='action' style={{cursor: 'pointer'}} />
                </label>
                <input type="file" id="fileInput" accept="image/*" style={{display: 'none'}} onChange={(e) => handleFileChange(e) } />
                <InputBase 
                    onChange={(e) => handleChange(e)} 
                    className={classes.textField} 
                    placeholder="Title"
                    name="title" 
                />
                <FormControl>
                    <InputLabel id="demo-controlled-open-select-label">Category</InputLabel>
                    <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={post.category}
                    onChange={(e) => handleChangeCategory(e)}
                    className={classes.category}
                    >
                    <MenuItem value='All'>All</MenuItem>
                    <MenuItem value='Music'>Music</MenuItem>
                    <MenuItem value='Movies'>Movies</MenuItem>
                    <MenuItem value='Sports'>Sports</MenuItem>
                    <MenuItem value='Tech'>Tech</MenuItem>
                    <MenuItem value='Fashion'>Fashion</MenuItem>
                    </Select>
                </FormControl>
                <Button onClick={() => savePost()} variant="contained" color="primary" >Publish</Button>
            </FormControl>
            <TextareaAutosize 
                onChange={(e) => handleChange(e)}
                minRows={3}
                placeholder="Tell your story..."
                className={classes.textArea}
                name="description"
            />
        </Box>
    )
}

export default CreateView