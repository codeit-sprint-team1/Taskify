import testImg from '../../public/icons/boards/test-img.png';
import calIcon from '../../public/icons/boards/calendar.svg';
import dotIcon from '../../public/icons/boards/card-dot.svg';
import settingIcon from '../../public/icons/boards/card-desktop-settings.svg';
import plusIcon from '../../public/icons/boards/plus.svg';
import Image from 'next/image';

function CardAdd() {
  return (
    <div className="bg-white flex-center border-solid border border-gray30 w-full py-10pxr rounded-md">
      <div className="w-22pxr h-22xpr flex-center rounded bg-violet8 p-3pxr">
        <Image src={plusIcon} alt="plusIcon" />
      </div>
    </div>
  );
}

function Card() {
  return (
    <div className=" bg-white flex flex-col p-20pxr rounded-md gap-10pxr border-solid border border-gray30">
      <div className="bg-blue rounded-md">
        <Image src={testImg} alt="testImg" />
      </div>
      <div className="text-gray70 font-medium">새로운 일정 관리 Taskify</div>
      <div>태그 논의하기</div>
      <div className="flex justify-between">
        <div className="flex-center gap-6pxr text-gray50">
          <Image src={calIcon} alt="calIcon" />
          2022.12.31
        </div>
        <div className="flex-center w-24pxr h-24pxr bg-pink rounded-full text-12pxr text-white font-semibold">
          B
        </div>
      </div>
    </div>
  );
}

function ColumnTitle() {
  return (
    <div className="flex justify-between">
      <div className="flex-center gap-10pxr">
        <Image src={dotIcon} alt="dotIcon" />
        <div className="text-gray70 text-18pxr font-bold">Title</div>
        <div className="bg-gray20 rounded px-6pxr py-3pxr text-12pxr text-gray50 font-medium">
          3
        </div>
      </div>
      <div>
        <Image src={settingIcon} alt="settingIcon" />
      </div>
    </div>
  );
}

function Column() {
  return (
    <div className="flex flex-col w-354pxr p-20pxr bg-gray10 gap-25pxr border-solid border border-gray20">
      <ColumnTitle />
      <div className="flex-col-center gap-15pxr">
        <CardAdd />
        <Card />
        <Card />
      </div>
    </div>
  );
}

export default function BoardsPage() {
  return (
    <div className="w-screen h-screen bg-pink flex-center">
      <Column />
      <Column />
      <Column />
      <Column />
    </div>
  );
}
