export default function RecordDetailItem({ title, content }: { title: string; content: string }) {
  return (
    <div className='flex flex-col gap-1'>
      <div className='text-ourDarkGray text-xs font-semibold'>{title}</div>
      <div className='font-semibold'>{content}</div>
    </div>
  );
}
