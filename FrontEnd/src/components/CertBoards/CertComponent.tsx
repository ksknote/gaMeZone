import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import styled from 'styled-components';

import Pagination from '../FreeBoards/Pagination';

const userToken: string | null = localStorage.getItem('userToken');

interface postType {
  _id: string;
  title: string;
  author: { nickname: string };
  category: string;
  createdAt: string;
}

const CertComponent = () => {
  const nav = useNavigate();
  const [posts, setPosts] = useState<postType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
      // data가 오름차순으로 정렬되어 있어서 내림차순으로 변경
    axios.get(`${process.env.REACT_APP_API_URL}/api/posts/cert`).then((res) => {
      const data = res.data.reverse();
      // console.log(data);
      setPosts(data);
    });
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <NoticeSection>
      <div>
        <TopContainer>
          {userToken && <WriteButton
            onClick={() => {
              nav('/community/certified/write');
            }}
          >
            글쓰기
          </WriteButton>}
        </TopContainer>
        <PostContainer>
          {currentPosts.map((post: postType, index: number) => (
            <PostItem
              key={post._id}
              onClick={() => nav(`/community/certified/${post._id}`)}
            >
              <PostItemHeader>
                <PostItemNumber>{posts.length - index}</PostItemNumber>
                <PostItemTitle>{post.title}</PostItemTitle>
                <PostItemInfo>
                  <PostDate>
                    {moment(post.createdAt).format('YYYY-MM-DD')}
                  </PostDate>
                  <PostUser>{post.author.nickname}</PostUser>
                </PostItemInfo>
              </PostItemHeader>
            </PostItem>
          ))}
        </PostContainer>
      </div>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        currentPage={currentPage}
        paginate={paginate}
      ></Pagination>
    </NoticeSection>
  );
};

export default CertComponent;

const NoticeSection = styled.div`
  font-family: 'Noto Sans Korean,Malgun Gothic,sans-serif';
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  height: 53rem;
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: end;
`;

const WriteButton = styled.button`
  margin: 0 3rem;
  height: 3rem;
  background: #d9d9d9;
  box-shadow: inset -0.1rem -0.1rem 0.3rem 0rem #000000,
    inset 0.2rem 0.2rem 0.3rem 0rem #ffffffcc;
  cursor: pointer;

  &:active {
    box-shadow: inset 4px 4px 4px rgba(0, 0, 0, 0.6);
  }
`;

const PostContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin: 3.5rem 1rem 1rem;
`;

const PostItem = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  border-bottom: 1px solid var(--background--gray);
  font-size: 1.7rem;
  cursor: pointer;
`;

const PostItemHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1rem auto;
`;

const PostItemInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const PostItemNumber = styled.p`
  margin: 0 10rem 0 0;
  width: 2rem;
`;

const PostItemTitle = styled.div`
  margin: 0 20rem 0 21rem;
  width: 35rem;
`;

const PostDate = styled.p`
  margin: 0 3rem;
`;

const PostUser = styled.p`
  margin: 0 0 0 1rem;
  width: 18rem;
`;
