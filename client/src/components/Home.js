import Banner from "./Banner"
import Categories from "./Categories"
import Posts from './Posts'
import {Grid} from '@material-ui/core'

const Home = () => {
    return (
        <>
            <Banner />
            <Grid container>
                <Grid item lg={2} xm={12} sm={2} >
                    <Categories />
                </Grid>
                <Grid item container lg={10} xm={12} sm={10}>
                    <Posts />
                </Grid>
            </Grid>
        </>
    )
}
export default Home