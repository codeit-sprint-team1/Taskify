import React, { useState } from 'react';
import ColorChips from '../common/ColorChips';

function NameEditForm() {
  const [color, setColor] = useState('');
  return (
    <div className="w-620 h-64 p-7 space-y-6">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">비브리지</h1>
        <ColorChips setColor={setColor} />
      </div>
      <form className="flex flex-col">
        <label htmlFor="boardName" className="mb-2 text-lg">
          대시보드 이름
        </label>
        <input
          name="boardName"
          className="rounded-md border border-gray30 w-full h-12 mb-6 focus:outline-none indent-3"
        />
      </form>
    </div>
  );
}

export default NameEditForm;
