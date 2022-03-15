import {Box, makeStyles, Typography} from '@material-ui/core'

const useStyle = makeStyles({
    image: {
        background: `url('https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg') center/55% repeat-x #000`,
        width: '100%',
        height: '50vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        '& :first-child': {
            fontSize: 66,
            color: '#fff',
            lineHeight: 1
        },
        '& :last-child': {
            fontSize: 20,
            background: '#fff'
        }

    }
})

const Banner = () => {
    const classes = useStyle()
    return(
        <Box className={classes.image}>
            <Typography>BLOG</Typography>
            <Typography>Stories and Facts</Typography>
        </Box>
    )
}

export default Banner