import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
// import { Pagination } from 'react-bootstrap';
// import Pagination from './components/Pagination/Pagination'
import Pagination from '../../components/Pagination/Pagination'
import Card from '../../components/Card/Card'

import axios from '../../api/request'
import { Link, useLocation, useSearchParams } from 'react-router-dom';

const MAX_ITEMS_PER_PAGE = 4

function ListPost() {
  const [postData, setPostData] = React.useState({
    status: 'idle',
    data: {
      posts: [],
      total: 0
    }
  });

  const location = useLocation();
  const [URLSearchParams, setUrlSearchParams] = useSearchParams();
  const [activePage, setActivePage] = React.useState(() => {
    // const urlParams = new URLSearchParams(window.location.search);
    const activePage = URLSearchParams.get('activePage')
    return activePage ? +activePage : 1
  });

  console.log('UseLocation:', location)

  // console

  const fetchPosts = React.useCallback(async () => {
    try {
      setPostData((preState) => ({
        ...preState,
        status: 'loading',
      }));
      // http://localhost:8080/api/posts
      const res = await axios.get('/api/posts', {
      params: {
          offset: (activePage - 1) * MAX_ITEMS_PER_PAGE
        },
      });


      if (res.data.success) {
        setPostData({
          status: 'success',
          data: {
            posts: res.data.data.data,
            total: res.data.data.total
          }
        })
      } else {
        setPostData((preState) => ({
          ...preState,
          status: 'error',
        }));
      }
    } catch (error) {
      setPostData((preState) => ({
        ...preState,
        status: 'error',
      }));

    }
  }, [activePage])

  //useState chạy trc render chỉ chạy 1 lần,
  // useMemo chạy trc render nhưng chạy nhiều lần phụ thuộc vào dependency,
  //useEffect chạy sau render,chạy nhiều lần phụ thuộc dependency
  React.useEffect(() => {
    fetchPosts(activePage);
  }, [activePage])
  //  kiểu gần gần tnay
  // const maxPage=postData&&postData.data&&postData.total ? Math.ceil(postData?.data?.total/MAX_ITEMS_PER_PAGE):0;
  //optional chaining
  // const maxPage = postData?.data?.total ? Math.ceil(postData?.data?.total / MAX_ITEMS_PER_PAGE) : 0;
  //khi mà tổng post thay đổi thì tính lại ; lưu vào bộ nhớ, chỉ khi thay đổi số post mới uodate lại

  const maxPage = React.useMemo(() => {
    console.log('use memo', postData?.data?.total)
    return postData?.data?.total ? Math.ceil(postData?.data?.total / MAX_ITEMS_PER_PAGE) : 0
  }, [postData?.data?.total]);   //1:33:00 buổi 15 để hiểu

  // console.log('saudo', postData?.data?.total)

  //cái này để load lại trang hiện ra activePage =1 luôn dù để mỗi http://localhost:3000/
  React.useEffect(() => {
    window.history.pushState({ page: activePage }, "", `?activePage=${activePage}`)
  }, [activePage])//cứ activePage thay đổi thì chạy cái bên trên

  const handleChangePage = (newActivePage) => {
    setActivePage(newActivePage);
    // Load lại trang giữ được trang page ở trên đường dẫn Url
    // window.history.pushState({ page: newActivePage }, "title 1", `?activePage=${newActivePage}`)
  }

  console.log('render')

  const renderPosts = () => {
    const isLoading = postData.status === 'idle' || postData.status === 'loading';
    const isError = postData.status === 'error';
    if (isLoading) {
      return (
        <div>Loading...</div>
      )
    }
    if (isError) {
      return (
        <div>
          Something went wrong
        </div>
      )
    }
    return (
      <Row>
        {postData.data.posts.map(post => (

          <Col xs={12} md={3} key={post._id}>
            <Link to={`/posts/${post._id}`}>

              <Card
                title={post.title}
                description={post.description}
                imageUrl={post.imageUrl}
                note={post.note}  ///////
              ></Card>
            </Link>
          </Col>
        ))}
      </Row>
    )
  }

  return (
    <div className="App">
      <Container>
        <div className='App-content'>
          {renderPosts()}

        </div>
        <div className='App-pagination'>
          <Pagination activePage={activePage} maxPage={maxPage} handleChangePage={handleChangePage}></Pagination>
        </div>
      </Container>
    </div>
  );
}

export default ListPost;    
