'use client';
import { useRouter } from 'next/navigation';
import { useState, ChangeEvent } from 'react';
import instance from '@/utils/interceptor';

export default function Nickname() {
  const router = useRouter();
  const [valid, setValid] = useState(false);
  const [nickname, setNickname] = useState('');
  const [specialCharacter, setSpecialCharacter] = useState(false);

  const createNickname = async () => {
    // console.log(process.env.NEXT_PUBLIC_API_SERVER);
    try {
      await instance.post(`/user-service/nickname`, {
        nickname: nickname,
      });
    } catch (error) {
      // error
    }
  };

  const handleClick = () => {
    if (valid) {
      createNickname();
      router.push('/signup/interest');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const isValidInput = /^[a-zA-Z0-9가-힣]{2,6}$/.test(inputValue);
    const hasSpecialCharacters = /[!@#$%^&*(),.?":{}|<>]/.test(inputValue);

    setNickname(inputValue);
    setValid(isValidInput);
    setSpecialCharacter(hasSpecialCharacters);
  };

  return (
    <>
      <input
        className='p-3 rounded-lg w-80'
        type='text'
        placeholder='닉네임을 입력해 주세요.'
        value={nickname}
        onChange={handleChange}
      />
      <div
        className={`py-1 pl-1 text-xs w-80 ${
          valid ? 'text-ourBlue' : specialCharacter ? 'text-red-500' : 'text-ourDarkGray'
        }`}
      >
        {valid && !specialCharacter && '사용할 수 있는 닉네임입니다.'}
        {!valid && specialCharacter && '특수문자는 사용할 수 없습니다.'}
        {!valid && !specialCharacter && '특수문자를 제외하고 2~6글자 이하로 지어주세요.'}
      </div>
      <button
        className={`absolute bottom-2 mb-4 w-96 h-12 rounded-lg text-lg  ${
          valid ? 'bg-ourBlue duration-[0.2s] hover:bg-ourTheme/80' : 'bg-gray-300 cursor-not-allowed'
        } text-white`}
        onClick={handleClick}
        disabled={!valid}
      >
        다음
      </button>
    </>
  );
}
