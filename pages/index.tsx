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
      <div className="bg-red">
        <div>
          <Image src={topImg} alt="topImg" />
          <div className="text-[4.75rem] font-bold">
            새로운 일정 관리 <span className="text-violet">Taskify</span>
          </div>
          <button className="bg-violet py-4 w-[17.5rem]">로그인하기</button>
        </div>
      </div>
      <div className="flex-center bg-pink">
        <div>
          <div>Point 1</div>
          <div>일의 우선순위를 관리하세요</div>
        </div>
        <Image src={point1Img} alt="point1Img" />
      </div>
      <div className="flex-center bg-orange">
        <Image src={point2Img} alt="point1Img" />
        <div>
          <div>Point 2</div>
          <div>해야 할 일을 등록하세요</div>
        </div>
      </div>
      <div className="bg-blue">
        생산성을 높이는 다양한 설정 ⚡
        <div className="flex-center gap-8">
          <div>
            <div className="bg-gray60">
              <Image src={card1Img} alt="card1Img" />
            </div>
            <div className="bg-gray10">
              <div>대시보드 설정</div>
              <div>대시보드 사진과 이름을 변경할 수 있어요.</div>
            </div>
          </div>
          <div>
            <div className="bg-gray60">
              <Image src={card1Img} alt="card1Img" />
            </div>
            <div className="bg-gray10">
              <div>초대</div>
              <div>새로운 팀원을 초대할 수 있어요.</div>
            </div>
          </div>
          <div>
            <div className="bg-gray60">
              <Image src={card1Img} alt="card1Img" />
            </div>
            <div className="bg-gray10">
              <div>구성원</div>
              <div>구성원을 초대하고 내보낼 수 있어요.</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
