type Props = {
  title: string;
  content: string;
};
export default function RecordDetailItem({ title, content }: Props) {
  return (
    <div className='flex flex-col'>
      <div className='text-ourDarkGray text-sm'>{title}</div>
      <div className='font-semibold'>{content}</div>
    </div>
  );
}
