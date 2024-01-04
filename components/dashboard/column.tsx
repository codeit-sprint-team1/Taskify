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
import { CreateColumnModal, ProfileImage, TodoModal } from '..';
import { useEffect, useState } from 'react';
import { Columns } from '@/types/columns';
import { EditColumnModal } from '../index';
import searchIcon from '../../public/icons/search-icon.svg';
import CreateCardModal from '../modal/create-card/CreateCardModal';
import { Tag } from '../index';

interface CardAddProps {
  dashboardId: number;
  columnId: number;
  getCards: () => void;
}

function CardAdd({ dashboardId, columnId, getCards }: CardAddProps) {
  const { isOn, toggle } = useToggle(false);
  return (
    <>
      <button
        className="bg-white flex-center border-solid border border-gray30 w-full py-10pxr rounded-md"
        onClick={toggle}
      >
        <div className="w-22pxr h-22xpr flex-center rounded bg-violet8 p-3pxr">
          <Image src={plusIcon} alt="plusIcon" />
        </div>
      </button>
      <CreateCardModal
        isOpen={isOn}
        onCancel={toggle}
        dashboardId={dashboardId}
        columnId={columnId}
        getCards={getCards}
      />
    </>
  );
}

function Card({
  card,
  getCards,
  columnTitle,
  columns,
  column,
}: {
  card: Card;
  getCards: () => void;
  columnTitle: string;
  columns: Columns[];
  column: Columns;
}) {
  const date = card.dueDate && card.dueDate.split(' ')[0];
  const { isOn, toggle } = useToggle();
  return (
    <>
      <button
        onClick={toggle}
        className=" bg-white flex flex-col p-20pxr rounded-md gap-10pxr tablet:gap-20pxr border-solid border border-gray30 tablet:flex-row tablet:justify-center tablet:items-center"
      >
        {card.imageUrl && (
          <div className="relative w-full h-160pxr tablet:h-53pxr tablet:w-90pxr bg-gray10 rounded-md">
            <Image src={card.imageUrl} alt="cardImg" fill objectFit="contain" />
          </div>
        )}
        <div className="tablet: w-full flex flex-col gap-10pxr">
          <div className="flex text-gray70 font-medium">{card.title}</div>
          <div className="flex-center justify-between">
            <div className="flex flex-col gap-10pxr w-full">
              <div className="flex gap-6pxr flex-wrap">
                {card.tags.map((item, index) => (
                  <Tag tag={item} key={index} />
                ))}
              </div>
              <div className="flex gap-6pxr text-gray50 text-12pxr font-medium">
                {date && (
                  <>
                    <Image src={calIcon} alt="calIcon" />
                    {date}
                  </>
                )}
              </div>
            </div>
            {card.assignee && (
              <div className="shrink-0">
                <ProfileImage
                  name={card.assignee.nickname}
                  src={card.assignee.profileImageUrl}
                  userId={card.assignee.id}
                  size="sm"
                />
              </div>
            )}
          </div>
        </div>
      </button>
      <TodoModal
        isOpen={isOn}
        onCancel={toggle}
        card={card}
        getCards={getCards}
        state={column}
        states={columns}
      />
    </>
  );
}

function ColumnTitle({
  title,
  totalCount,
  toggle,
}: {
  title: string;
  totalCount: number;
  toggle: () => void;
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
      <button onClick={toggle}>
        <Image src={settingIcon} alt="settingIcon" />
      </button>
    </div>
  );
}

function Column({
  data,
  getColum,
  columns,
}: {
  data: Columns;
  getColum: () => void;
  columns: Columns[];
}) {
  const { cards, totalCount, execute: getCards } = useGetCards(data.id);
  const { isOn, toggle } = useToggle(false);
  const [searchValue, setSearchValue] = useState('');
  let filterCards = filter();

  function filter() {
    if (searchValue === '') {
      return cards;
    }
    if (cards) {
      return cards.filter((card) =>
        card.tags.some((item) => item.includes(searchValue))
      );
    }
  }

  return (
    <>
      <div className="flex flex-col shrink-0 w-354pxr h-full overflow-scroll px-20pxr py-20pxr bg-gray10 gap-20pxr border-solid border border-gray20 tablet:w-full tablet:h-auto mobile:w-full mobile:h-auto">
        <ColumnTitle
          title={data.title}
          totalCount={totalCount}
          toggle={toggle}
        />
        <div className="flex rounded-md border border-solid bg-white border-gray30 px-16pxr py-8pxr gap-8pxr">
          <Image src={searchIcon} alt="searchIcon" />
          <input
            className="w-full placeholder:text-gray40 mobile:text-14pxr"
            placeholder="검색"
            onChange={(event) => setSearchValue(event.target.value)}
          />
        </div>
        <div className="flex flex-col gap-15pxr h-full overflow-scroll rounded-md">
          <CardAdd
            dashboardId={data?.dashboardId}
            columnId={data.id}
            getCards={getCards}
          />
          {filterCards &&
            filterCards.map((card) => (
              <Card
                card={card}
                key={card.id}
                getCards={getCards}
                columnTitle={data.title}
                columns={columns}
                column={data}
              />
            ))}
        </div>
      </div>
      <EditColumnModal
        columnId={data.id}
        isOpen={isOn}
        onCancel={toggle}
        getColum={getColum}
      />
    </>
  );
}

function ColumnAdd({ getColum }: { getColum: () => void }) {
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
        columns.map((items) => (
          <Column
            data={items}
            key={items.id}
            getColum={getColum}
            columns={columns}
          />
        ))}
      <ColumnAdd getColum={getColum} />
    </div>
  );
}
