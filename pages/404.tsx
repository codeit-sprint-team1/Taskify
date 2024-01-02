import Image from 'next/image';
import Link from 'next/link';
import TopImg from '../public/images/landing/taskify-top-img.png';

export default function Custom404Page() {
  return (
    <div className="flex-center w-screen h-screen">
      <div className="pb-90pxr mobile:pb-0pxr">
        <div className="flex-col-center gap-40pxr">
          <div className="tablet:w-540pxr mobile:w-287pxr">
            <Image src={TopImg} alt="TopImg" />
          </div>
          <div className="font-bold flex-center text-50pxr tablet:text-40pxr mobile:text-30pxr mobile:flex-col mobile:gap-0pxr">
            <div>페이지를 찾을 수 없어요</div>
          </div>
          <Link href="/">
            <button className="text-white rounded-lg bg-violet py-15pxr w-280pxr">
              <span className="text-lg font-medium ">홈으로 가기</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
