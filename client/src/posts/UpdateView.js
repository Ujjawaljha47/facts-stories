import { Box, makeStyles, FormControl, InputBase, Button, TextareaAutosize } from '@material-ui/core'
import { AddCircle } from '@material-ui/icons'
import { useParams, useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getPostDetail, updatePost, uploadFile } from '../services/api'

const useStyle = makeStyles(theme => ({
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
        marginTop: 50,
        border: 'none',
        '&:focus-visible': {
            outline: 'none'
        },
        fontSize: 16
    }
}))

const initialValue = {
    title: "",
    description: "",
    picture: "",
    username: "Mishor",
    category: "All",
    date: new Date()
}
const UpdateView = () => {
    const classes = useStyle()

    const { id } = useParams()
    const [post, setPost] = useState(initialValue)
    const [file, setFile] = useState('')
    const [image, setImage] = useState('')
    const history = useHistory()

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
            }
        }
        getImage()
    }, [file])

    useEffect(() => {
        const fetchData = async  () => {
            let data = await getPostDetail(id)
            setPost(data)
        }
        fetchData()
    }, [])

    const handleChange = (e) => {
        setPost({...post, [e.target.name]:e.target.value})
    }

    const editPost = async () => {
        console.log(post)
        await updatePost(id, post)
        history.push(`/detail/${id}`)

    }
    const url = post.picture || "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
    return (
        <Box className={classes.container}>
            <img className={classes.image} src={url} alt="" />

            <FormControl className={classes.form}>
            <label htmlFor='fileInput'>
                <AddCircle color='action' style={{cursor: 'pointer'}} />
            </label>
            <input type="file" id="fileInput" accept="image/*" style={{display: 'none'}} onChange={(e) => setFile(e.target.files[0]) } />
                <InputBase 
                    className={classes.textField} 
                    placeholder="Title" 
                    value={post.title}
                    name="title"
                    onChange={(e) => handleChange(e)}
                     />
                <Button variant="contained" color="primary" onClick={() => editPost()}>Update</Button>
            </FormControl>
            <TextareaAutosize 
                minRows={3}
                placeholder="Tell your story..."
                className={classes.textArea}
                value={post.description}
                name="description"
                onChange={(e) => handleChange(e)}
            />
        </Box>
    )
}

export default UpdateView