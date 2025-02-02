import clsx from "clsx"
import icon from '@/public/images/account_icon.png';
import Image from "next/image"

export type AccountIconProps = React.ImgHTMLAttributes<HTMLElement> & {
    customClassName?: string
}

export const AccountIcon: React.FC<AccountIconProps> = ({ 
    customClassName,
    ...props 
}) => {
  return (
    <Image
      src={icon}
      alt='Image is likely not to be supported'
      className={clsx(
        'w-[auto] h-[100%] object-contain select-none',
        customClassName
      )}
    />
  )
}