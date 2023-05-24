import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as Search } from '../../../style/icons/icons8-google.svg';
import axios from 'axios';
import { Score } from './scoreInterface';
interface Props {
  onValue: (value: Score) => void;
  URL: string;
}

const SearchUser: React.FC<Props> = ({ onValue, URL }) => {
  //유저 닉네임을 검색하여 게임 기록 조회

  //input 처리
  const [input, setInput] = useState<string>('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  //검색 API
  const handleClick = () => {
    axios
      .get(`${URL}/search/${input}`)
      .then((res) => onValue(res.data))
      .catch((err) => console.log(err));
  };
  return (
    <Content>
      <SearchInput
        onChange={handleChange}
        onKeyPress={(e) => {
          if (e.key === 'Enter') handleClick();
        }}
        value={input}
        placeholder="조회할 유저의 닉네임을 입력해주세요."
      ></SearchInput>
      <Button onClick={handleClick}>
        <Search />
      </Button>
    </Content>
  );
};

export default SearchUser;

const Content = styled.div`
  display: flex;
`;
const SearchInput = styled.input`
  width: 60rem;
  height: 5rem;
  padding: 1rem 2rem;
  margin-right: 1rem;
  border-radius: 15px;
  background-color: rgb(233, 233, 233);
  border: 0;
  border-radius: 10px;
  outline: none;
  color: #242424;
  font-size: 2rem;
`;
const Button = styled.div`
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:active {
    transform: scale(1.1);
  }
`;
