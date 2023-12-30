import plusIcon from '../../public/icons/plus-icon.svg';
import arrowIcon from '../../public/icons/arrow-icon.svg';
import crownIcon from '../../public/icons/crown-icon.svg';
import Image from 'next/image';
import Link from 'next/link';
import { CreateDashboardModal } from '@/components';
import useToggle from '@/hooks/useToggle';
import useGetDashBoards from './data/useGetDashBoards';
import { useDashboardList } from '@/store/memos/useDashboardList';
import { useEffect, useState } from 'react';
import { Dashboards } from '@/types/dashboards';
import PaginationButton from '../common/PaginationButton';

interface Colors {
  [key: string]: string;
}

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
  const colors: Colors = {
    '#7ac555': 'bg-green',
    '#5534da': 'bg-violet',
    '#ffa500': 'bg-orange',
    '#76a5ea': 'bg-blue',
    '#e876ea': 'bg-pink',
  };
  const bg = colors[color];
  return (
    <Link href={`board/${id}`}>
      <div className="flex-center justify-between w-330pxr h-70pxr bg-white rounded-lg border border-solid border-gray30 gap-12pxr px-20pxr">
        <div className="flex-center gap-16pxr">
          <div className={`w-8pxr h-8pxr rounded-full ${bg}`}></div>
          <div className="flex-center gap-8pxr">
            <div className="font-semibold text-gray70">{title}</div>
            {createByMe && <Image src={crownIcon} alt="crownIcon" />}
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
  const { isOn, toggle } = useToggle(false);
  return (
    <>
      <button
        onClick={toggle}
        className="flex-center w-330pxr h-70pxr bg-white rounded-lg border border-solid border-gray30 gap-12pxr"
      >
        <div className="font-semibold text-gray70">새로운 대시보드</div>
        <div className="bg-violet8">
          <Image src={plusIcon} alt="plusIcon" />
        </div>
      </button>
      <CreateDashboardModal isOpen={isOn} onCancel={toggle} />
    </>
  );
}

export default function BoardList() {
  const { dashboards, totalPage } = useGetDashBoards();
  const [data, setData] = useState<Dashboards[]>();
  const { dashboardList, setDashboardList } = useDashboardList();
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (dashboards) {
      setDashboardList(dashboards);
    }
  }, [dashboards]);

  useEffect(() => {
    if (dashboardList) {
      setData(dashboardList.slice((page - 1) * 5, page * 5));
    }
  }, [dashboardList, page]);

  return (
    <div className="flex flex-col gap-12pxr">
      <div className="grid grid-cols-3 gap-12pxr">
        <CreateBoard />
        {data &&
          data.length !== 0 &&
          data.map((item) => (
            <Board
              title={item.title}
              color={item.color}
              createByMe={item.createdByMe}
              id={item.id}
              key={item.id}
            />
          ))}
      </div>
      {data && (
        <div className="flex justify-end items-center gap-16pxr">
          <div className="text-14pxr text-black">
            {totalPage} 페이지 중 {page}
          </div>
          <PaginationButton
            onClickLeft={() => setPage(page - 1)}
            onClickRight={() => setPage(page + 1)}
            page={page}
            totalPages={totalPage}
          />
        </div>
      )}
    </div>
  );
}
