import calIcon from '../../public/icons/boards/calendar.svg';
import dotIcon from '../../public/icons/boards/card-dot.svg';
import settingIcon from '../../public/icons/boards/card-desktop-settings.svg';
import plusIcon from '../../public/icons/boards/plus.svg';
import Image from 'next/image';
import { Card } from '@/types/cards';
import { useRouter } from 'next/router';
import useGetColum from './data/useGetColums';
import useGetCards from './data/useGetCards';
import useToggle from '@/hooks/useToggle';
import { CreateColumnModal } from '..';
import { useEffect } from 'react';
import { Columns } from '@/types/columns';
import { DateTime } from 'ts-luxon';
import testImg from '../../public/icons/boards/test-img.png';
import CreateCardModal from '../modal/create-card/CreateCardModal';

function CardAdd() {
  const { isOn, toggle } = useToggle(false);
  return (
    <button
      className="bg-white flex-center border-solid border border-gray30 w-full py-10pxr rounded-md"
      onClick={toggle}
    >
      <div className="w-22pxr h-22xpr flex-center rounded bg-violet8 p-3pxr">
        <Image src={plusIcon} alt="plusIcon" />
      </div>
      <CreateCardModal isOpen={isOn} onCancel={toggle} />
    </button>
  );
}

function Card({ card }: { card: Card }) {
  const date = DateTime.fromISO(card.createdAt).toFormat('yyyy-MM-dd');
  return (
    <div className=" bg-white flex flex-col p-20pxr rounded-md gap-10pxr tablet:gap-20pxr border-solid border border-gray30 tablet:flex-row tablet:justify-center tablet:items-center">
      <div className="rounded-md tablet:w-90pxr">
        {/* {card.imageUrl && <Image src={card.imageUrl} alt="cardImg" />} */}
        <Image src={testImg} alt="testImg" />
      </div>
      <div className="tablet: w-full flex flex-col gap-10pxr">
        <div className="text-gray70 font-medium">{card.title}</div>
        <div className="flex-center justify-between">
          <div className="flex flex-col gap-10pxr tablet:flex-row">
            <div className="flex">
              {card.tags.map((item) => (
                <div>{item}</div>
              ))}
            </div>
            <div className="flex-center gap-6pxr text-gray50 text-12pxr font-medium">
              <Image src={calIcon} alt="calIcon" />
              {date}
            </div>
          </div>
          <div className="flex justify-end items-end h-full">
            <div className="flex-center w-24pxr h-24pxr bg-pink rounded-full text-12pxr text-white font-semibold">
              {card.assignee.nickname.slice(0, 1)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ColumnTitle({
  title,
  totalCount,
}: {
  title: string;
  totalCount: number;
}) {
  return (
    <div className="flex justify-between">
      <div className="flex-center gap-10pxr">
        <Image src={dotIcon} alt="dotIcon" />
        <div className="text-gray70 text-18pxr font-bold">{title}</div>
        <div className="bg-gray20 rounded px-6pxr py-3pxr text-12pxr text-gray50 font-medium">
          {totalCount}
        </div>
      </div>
      <div>
        <Image src={settingIcon} alt="settingIcon" />
      </div>
    </div>
  );
}

function Column({ data }: { data: Columns }) {
  const { cards, totalCount } = useGetCards(data.id);
  return (
    <div className="flex flex-col shrink-0 w-354pxr h-full overflow-scroll px-20pxr pt-20pxr bg-gray10 gap-25pxr border-solid border border-gray20 tablet:w-full tablet:h-auto mobile:w-full mobile:h-auto">
      <ColumnTitle title={data.title} totalCount={totalCount} />
      <div className="flex flex-col gap-15pxr h-full overflow-scroll">
        <CardAdd />
        {cards && cards.map((card) => <Card card={card} key={card.id} />)}
      </div>
    </div>
  );
}

interface ColumnAddProps {
  getColum: () => void;
}

function ColumnAdd({ getColum }: ColumnAddProps) {
  const { isOn, toggle } = useToggle(false);
  return (
    <>
      <div className="flex flex-col items-center shrink-0 w-354pxr h-full px-20pxr pt-68pxr bg-gray10 tablet:w-full tablet:pt-12pxr mobile:w-full mobile:pt-12pxr">
        <button
          onClick={toggle}
          className="bg-white flex-center border-solid border border-gray30 w-full py-20pxr gap-12pxr rounded-lg"
        >
          <div className="text-18pxr font-bold">새로운 컬럼 추가하기</div>
          <div className="w-22pxr h-22xpr flex-center rounded bg-violet8 p-3pxr">
            <Image src={plusIcon} alt="plusIcon" />
          </div>
        </button>
      </div>
      <CreateColumnModal isOpen={isOn} onCancel={toggle} getColum={getColum} />
    </>
  );
}

export default function ColumnList() {
  const router = useRouter();
  const currentId = router.query['id'] as string | undefined;
  const id = Number(currentId);
  const { execute: getColum, columns } = useGetColum(id);

  useEffect(() => {
    getColum();
  }, [id]);

  return (
    <div className="bg-gray10 h-full w-full flex overflow-scroll tablet:flex-col mobile:flex-col">
      {columns &&
        columns.map((items) => <Column data={items} key={items.id} />)}
      <ColumnAdd getColum={getColum} />
    </div>
  );
}
