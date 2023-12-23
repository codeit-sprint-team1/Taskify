import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import calendarImage from '@/public/icons/calendar.svg';
import Image from 'next/image';

export default function SelectDate() {
  const [selectDate, setSelectDate] = useState<Date | null>(null);
  const isPossibleDay = (date: Date) => {
    const currentDate = new Date();
    const selectedDate = new Date(date);
    return currentDate.getDate() <= selectedDate.getDate();
  };

  return (
    <div className=" border border-gray30 focus:border-violet flex items-center gap-10pxr w-full h-50pxr rounded-md ">
      <Image src={calendarImage} alt="달력 이미지" width={20} height={20} />
      <DatePicker
        selected={selectDate}
        dateFormat="yyyy년 MM월 dd일 HH시 mm분 "
        onChange={(date) => setSelectDate(date)}
        locale={ko}
        className="outline-0 cursor-pointer w-250pxr "
        placeholderText="날짜를 선택해주세요."
        showTimeSelect
        timeFormat="HH시 mm분"
        // timeIntervals={30}
        timeCaption="time"
        filterDate={isPossibleDay}
      />
    </div>
  );
}
