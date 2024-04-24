import { React, useEffect } from 'react'
import './Posts.css'
// import { PostData } from '../../Data/PostData'
import {useDispatch, useSelector} from "react-redux"
import Post from '../post/Post'
import { getTimelinePosts } from '../../Actions/postAction'
import { useParams } from 'react-router-dom';
const Posts = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  let { posts, loading } = useSelector((state) => state.postReducer);
  // console.log("posfrwe",posts);
  const params = useParams()
  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
  }, [user._id]);
  
// console.log("paraaa,",params.id);
if(!posts) return "no posts"
if (params.id) 
    posts = posts.filter((post) => post.userId === params.id);
  
  
  return (
    <div className='Posts'>
      
        {loading ? "fetching posts..." :
        posts.map((post, id) => {
            // console.log("post",post);
            return <Post data={post} id={id} />
          })
        }
      
    </div>
  )
}

export default Posts
