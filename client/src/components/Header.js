import { AppBar, Toolbar, makeStyles, Typography } from '@material-ui/core'; 
import { Link } from 'react-router-dom';

const useStyle = makeStyles({
    component: {
        background: '#FFFFFF',
        color: 'black'
    },
    container: {
        justifyContent: 'center',
        '& >*': {
            padding: 20,
            color: 'black',
            cursor: 'pointer'
        }
    },
    link: {
        textDecoration: 'none',
        color: '#111'
    }

})

const Header = ({setUserInfo}) => {
    const classes = useStyle();
    
    const accountHandle = () => {
        setUserInfo(null)
    }

    return (
        <AppBar className={classes.component}>
            <Toolbar className={classes.container}>
                <Typography><Link to='/' className={classes.link}>HOME</Link></Typography>
                <Typography><Link to='/about' className={classes.link}>ABOUT</Link></Typography>
                <Typography><Link to='/contact' className={classes.link}>CONTACT</Link></Typography>
                <Typography onClick={() => accountHandle()}>LOGOUT</Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header;