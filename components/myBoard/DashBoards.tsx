import plusIcon from '../../public/icons/plusIcon.svg';
import arrowIcon from '../../public/icons/arrowIcon.svg';
import crownIcon from '../../public/icons/crownIcon.svg';
import Image from 'next/image';
import { DashboardsRawData } from '@/types/dashboards';
import Link from 'next/link';

const mok: DashboardsRawData = {
  cursorId: 1,
  totalCount: 5,
  dashboards: [
    {
      id: 1,
      title: 'test1',
      color: 'pink',
      createdAt: 'string',
      updatedAt: 'string',
      createdByMe: true,
      userId: 1,
    },
    {
      id: 2,
      title: 'test2',
      color: 'blue',
      createdAt: 'string',
      updatedAt: 'string',
      createdByMe: false,
      userId: 1,
    },
    {
      id: 3,
      title: 'test3',
      color: 'red',
      createdAt: 'string',
      updatedAt: 'string',
      createdByMe: true,
      userId: 1,
    },
    {
      id: 4,
      title: 'test4',
      color: 'violet',
      createdAt: 'string',
      updatedAt: 'string',
      createdByMe: false,
      userId: 1,
    },
    {
      id: 5,
      title: 'test5',
      color: 'orange',
      createdAt: 'string',
      updatedAt: 'string',
      createdByMe: true,
      userId: 1,
    },
  ],
};

function Board({
  title,
  color,
  createByMe,
  id,
}: {
  title: string;
  color: string;
  createByMe: boolean;
  id: number;
}) {
  return (
    <Link href={`board/${id}`}>
      <div className="flex-center justify-between w-330pxr h-70pxr bg-white rounded-lg border border-solid border-gray30 gap-12pxr px-20pxr">
        <div className="flex-center gap-16pxr">
          <div className={`w-8pxr h-8pxr ${color} rounded-full`}></div>
          <div className="flex-center gap-8pxr">
            <div className="font-semibold text-gray70">{title}</div>
            {createByMe ? <Image src={crownIcon} alt="crownIcon" /> : ''}
          </div>
        </div>
        <div>
          <Image src={arrowIcon} alt="arrowIcon" />
        </div>
      </div>
    </Link>
  );
}

function CreateBoard() {
  return (
    <button className="flex-center w-330pxr h-70pxr bg-white rounded-lg border border-solid border-gray30 gap-12pxr">
      <div className="font-semibold text-gray70">새로운 대시보드</div>
      <div className="bg-violet8">
        <Image src={plusIcon} alt="plusIcon" />
      </div>
    </button>
  );
}

export default function BoardList() {
  const { dashboards } = mok;
  return (
    <div className="flex flex-col gap-12pxr">
      <div className="grid grid-cols-3 gap-12pxr">
        <CreateBoard />
        {dashboards.map((item) => (
          <Board
            title={item.title}
            color={`bg-${item.color}`}
            createByMe={item.createdByMe}
            id={item.id}
          />
        ))}
      </div>
      {dashboards[0] ? (
        <div className="flex justify-end">1 페이중 중 1 </div> // 페이지 네이션 오면 바꾸기
      ) : (
        ''
      )}
    </div>
  );
}
