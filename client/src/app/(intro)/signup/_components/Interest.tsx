'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import checked from '@/../public/signup/checked.svg';
import unchecked from '@/../public/signup/unchecked.svg';
import instance from '@/utils/interceptor';

export default function Interest() {
  const router = useRouter();
  const [valid, setValid] = useState(false);

  type SelectedFields = {
    humanities: boolean;
    social: boolean;
    science: boolean;
    technology: boolean;
    art: boolean;
  };

  const [selectedFields, setSelectedFields] = useState<SelectedFields>({
    humanities: false,
    social: false,
    science: false,
    technology: false,
    art: false,
  });

  const handleFieldClick = (field: keyof SelectedFields) => {
    setSelectedFields((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));

    setValid((prevState) => {
      const selectedCount = Object.values({
        ...selectedFields,
        [field]: !selectedFields[field],
      }).filter((value) => value).length;

      return selectedCount === 2;
    });
  };

  const handleNextClick = () => {
    if (valid) {
      const selectedFieldsArray = Object.entries(selectedFields)
        .filter(([key, value]) => value)
        .map(([key, value]) => {
          switch (key) {
            case 'humanities':
              return 1;
            case 'social':
              return 2;
            case 'science':
              return 3;
            case 'technology':
              return 4;
            case 'art':
              return 5;
            default:
              return null;
          }
        })
        .filter((value) => value !== null);

      const data = selectedFieldsArray; // [1, 2]
      createInterest(data);
    }
  };

  const createInterest = async (data: any) => {
    try {
      await instance.post(`/user-service/category`, {
        category1: data[0],
        category2: data[1],
      });
      router.push('/signup/learning-time');
    } catch (error) {
      // error
    }
  };

  return (
    <>
      <div className='flex flex-col gap-2 overflow-y-scroll h-72'>
        {/* 인문 */}
        <div
          className={`flex flex-col p-4 rounded-lg cursor-pointer w-80 ${
            selectedFields.humanities ? 'bg-black' : 'bg-white'
          }`}
          onClick={() => handleFieldClick('humanities')}
        >
          <span className='p-1 px-2 mb-3 text-xs text-center rounded-lg bg-ourBlue w-fit'>인문</span>
          <div className='flex items-center gap-2'>
            <div className='w-4'>
              <Image src={selectedFields.humanities ? checked : unchecked} alt='체크' />
            </div>
            <div className={`text-sm ${selectedFields.humanities ? 'text-white' : 'text-ourBlack'}`}>
              노자와 장자가 즐겨 들었던 음악은?
            </div>
          </div>
        </div>
        {/* 사회 */}
        <div
          className={`flex flex-col p-4 rounded-lg cursor-pointer w-80 ${
            selectedFields.social ? 'bg-black' : 'bg-white'
          }`}
          onClick={() => handleFieldClick('social')}
        >
          <span className='p-1 px-2 mb-3 text-xs text-center rounded-lg bg-ourPurple w-fit'>사회</span>
          <div className='flex items-center gap-2'>
            <div className='w-4'>
              <Image src={selectedFields.social ? checked : unchecked} alt='체크' />
            </div>
            <div className={`text-sm ${selectedFields.social ? 'text-white' : 'text-ourBlack'}`}>
              19세기 중국이 경제적 성장을 이룩한 방법
            </div>
          </div>
        </div>
        {/* 과학 */}
        <div
          className={`flex flex-col p-4 rounded-lg cursor-pointer w-80 ${
            selectedFields.science ? 'bg-black' : 'bg-white'
          }`}
          onClick={() => handleFieldClick('science')}
        >
          <span className='p-1 px-2 mb-3 text-xs text-center rounded-lg bg-ourGreen w-fit '>과학</span>
          <div className='flex items-center gap-2'>
            <div className='w-4'>
              <Image src={selectedFields.science ? checked : unchecked} alt='체크' />
            </div>
            <div className={`text-sm ${selectedFields.science ? 'text-white' : 'text-ourBlack'}`}>
              사람은 어떻게 소리를 들을 수 있을까?
            </div>
          </div>
        </div>
        {/* 기술 */}
        <div
          className={`flex flex-col p-4 rounded-lg cursor-pointer w-80 ${
            selectedFields.technology ? 'bg-black' : 'bg-white'
          }`}
          onClick={() => handleFieldClick('technology')}
        >
          <span className='p-1 px-2 mb-3 text-xs text-center rounded-lg bg-ourYellow w-fit'>기술</span>
          <div className='flex items-center gap-2'>
            <div className='w-4'>
              <Image src={selectedFields.technology ? checked : unchecked} alt='체크' />
            </div>
            <div className={`text-sm ${selectedFields.technology ? 'text-white' : 'text-ourBlack'}`}>
              3D 애니메이션을 만드는 방법
            </div>
          </div>
        </div>
        {/* 예술 */}
        <div
          className={`flex flex-col p-4 rounded-lg cursor-pointer w-80 ${selectedFields.art ? 'bg-black' : 'bg-white'}`}
          onClick={() => handleFieldClick('art')}
        >
          <span className='p-1 px-2 mb-3 text-xs text-center rounded-lg bg-ourPink w-fit'>예술</span>
          <div className='flex items-center gap-2'>
            <div className='w-4'>
              <Image src={selectedFields.art ? checked : unchecked} alt='체크' />
            </div>
            <div className={`text-sm ${selectedFields.art ? 'text-white' : 'text-ourBlack'}`}>
              인공지능이 만든 예술은 예술인가?
            </div>
          </div>
        </div>
      </div>
      {/* 다음 버튼 */}
      <button
        className={`absolute bottom-2 mb-4 w-96 h-12 rounded-lg text-lg  ${
          valid ? 'bg-ourBlue duration-[0.2s] hover:bg-ourTheme/80' : 'bg-gray-300 cursor-not-allowed'
        } text-white`}
        onClick={handleNextClick}
        disabled={!valid}
      >
        다음
      </button>
    </>
  );
}
