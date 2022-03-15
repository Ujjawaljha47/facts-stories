import {Box, makeStyles, Typography} from '@material-ui/core'
import {Edit, Delete} from '@material-ui/icons'
import {Link, useParams, useHistory} from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getPostDetail } from '../services/api'
import { deletePost } from '../services/api'

//components
import Comments from '../components/Comments'


const useStyle = makeStyles(theme=>({
    container: {
        padding: '0 100px',
        [theme.breakpoints.down("md")]: {
            padding: '0 2px'
        }
    },
    image: {
        width: '100%',
        height: '50vh',
        objectFit: 'cover'
    },
    icons: {
        float: 'right'
    },
    icon: {
        margin: 5,
        border: '1px solid #878787',
        padding: 5,
        cursor: 'pointer'
    },
    title: {
        fontSize: 38,
        textAlign: 'center',
        fontWeight: 600,
        margin: '50px 0 10px 0'
    },
    subHeading: {
        display: 'flex',
        margin: '20px 0',
        color: '#878787',
        [theme.breakpoints.down("sm")]: {
            display: 'block'
        }
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    }
}))


const DetailView = ({userInfo}) => {
    const classes = useStyle()
    const { id } = useParams()
    const url = "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
    
    const [post, setPost] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            let data = await getPostDetail(id)
            setPost(data)
        }
        fetchData()
    }, [] )
    const history = useHistory()

    const deleteBlog = async () => {
        await deletePost(post._id, post)
        history.push('/')
    }
    
    
    return userInfo.name === post.username
    ? (
        <Box className={classes.container}>
            <img className={classes.image} src={post.picture || url} alt="image" />
            <Box className={classes.icons}>
                <Link to={`/update/${post._id}`} className={classes.link}><Edit className={classes.icon} color="primary"/></Link>
                <Delete className={classes.icon} onClick={() => deleteBlog()} color="error" />
            </Box>
            <Typography class={classes.title}>{post.title}</Typography>
            <Box className={classes.subHeading}>
                <Link to={`/?username=${post.username}`} className={classes.link}>
                    <Typography>Author: <span style={{fontWeight: 600}}>{post.username}</span></Typography>
                </Link>
                <Typography style={{marginLeft: 'auto'}}>{new Date(post.date).toDateString()}</Typography>
            </Box>
            <Typography>{post.description}</Typography>
            <Comments postId={post._id} username={post.username} userInfo={userInfo} />
        </Box>
    )
    : <Box className={classes.container}>
        <img className={classes.image} src={post.picture || url} alt="image" />
        <Typography class={classes.title}>{post.title}</Typography>
        <Box className={classes.subHeading}>
            <Link to={`/?username=${post.username}`} className={classes.link}>
                <Typography>Author: <span style={{fontWeight: 600}}>{post.username}</span></Typography>
            </Link>
            <Typography style={{marginLeft: 'auto'}}>{new Date(post.date).toDateString()}</Typography>
        </Box>
        <Typography>{post.description}</Typography>
        <Comments postId={post._id} username={post.username} userInfo={userInfo} />
     </Box>
}
export default DetailView