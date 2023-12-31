import * as api from "../api";

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPost();
    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = (post) => async(dispatch)=>{
  console.log('');
    try{
      console.log("Cant Create Post");
        const {data} = await api.createPost(post)
        console.log('Dispatch Error')
        dispatch({type:'CREATE', payload:data})
        console.log("SUCESSFULLY ADDED");
    }catch(error){
        console.log(error.message)
    }
}
export const updatePost = (id,post) => async(dispatch)=>{
  try{
    const {data} = await api.updatePost(id,post)
    dispatch({type:'UPDATE', payload:data})
  }catch(err){
    console.log(err.message)
  }
}
export const deletePost = id => async(dispatch)=>{
   try{
    await api.deletePost(id)
    
    dispatch({type:'DELETE', payload:id});
   }catch(err){
    console.log(err);
   }
}
export const likePost=(id)=>async(dispatch)=>{
  try{
    const {data} = await api.likePost(id) 
    dispatch({type:'LIKE',payload:data})
  }catch(err){
    console.log(err.message);
  }
}