import React from 'react';
import { AVATARS } from '../data/avatars';
import { useSound } from '../context/SoundContext';

export const AvatarPicker = ({ selectedAvatar, onSelect }) => {
  const { playClick } = useSound();

  return (
    <div>
      <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">
        Choose Your Character / Avatar:
      </label>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5">
        {AVATARS.map((item) => {
          const isSelected = selectedAvatar === item.emoji;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                playClick();
                onSelect(item.emoji);
              }}
              className={`p-3 rounded-2xl border-3 flex flex-col items-center justify-center transition-all ${
                isSelected
                  ? 'bg-purple-100 border-purple-500 scale-105 shadow-md ring-2 ring-purple-300'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span className="text-3xl mb-1">{item.emoji}</span>
              <span className="text-[11px] font-extrabold text-slate-700 truncate w-full text-center">
                {item.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
