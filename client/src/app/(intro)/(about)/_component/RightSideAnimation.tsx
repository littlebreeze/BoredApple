'use client';
import { Children, useEffect, useRef, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

export default function RightSideAnimation({ children }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // entries : 현재 감시 중인 모든 요소가 출력됨
        entries.forEach(({ target, isIntersecting }) => {
          if (target === ref.current) {
            // visible을 isIntersecting(boolean)의 값으로 바꿔줘라
            // isIntersecting : target과 root가 교차된 상태인지(true) 아닌지(false)를 boolean값으로 반환한다.
            setVisible(isIntersecting);
            // 한번켜지고 나면 사라지지 않게 관찰자 끊기
            if (isIntersecting) observer.disconnect();
          }
        });
      },
      {
        threshold: 0.5,
      }
    );
    // ref.current가 참이면(visible이 true)
    if (ref.current) {
      // 해당 타겟 ref를 Observer가 관찰할 수 있도록 넣어준다
      // .observe() : 타겟요소가 화면에 보이는지 관찰하는 역할
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    // <div className=''>
    <div
      className={`flex flex-col gap-5 md:flex-row lg:flex-row justify-center transition-all ease-in-out duration-700 ",
    ${visible ? 'opacity-100' : 'opacity-0 pl-14'}`}
      ref={ref}
    >
      {children}
    </div>
    // </div>
  );
}
