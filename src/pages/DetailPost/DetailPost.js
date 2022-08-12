import { useParams } from "react-router-dom";
import React from "react";
import useAuth from '../../components/hooks/useAuth'

// import { useSelector, useDispatch } from "react-redux";
// import { fetchPost } from "../../slices/postSlice";
// import Card from '../../components/Card/Card';
// import UserModel from "../../../../chap06/modules/auth/user";

function DetailPost() {
  // const dispatch = useDispatch();

  // const { postId } = useParams();
  // const status = useSelector((state) => state.post.status);
  // const post = useSelector((state) => state.post.post);

  // const isLoading = status === "idle" || status === "loading";
  // const isError = status === "error";

  // React.useEffect(() => {
  //   dispatch(fetchPost(postId));
  // }, [postId]);

  // if (isLoading) return <div>Loading</div>;

  // if (isError) return <div>Error123</div>;

  // return (
    
  //     <Card
  //       title={post.title}
  //       description={post.description}
  //       imageUrl={post.imageUrl}
  //       note={post.createdName}
  //     />
  // );
  const {postId}=useParams();
  
  // const isAuthenticated= !!user;  //convert boolean
  const{isAuthenticated}=useAuth();
  return(
    <div>
      DetailPost {postId} 
      <br></br>
      
      {/* <p>{description}</p> */}
      {isAuthenticated ? <input type='text'/>:null}
    </div>
  )
}

export default DetailPost;