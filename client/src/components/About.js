import { Box, Typography, makeStyles } from '@material-ui/core'
import { Instagram, LinkedIn, Twitter } from '@material-ui/icons'

const useStyle = makeStyles({
    socials: {
        marginTop: 50,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '&>*': {
            margin: '0 5px'
        }
    },
    component: {
        padding: '50px'
    },
    link: {
        color: 'inherit'
    }
})

const About = () => {

    const classes = useStyle()
    return (
        <Box className={classes.component}>
            <Typography className={classes.bio}>
            Hello! My name is Nitish Rai , And I'm from Varanasi India, currently pursuing B.Tech in specialisation ( Information Technology ) from HNB Garhwal University I have a diverse set of skills ragging from HTML JavaScript python and some data science facts. With every line of code I strive to make the web beautiful place.</Typography>
        <Box className={classes.socials}>
            <a className={classes.link} href='https://www.instagram.com/nitishrai_10/' target='_blank'><Instagram /></a>
            <a className={classes.link} href='https://www.linkedin.com/in/nitish-rai-01601b168/' target='_blank'><LinkedIn /></a>
            <a className={classes.link} href='https://twitter.com/nitishRai01' target='_blank'><Twitter /></a>
        </Box>
        </Box>
    )
}

export default About