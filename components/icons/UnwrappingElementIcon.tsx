import Image from "next/image"
import icon from '@/public/images/filters_icon_2.png';
import clsx from "clsx";

export type UnwrappingElementIconProps = React.ImgHTMLAttributes<HTMLElement> & {
    className?: string
}

export const UnwrappingElementIcon: React.FC<UnwrappingElementIconProps> = ({ 
    className,
    ...props 
}) => {
  return (
    <Image
      src={icon}
      alt='Image is likely not to be supported'
      className={clsx(
        'w-[auto] h-[100%] object-contain select-none',
        className
      )}
    />
  )
}