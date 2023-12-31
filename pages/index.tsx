import headerLogo from '../public/images/landing/header-logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import topImg from '../public/images/landing/taskify-top-img.png';
import point1Img from '../public/images/landing/point1-img.png';
import point2Img from '../public/images/landing/point2-img.png';
import card1Img from '../public/images/landing/card1-img.png';
import card2Img from '../public/images/landing/card2-img.png';
import card3Img from '../public/images/landing/card3-img.png';
import kakaoIcon from '../public/icons/kakaotalk.svg';
import gitHubIcon from '../public/icons/github.svg';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { StaticImageData } from 'next/image';
import getLocalItem from '@/utils/getLocalItem';
import { motion, useAnimation, AnimationControls } from 'framer-motion';

function Header() {
  return (
    <div className="flex justify-between p-26pxr">
      <Link href="/">
        <div className="flex-center">
          <Image src={headerLogo} alt="headerLogo" />
          <div>Taskify</div>
        </div>
      </Link>
      <div className="flex-center gap-36pxr pr-54pxr tablet:pr-14pxr mobile:pr-0pxr">
        <Link href="/login">로그인</Link>
        <Link href="/signup">회원가입</Link>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="flex justify-around py-40pxr mobile:flex-col-center mobile:gap-12pxr">
      <div>@codeit - 2023 </div>
      <div className="flex-center gap-32pxr">
        <Link
          href={
            'https://docs.google.com/forms/d/e/1FAIpQLSfoQiedOsvCHaXgI2N3o0bB0kkRhENg7sLmRquCT7X9y6oOHA/viewform'
          }
          rel="noopener noreferrer"
          target="_blank"
        >
          의견 보내기
        </Link>
      </div>
      <div className="flex-center gap-14pxr mobile:mt-56pxr">
        <Link
          href={'https://github.com/codeit-sprint-team1/Taskify'}
          rel="noopener noreferrer"
          target="_blank"
        >
          <Image src={gitHubIcon} alt="gitHubIcon" />
        </Link>
        <Link
          href={'https://open.kakao.com/o/gWEvRt1f'}
          rel="noopener noreferrer"
          target="_blank"
        >
          <Image src={kakaoIcon} alt="kakaoIcon" />
        </Link>
      </div>
    </div>
  );
}

function Card({
  image,
  title,
  description,
}: {
  image: StaticImageData;
  title: string;
  description: string;
}) {
  return (
    <div>
      <div className="rounded-t-lg bg-gray70 flex-center w-380pxr h-260pxr mobile:w-343pxr mobile:h-235pxr">
        <Image src={image} alt="card1Img" />
      </div>
      <div className="rounded-b-lg bg-violet8 w-380pxr py-33pxr pl-32pxr mobile:w-343pxr">
        <div className="flex flex-col gap-18pxr">
          <span className="font-bold text-18pxr">{title}</span>
          <span className="font-medium">{description}</span>
        </div>
      </div>
    </div>
  );
}

function Top() {
  return (
    <motion.div
      className="pb-90pxr mobile:pb-0pxr"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1,
        ease: [0, 0.3, 0.6, 1],
      }}
    >
      <div className="flex-col-center gap-48pxr">
        <div className="tablet:w-540pxr mobile:w-287pxr">
          <Image src={topImg} alt="topImg" />
        </div>
        <div className="font-bold flex-center gap-24pxr text-76pxr tablet:text-56pxr mobile:text-40pxr mobile:flex-col mobile:gap-0pxr">
          <div>새로운 일정 관리</div>
          <div className="text-violet">Taskify</div>
        </div>
        <Link href="/login">
          <button className="text-white rounded-lg bg-violet py-15pxr w-280pxr">
            <span className="text-lg font-medium ">로그인하기</span>
          </button>
        </Link>
      </div>
    </motion.div>
  );
}

interface IntersectionAnimationProps {
  children: React.ReactNode;
  delay?: number;
}

const IntersectionAnimation: React.FC<IntersectionAnimationProps> = ({
  children,
  delay = 0,
}) => {
  const controls = useAnimation();
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          controls.start('visible');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(
      (entries, observer) => handleScroll(entries, observer),
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [controls]);

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      ref={elementRef}
      initial="hidden"
      animate={controls as AnimationControls}
      variants={variants}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  );
};

function Middle() {
  return (
    <>
      <IntersectionAnimation>
        <div className="lending-middle-card desktop:flex-row pl-60pxr mobile:pl-0pxr">
          <div className="flex flex-col gap-100pxr mobile:items-center mobile:gap-60pxr">
            <span className="font-medium text-22pxr text-gray60">Point 1</span>
            <span className="font-bold text-48pxr mobile:text-36pxr mobile:text-center">
              일의 우선순위를
              <br /> 관리하세요
            </span>
          </div>
          <div className="tablet:w-520pxr tablet:flex tablet:ml-auto mobile:pl-47pxr">
            <Image src={point1Img} alt="point1Img" />
          </div>
        </div>
      </IntersectionAnimation>
      <IntersectionAnimation>
        <div className="lending-middle-card desktop:justify-normal desktop:pl-108pxr gap-100pxr desktop:flex-row">
          <div className="flex flex-col gap-100pxr desktop:order-1 tablet:pl-60pxr mobile:items-center mobile:gap-60pxr">
            <span className="font-medium text-22pxr text-gray60">Point 2</span>
            <span className="font-bold text-48pxr mobile:text-36pxr mobile:text-center">
              해야 할 일을
              <br /> 등록하세요
            </span>
          </div>
          <div className="tablet:w-360pxr tablet:mx-auto mobile:w-218pxr mobile:mx-auto">
            <Image src={point2Img} alt="point1Img" />
          </div>
        </div>
      </IntersectionAnimation>
    </>
  );
}

function Bottom() {
  return (
    <div className="flex flex-col pb-70pxr gap-36pxr">
      <span className="font-bold text-28pxr mobile:text-22pxr mobile:text-center">
        생산성을 높이는 다양한 설정 ⚡
      </span>
      <div className="gap-33pxr flex-col-center desktop:flex-center">
        <IntersectionAnimation>
          <Card
            image={card1Img}
            title="대시보드 설정"
            description="대시보드 사진과 이름을 변경할 수 있어요."
          />
        </IntersectionAnimation>
        <IntersectionAnimation delay={0.5}>
          <Card
            image={card2Img}
            title="초대"
            description="새로운 팀원을 초대할 수 있어요."
          />
        </IntersectionAnimation>
        <IntersectionAnimation delay={1}>
          <Card
            image={card3Img}
            title="구성원"
            description="구성월을 초대하고 내보낼 수 있어요."
          />
        </IntersectionAnimation>
      </div>
    </div>
  );
}

export default function Home() {
  const token = getLocalItem('accessToken');
  const router = useRouter();
  useEffect(() => {
    if (token) router.push('/mydashboard');
  }, []);
  return (
    <>
      <Header />
      <div className="py-90pxr flex-col-center gap-90pxr mobile:py-40pxr">
        <Top />
        <Middle />
        <Bottom />
      </div>
      <Footer />
    </>
  );
}
