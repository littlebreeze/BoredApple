'use client';
import { useState, useEffect } from 'react';
import instance from '@/utils/interceptor';

export default function Word() {
  const createNickname = async () => {
    try {
      const response = await instance.get(`/study-service/problem/voca`);
      console.log(response.data.data);
    } catch (error) {
      // error
    }
  };

  return (
    <div>
      <div>상태 바</div>
      <div>
        <div>어휘 퀴즈</div>
        <div>
          <span>1</span>
          <span>/3</span>
        </div>
      </div>
    </div>
  );
}
