import headerLogo from '../public/images/landing/header-logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import emailIcon from '../public/icons/landing/email-icon.svg';
import facebookIcon from '../public/icons/landing/facebook-icon.svg';
import instagramIcon from '../public/icons/landing/instagram-icon.svg';
import topImg from '../public/images/landing/taskify-top-img.png';
import point1Img from '../public/images/landing/point1-img.png';
import point2Img from '../public/images/landing/point2-img.png';
import card1Img from '../public/images/landing/card1-img.png';
import card2Img from '../public/images/landing/card2-img.png';
import card3Img from '../public/images/landing/card3-img.png';

function Header() {
  return (
    <div className="flex justify-between px-8 py-4">
      <div className="flex-center">
        <Image src={headerLogo} alt="headerLogo" />
        <div>Taskify</div>
      </div>
      <div className="flex-center gap-9">
        <Link href="/login">로그인</Link>
        <Link href="/signup">회원가입</Link>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="flex justify-around	py-10">
      <div>@codeit - 2023 </div>
      <div className="flex-center gap-8">
        <div>Privacy Policy</div>
        <div>FAQ</div>
      </div>
      <div className="flex-center gap-3.5">
        <Image src={emailIcon} alt="emailIcon" />
        <Image src={facebookIcon} alt="facebookIcon" />
        <Image src={instagramIcon} alt="instagramIcon" />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <div className="py-24 flex-col-center gap-24">
        <div className="pb-[5.5rem]">
          <div className="flex-col-center gap-12">
            <Image src={topImg} alt="topImg" />
            <div className="text-[4.75rem] font-bold">
              새로운 일정 관리 <span className="text-violet">Taskify</span>
            </div>
            <button className="bg-violet py-4 w-[17.5rem] rounded-lg text-white">
              <span className="text-lg font-medium	">로그인하기</span>
            </button>
          </div>
        </div>
        <div className="flex bg-gray30 pt-24 pl-[3.75rem] w-[75rem] justify-between rounded-lg">
          <div className="flex flex-col gap-24">
            <span className="text-[1.375rem] font-medium text-gray60">
              Point 1
            </span>
            <span className="text-5xl font-bold">
              일의 우선순위를
              <br /> 관리하세요
            </span>
          </div>
          <div className="w-[37.125rem]">
            <Image src={point1Img} alt="point1Img" />
          </div>
        </div>
        <div className="flex bg-gray30 pt-24 pl-28 w-[75rem] gap-[6.25rem] rounded-lg">
          <div className="w-[27.25rem]">
            <Image src={point2Img} alt="point1Img" />
          </div>
          <div className="flex flex-col gap-24">
            <span className="text-[1.375rem] font-medium text-gray60">
              Point 2
            </span>
            <span className="text-5xl font-bold">
              해야 할 일을
              <br /> 등록하세요
            </span>
          </div>
        </div>
        <div className="pb-16 flex flex-col gap-9">
          <span className="text-[1.75rem] font-bold">
            생산성을 높이는 다양한 설정 ⚡
          </span>
          <div className="flex-center gap-8">
            <div>
              <div className="bg-gray60 flex-center w-[23.625rem] py-16 rounded-t-lg">
                <Image src={card1Img} alt="card1Img" />
              </div>
              <div className="bg-gray30 pl-8 py-8 rounded-b-lg">
                <div className="flex flex-col">
                  <span className="text-lg font-bold">대시보드 설정</span>
                  <span className="font-medium">
                    대시보드 사진과 이름을 변경할 수 있어요.
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-gray60 flex-center w-[23.625rem] py-[2.6rem] rounded-t-lg">
                <Image src={card2Img} alt="card2Img" />
              </div>
              <div className="bg-gray30 pl-8 py-8 rounded-b-lg">
                <div className="flex flex-col">
                  <span className="text-lg font-bold">초대</span>
                  <span className="font-medium">
                    새로운 팀원을 초대할 수 있어요.
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-gray60 flex-center w-[23.625rem] py-[1.5rem] rounded-t-lg">
                <Image src={card3Img} alt="card3Img" />
              </div>
              <div className="bg-gray30 pl-8 py-8 rounded-b-lg">
                <div className="flex flex-col">
                  <span className="text-lg font-bold">구성원</span>
                  <span className="font-medium">
                    대시보드 사진과 이름을 변경할 수 있어요.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
