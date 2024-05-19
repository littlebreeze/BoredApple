export default function RefreshRoomsBtn({ isFetching }: { isFetching: boolean }) {
  return (
    <>
      <div
        className={`rounded-md cursor-pointer w-full h-11 flex justify-center items-center border-2 gap-1 border-white hover:border-ourGreen duration-100
      ${isFetching ? 'bg-ourGreen/30' : 'bg-white/80'}`}
      >
        <svg width='20' height='20' viewBox='0 0 258 258' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M220.083 37.8938C208.141 25.8782 193.937 16.3437 178.291 9.83998C162.645 3.33628 145.865 -0.00797148 128.919 1.42681e-05C57.6022 1.42681e-05 0 57.7275 0 129C0 200.273 57.6022 258 128.919 258C189.103 258 239.283 216.881 253.644 161.25H220.083C213.436 180.108 201.097 196.441 184.768 207.994C168.44 219.547 148.926 225.751 128.919 225.75C75.5122 225.75 32.1088 182.374 32.1088 129C32.1088 75.6263 75.5122 32.25 128.919 32.25C155.704 32.25 179.583 43.3763 197.009 60.9525L145.054 112.875H258V1.42681e-05L220.083 37.8938Z'
            fill='#51D0A2'
          />
        </svg>
        <div className='text-sm md:text-lg lg:text-lg '>새로고침</div>
      </div>
    </>
  );
}
