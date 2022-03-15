import {Box, Typography, makeStyles} from '@material-ui/core'
const useStyle = makeStyles({
    container: {
        borderRadius: 10,
        height: 340,
        border: '1px solid #d3cede',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        margin: 10,
        '& > *': {
            padding: '0 5px 5px 5px'
        }
    },
    image: {
        height: 150,
        width: '100%',
        objectFit: 'cover',
        borderRadius: '10px 10px 0 0'
    },
    text: {
        color: '#878787',
        fontSize: 12
    },
    title: {
        fontSize: 18,
        fontWeight: 600
    },
    detail: {
        fontSize: 14,
        paddingLeft: 8,
    }
})

const Post = ({post}) => {
    const url = post.picture || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80"
    const classes = useStyle()
    const addElipsis = (str, limit) => {
        return str.length > limit ? str.substring(0, limit) + '...' : str
    }
    return (
        <Box className={classes.container}>
            <img className={classes.image} src={url} alt="wrapper" />
            <Typography className={classes.text}>{post.category}</Typography>
            <Typography className={classes.title} style={{textAlign: 'center'}}>{addElipsis(post.title, 40)}</Typography>
            <Typography className={classes.text}>Author: {post.username}</Typography>
            <Typography className={classes.detail} >{addElipsis(post.description, 130)}</Typography>
        </Box>
    )
}

export default Post