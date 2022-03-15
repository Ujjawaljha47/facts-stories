import { Button, makeStyles, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core'
import { categories } from '../constants/data'
import { Link } from 'react-router-dom'


const useStyle = makeStyles({
    create: {
        backgroundColor: '#6495ed',
        margin: 20,
        color: '#fff'
    },
    table: {
        border: '1px solid rgb(224, 224, 224, 1)'
    },
    heading: {
        fontSize: 18
    },
    cell: {
        color: '#878787'
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    }
})

const Categories = () => {
    const classes = useStyle()
    
    return (
        <>
            <Link to='/create' className={classes.link}><Button variant="contained" className={classes.create}>Create Blog</Button></Link>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.heading}>
                            <Link to='/' className={classes.link}>All Categories</Link>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                        {categories.map(category => (
                            <TableRow>
                                <TableCell className={classes.cell}>
                                    <Link to={`/?category=${category}`} className={classes.link}>{category}</Link>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </>
    )
}

export default Categories