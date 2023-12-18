import React from 'react';
import Button from '../common/Button';

function NameEditForm() {
  return (
    <div className="w-620 h-64 bg-gray30 p-7">
      <div className="flex justify-between">
        <h1>비브리지</h1>
        <div className="w-[11rem] bg-green h-4">chip Sample</div>
      </div>
      <form>
        <label htmlFor="boardName" />
        <input name="boardName" />
        <Button viewType="desktop">변경</Button>
      </form>
    </div>
  );
}

export default NameEditForm;
