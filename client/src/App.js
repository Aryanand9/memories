import React,{useEffect, useState} from 'react'
import {Container,AppBar,Typography,Grow,Grid} from '@material-ui/core'
import memories from './Image/memories.png'
import Posts from './components/Posts/Posts'
import Form from './components/Form/Form'
import useStyles from './style'
import {useDispatch} from 'react-redux'
import {getPosts} from './actions/post'

const App = () => {
  const [currentId,setCurrentId] = useState(0)
  const dispatch = useDispatch()
  const classes = useStyles()
  
  useEffect(()=>{
    dispatch(getPosts())
  },[currentId,dispatch])

  return (
    <Container maxWidth={'lg'}>
      <AppBar className={classes.appBar} position='static' color='inherit'>
        <Typography variant='h2' align='center' className={classes.heading}> 
           Memories
        </Typography>
        <img height='60' className={classes.image} src={memories} alt='memories'/>
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justify-content='space-between' alignItems='stretch' spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId}/>
            </Grid>
            <Grid item xs={12} sm={4} style={{flexDirection: 'column-reverse'}}>
              <Form currentId={currentId} setCurrentId={setCurrentId}/>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  )
}

export default App
