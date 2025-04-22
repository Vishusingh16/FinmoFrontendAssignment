'use client';
import {Loader2} from 'lucide-react';

export function Loader() {
  return (
    <div className="flex justify-center items-center">
      <Loader2 className="animate-spin h-6 w-6 text-accent" />
    </div>
  );
}
