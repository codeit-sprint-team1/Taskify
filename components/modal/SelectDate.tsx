import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import calendarImage from '@/public/icons/calendar.svg';
import Image from 'next/image';

export default function SelectDate() {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <div className=" border border-gray30 focus:border-violet">
      <button>
        <Image src={calendarImage} alt="달력 이미지" width={20} height={20} />
        <DatePicker
          dateFormat="yyyy년 MM월 dd일"
          onChange={(date) => setStartDate(date)}
          locale={ko}
          className="outline-0 cursor-pointer"
          placeholderText="날짜를 선택해주세요."
        />
      </button>
    </div>
  );
}
