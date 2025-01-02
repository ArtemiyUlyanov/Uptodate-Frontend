import React from 'react'
import icon from '@/public/images/search_icon.png';
import Image from 'next/image';
import clsx from 'clsx';

export type SearchIconProps = React.ImgHTMLAttributes<HTMLElement>

export const SearchIcon: React.FC<SearchIconProps> = ({ ...props }) => {
  return (
    <Image
      src={icon}
      width={32}
      height={32}
      alt='Image is likely not to be supported'
      className={clsx(
        'w-[auto] h-[100%] object-contain select-none'
      )}
    />
  )
}