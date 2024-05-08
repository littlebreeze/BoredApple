'use client';
import { LearningItemType } from './LearningBox';

// 1. 주제맞추기
// 2. 정독훈련
// 3. 어휘
// 4. 문장삽입
// 5. 순서맞추기
type LearningItemProps = {
  learningItem: LearningItemType;
};

export default function LearningItem(props: { learningItem: LearningItemType }) {
  const { type, solved, level } = props.learningItem;

  const renderTypeComponent = () => {
    switch (type) {
      case '주제맞추기':
        return <LearningItem1 level={level} solved={solved} />;
      case '정독훈련':
        return <LearningItem2 level={level} solved={solved} />;
      case '어휘':
        return <LearningItem3 level={level} solved={solved} />;
      case '문장삽입':
        return <LearningItem4 level={level} solved={solved} />;
      case '순서맞추기':
        return <LearningItem5 level={level} solved={solved} />;
      default:
        return <DefaultItem />;
    }
  };

  return <div className='flex-1 bg-blue-400 h-full rounded-2xl'>{renderTypeComponent()}</div>;
}

// 주제맞추기 컴포넌트
const LearningItem1 = ({ level, solved }: { level: number; solved: boolean }) => {
  return (
    <div>
      <p>주제맞추기</p>
      <p>Level: {level}</p>
      <p>Solved: {solved ? 'Yes' : 'No'}</p>
    </div>
  );
};

// 정독훈련 컴포넌트
const LearningItem2 = ({ level, solved }: { level: number; solved: boolean }) => {
  return (
    <div>
      <p>정독훈련</p>
      <p>Level: {level}</p>
      <p>Solved: {solved ? 'Yes' : 'No'}</p>
    </div>
  );
};

// 어휘 컴포넌트
const LearningItem3 = ({ level, solved }: { level: number; solved: boolean }) => {
  return (
    <div>
      <p>어휘</p>
      <p>Level: {level}</p>
      <p>Solved: {solved ? 'Yes' : 'No'}</p>
    </div>
  );
};
// 문장삽입 컴포넌트
const LearningItem4 = ({ level, solved }: { level: number; solved: boolean }) => {
  return (
    <div>
      <p>정독훈련</p>
      <p>Level: {level}</p>
      <p>Solved: {solved ? 'Yes' : 'No'}</p>
    </div>
  );
};

// 순서맞추기 컴포넌트
const LearningItem5 = ({ level, solved }: { level: number; solved: boolean }) => {
  return (
    <div>
      <p>정독훈련</p>
      <p>Level: {level}</p>
      <p>Solved: {solved ? 'Yes' : 'No'}</p>
    </div>
  );
};

const DefaultItem = () => {
  return <div>준비중입니다.</div>;
};
