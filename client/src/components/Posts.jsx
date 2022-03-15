import {Grid} from '@material-ui/core'
import {Link, useLocation} from 'react-router-dom'
import { useState, useEffect } from 'react'
//components
import Post from './Post'
import { getAllPosts } from '../services/api'

const Posts = () => {

    const [posts, setPosts] = useState([])
    const { search } = useLocation()

    useEffect(() => {
        const fetchData = async () => {
            let data = await getAllPosts(search)
            console.log(data)
            setPosts(data)
        }
        fetchData() 
    }, [search])
    
    return (
        posts.map(post => (
        <Grid item lg={3} sm={4} xs={12}>
            <Link to={`/detail/${post._id}`} style={{color: 'inherit', textDecoration: 'none'}} >
                <Post post={post} />
            </Link>
        </Grid>
        ))
     
    )
}

export default Posts