'use client';

import { ReactElement } from 'react';

type ModalFormProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactElement;
};

export default function ModalForm({ isOpen, onClose, title, children }: ModalFormProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-lg max-w-lg w-full relative">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div>{children}</div>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          &times;
        </button>
      </div>
    </div>
  );
}
