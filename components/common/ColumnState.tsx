interface ColumnStateProps {
  title: string;
}

export default function ColumnState({ title }: ColumnStateProps) {
  const colorSet = [
    { key: '0', value: '#7ac555', colorName: 'bg-green' },
    { key: '1', value: '#5534da', colorName: 'bg-violet' },
    { key: '2', value: '#ffa500', colorName: 'bg-orange' },
    { key: '3', value: '#76a5ea', colorName: 'bg-blue' },
    { key: '4', value: '#e876ea', colorName: 'bg-pink' },
  ];

  return (
    <div className="inline-flex whitespace-nowrap items-center h-22pxr gap-6pxr px-8pxr border rounded-xl bg-gray10">
      <div className="rounded-full bg-green w-6pxr h-6pxr"></div>
      <span className="text-12pxr text-green ">{title}</span>
    </div>
  );
}
