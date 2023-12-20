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
    <div className="flex justify-between p-26pxr">
      <div className="flex-center">
        <Image src={headerLogo} alt="headerLogo" />
        <div>Taskify</div>
      </div>
      <div className="flex-center gap-36pxr pr-54pxr tablet:pr-14pxr">
        <Link href="/login">로그인</Link>
        <Link href="/signup">회원가입</Link>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="flex justify-around py-40pxr">
      <div>@codeit - 2023 </div>
      <div className="flex-center gap-32pxr">
        <div>Privacy Policy</div>
        <div>FAQ</div>
      </div>
      <div className="flex-center gap-14pxr">
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
      <div className="py-90pxr flex-col-center gap-90pxr">
        <div className="pb-90pxr">
          <div className="flex-col-center gap-48pxr">
            <div className="tablet:w-540pxr">
              <Image src={topImg} alt="topImg" />
            </div>
            <div className="font-bold text-76pxr tablet:text-56pxr">
              새로운 일정 관리 <span className="text-violet">Taskify</span>
            </div>
            <button className="text-white rounded-lg bg-violet py-15pxr w-280pxr">
              <span className="text-lg font-medium ">로그인하기</span>
            </button>
          </div>
        </div>
        <div className="flex justify-between rounded-lg bg-violet8 pt-100pxr pl-60pxr w-1200pxr h-600pxr tablet:w-664pxr tablet:h-972pxr tablet:flex-col tablet:pt-60pxr">
          <div className="flex flex-col gap-100pxr ">
            <span className="font-medium text-22pxr text-gray60">Point 1</span>
            <span className="font-bold text-48pxr">
              일의 우선순위를
              <br /> 관리하세요
            </span>
          </div>
          <div className="w-auto tablet:w-520pxr tablet:flex tablet:ml-auto">
            <Image src={point1Img} alt="point1Img" />
          </div>
        </div>
        <div className="flex rounded-lg bg-violet8 pt-100pxr pl-108pxr gap-100pxr w-1200pxr h-600pxr tablet:flex-col tablet:w-664pxr tablet:h-972pxr tablet:pt-60pxr tablet:pl-0pxr tablet:justify-between">
          <div className="desktop:w-auto tablet:w-360pxr tablet:order-2 tablet:mx-auto">
            <Image src={point2Img} alt="point1Img" />
          </div>
          <div className="flex flex-col gap-100pxr tablet:order-1 tablet:pl-60pxr">
            <span className="font-medium text-22pxr text-gray60">Point 2</span>
            <span className="font-bold text-48pxr">
              해야 할 일을
              <br /> 등록하세요
            </span>
          </div>
        </div>
        <div className="flex flex-col pb-70pxr gap-36pxr">
          <span className="font-bold text-28pxr">
            생산성을 높이는 다양한 설정 ⚡
          </span>
          <div className="gap-33pxr flex-center tablet:flex-col-center">
            <div>
              <div className="rounded-t-lg bg-gray70 flex-center w-380pxr h-260pxr">
                <Image src={card1Img} alt="card1Img" />
              </div>
              <div className="rounded-b-lg bg-violet8 w-380pxr py-33pxr pl-32pxr">
                <div className="flex flex-col gap-18pxr">
                  <span className="font-bold text-18pxr">대시보드 설정</span>
                  <span className="font-medium">
                    대시보드 사진과 이름을 변경할 수 있어요.
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div className="rounded-t-lg bg-gray70 flex-center w-380pxr h-260pxr">
                <Image src={card2Img} alt="card2Img" />
              </div>
              <div className="rounded-b-lg bg-violet8 w-380pxr py-33pxr pl-32pxr">
                <div className="flex flex-col gap-18pxr">
                  <span className="font-bold text-18pxr">초대</span>
                  <span className="font-medium">
                    새로운 팀원을 초대할 수 있어요.
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div className="rounded-t-lg bg-gray70 flex-center w-380pxr h-260pxr">
                <Image src={card3Img} alt="card3Img" />
              </div>
              <div className="rounded-b-lg bg-violet8 w-380pxr py-33pxr pl-32pxr">
                <div className="flex flex-col gap-18pxr">
                  <span className="font-bold text-18pxr">구성원</span>
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
