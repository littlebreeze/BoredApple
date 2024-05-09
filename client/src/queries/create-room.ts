import { IRoom } from '@/types/Room';
import instance from '@/utils/interceptor';
import { useMutation } from '@tanstack/react-query';

const createRoom = async (newRoom: IRoom) => {
  try {
    const res = await instance.post(`${process.env.NEXT_PUBLIC_API_SERVER}/game-service/rooms`, newRoom);
    return res.data.data;
  } catch (e) {
    return null;
  }
};

export const useCreateRoom = () => {
  const { data, isSuccess, isError } = useMutation({ mutationFn: createRoom });

  return { data, isSuccess, isError };
};
