import Header from "../components/header";

export default function Home() {
  return (
    <div className='h-screen w-screen flex flex-col'>
    {/* 页眉 */}
    <div className='h-16 bg-blue-200 flex justify-center items-center shadow-2xl'>
      <div className='w-[1280px] bg-red-300 h-full'><Header/></div>
    </div>

    {/* 正文 */}
    <div className='flex-grow bg-gray-100 overflow-y-auto flex justify-center items-center'>
      <div className='w-[1280px] bg-blue-400 h-full'>home</div>
    </div>

    {/* 页脚 */}
    <div className='h-20 bg-gray-700 text-white flex items-center justify-center'>
    </div>
  </div>
  )
}
 