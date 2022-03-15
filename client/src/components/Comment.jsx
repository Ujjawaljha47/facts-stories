import {Box, Typography, makeStyles} from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import { deleteComment } from '../services/api'

const useStyle = makeStyles({
    component: {
        marginTop: 20,
        background: '#f5f5f5',
        padding: 10,
        borderRadius: 5
    },
    container: {
        display: 'flex'
    },
    username: {
        fontWeight: 600,
        fontSize: 18
    },
    date: {
        color: '#878787',
        fontSize: 14,
        marginLeft: 25,
        marginTop: 3
    },
    delete: {
        marginLeft: 'auto',
        cursor: 'pointer'
    }
})

const Comment = ({comment, userInfo, username}) => {
    const classes = new useStyle()
    const removeComment = async () => {
        await deleteComment(comment._id)
    }

    /*if(userInfo.name !== comment.username || userInfo.name !== username) {
        document.querySelector('#delete').style.display= 'none'
    }*/
    return (userInfo.name !== comment.username && userInfo.name !== username )
    ? (
        <Box className={classes.component}>
            <Box className={classes.container}>
                <Typography className={classes.username}>{comment.username}</Typography>
                <Typography className={classes.date}>{new Date(comment.date).toLocaleString([], {timeStyle: 'short', dateStyle: 'medium'})}</Typography>
            </Box>
            <Typography className={classes.comment}>{comment.comments}</Typography>
        </Box>
    )
    : (
        <Box className={classes.component}>
            <Box className={classes.container}>
                <Typography className={classes.username}>{comment.username}</Typography>
                <Typography className={classes.date}>{new Date(comment.date).toLocaleString([], {timeStyle: 'short', dateStyle: 'medium'})}</Typography>
                <Delete className={classes.delete} id='delete' onClick={() => removeComment()} />
            </Box>
            <Typography className={classes.comment}>{comment.comments}</Typography>
        </Box>
    )
}

export default Comment