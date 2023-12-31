import { SyntheticEvent } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import calendarImage from '@/public/icons/calendar-icon.svg';
import Image from 'next/image';
import { CardLabelProps } from '../common/Textarea';
import { Label } from '..';
import { DateTime } from 'ts-luxon';

interface SelectDateProps extends CardLabelProps {
  value?: string | null;
  onChange: (date: string | null) => void;
}

export default function SelectDate({
  label,
  required,
  value,
  onChange,
}: SelectDateProps) {
  const isPossibleDay = (date: Date) => {
    const currentDate = DateTime.local();
    return DateTime.fromJSDate(date) >= currentDate.startOf('day');
  };
  const handleDateChange = (
    date: Date | null,
    event: SyntheticEvent<any, Event> | undefined
  ) => {
    if (date && onChange) {
      const formattedDate =
        DateTime.fromJSDate(date).toFormat('yyyy-MM-dd HH:mm');
      onChange(formattedDate);
    }
  };

  return (
    <div>
      <Label text={label} required={required} />
      <div className=" border border-gray30 focus:border-violet flex items-center gap-10pxr w-full h-50pxr rounded-md  mobile:w-287pxr">
        <Image
          src={calendarImage}
          alt="달력 이미지"
          width={20}
          height={20}
          className="ml-10pxr"
        />
        <DatePicker
          selected={value ? new Date(value) : null}
          dateFormat="yyyy년 MM월 dd일 HH시 mm분"
          onChange={handleDateChange}
          locale={ko}
          className="outline-0 cursor-pointer w-240pxr caret-transparent mobile:text-14pxr flex"
          placeholderText="날짜를 선택해주세요."
          showTimeSelect
          timeFormat="HH시 mm분"
          timeIntervals={30}
          timeCaption="time"
          filterDate={isPossibleDay}
        />
      </div>
    </div>
  );
}
