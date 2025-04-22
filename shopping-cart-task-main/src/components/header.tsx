
import { ArrowLeft } from "lucide-react";
import { useRouter } from 'next/navigation';

interface HeaderProps {
  title?: string;
}

export function Header({ title }: HeaderProps) {
  const router = useRouter();

  return (
    <div className="flex items-center w-full p-4 border-b border-gray-200">
      <button onClick={() => router.back()} className="mr-4">
        <ArrowLeft className="w-6 h-6" />
      </button>
      {title && <h1 className="text-xl font-bold">{title}</h1>}
    </div>
  );
}