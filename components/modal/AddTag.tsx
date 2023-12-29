import React, {
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  useRef,
  useState,
} from 'react';
import Tag from '../common/Tag';

const AddTag = () => {
  const [tagItem, setTagItem] = useState<string>('');
  const [tagList, setTagList] = useState<string[]>([]);

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    if (e.nativeEvent.isComposing) return;

    if (target.value.length !== 0 && e.key === 'Enter') {
      submitTagItem();
    }
  };

  const submitTagItem = () => {
    let updatedTagList: string[] = [...tagList];
    updatedTagList.push(tagItem);
    setTagList(updatedTagList);
    setTagItem('');
  };

  const deleteTagItem = (tagToDelete: string) => {
    const filteredTagList = tagList.filter(
      (tagItem) => tagItem !== tagToDelete
    );
    setTagList(filteredTagList);
  };
  return (
    <div className="flex items-center gap-x-8pxr flex-wrap border border-gray-400 rounded-md px-5pxr">
      {tagList.map((tagItem, index) => {
        return (
          <div key={index} className="h-50pxr flex items-center">
            <Tag tag={tagItem} onClick={() => deleteTagItem(tagItem)} isEdit />
          </div>
        );
      })}
      <input
        type="text"
        placeholder="입력 후 Enter"
        onChange={(e) => setTagItem(e.target.value)}
        value={tagItem}
        onKeyDown={onKeyDown}
        className=" h-50pxr inline-flex outline-none"
      />
    </div>
  );
};
export default AddTag;
