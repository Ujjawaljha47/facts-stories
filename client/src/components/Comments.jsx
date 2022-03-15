import {Box, Button, makeStyles, TextareaAutosize, Typography} from '@material-ui/core'
import { useState, useEffect } from 'react'
import { newComment, getComments } from '../services/api'

//components
import Comment from './Comment'


const useStyle = makeStyles({
    container: {
        marginTop: 100,
        display: 'flex'
    },
    image: {
        width: 30,
        height: 30,
        borderRadius: '50%'
    },
    textarea: {
        width: '100%',
        margin: '0 20px',
        resize: 'none',
        padding: '5px 8px',
        fontSize: 14,
        border: '1px solid #999',
        borderRadius: '5px',
        '&:focus': {
            outline: 'none'
        } 
    },
    button: {
        height: 40
    }
})
const initialValues = {
    username: '',
    postId: '',
    date: '',
    comments: ''
}
const Comments = ({postId, username, userInfo}) => {
    const classes = useStyle()
    const url = 'https://us.123rf.com/450wm/tuktukdesign/tuktukdesign1608/tuktukdesign160800043/61010830-user-icon-man-profile-businessman-avatar-person-glyph-vector-illustration.jpg?ver=6'
    const [comment, setComment] = useState(initialValues) 
    const [comments, setComments] = useState([])

    useEffect(() => {
        const fetchComments = async () => {
            let response = await getComments(postId)
            setComments(response)
        } 
        fetchComments()
    }, [comment, comments])
    

    const handleChange = (e) => {
        setComment({...comment, 
            username: userInfo.name,
            postId: postId,
            comments: e.target.value
        })
    }

    const postComment = async () => {
        setComment(comment.date = new Date())
        await newComment(comment)
    }
    return (
        <Box>
            <Box className={classes.container}>
                <img src={url} alt="" className={classes.image}/>
                <TextareaAutosize placeholder='Comment...' 
                    className={classes.textarea}
                    minRows={3}
                    onChange={(e) => handleChange(e)}
                    id="cmmnt"
                />
                <Button className={classes.button} variant="contained" color="primary" onClick={() => postComment()}>Post</Button>
            </Box>
            {
                comments.map(data => (
                    <Comment comment={data} userInfo={userInfo} username={username} />
                ))
            }
        </Box>
    )
}

export default Comments