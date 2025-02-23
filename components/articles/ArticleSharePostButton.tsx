import { useDictionary } from "@/hooks/useDictionary";
import { CentredDrawer } from "@/ui/drawers/CentredDrawer";
import { DrawerBody, DrawerTrigger } from "@/ui/drawers/drawer_components";
import { ShareIcon } from "@/ui/icons/ShareIcon";
import { Button, Snippet, Tooltip } from "@nextui-org/react";
import clsx from "clsx";

export type ArticleSharePostButtonProps = React.HTMLProps<HTMLDivElement> & {
    url: string
}

export const ArticleSharePostButton: React.FC<ArticleSharePostButtonProps> = ({
    url
}) => {
    const { translate } = useDictionary();

    return (
        <CentredDrawer
            drawerSize="md"
            title={'Share the article'}
            closeTooltip={'Close the menu'}
        >
            <DrawerTrigger>
                {(onClick) => (
                    <Tooltip
                        content='Share this post'
                        closeDelay={0}
                        classNames={{
                            content: 'bg-backgroundColor font-interTight font-semibold text-primaryColor'
                        }}
                    >
                        <Button
                            isIconOnly
                            className={clsx(
                                'bg-[transparent]',
                                'transition-all duration-200',
                            )}
                            onPress={onClick}
                            variant='light'
                            size="sm"
                        >
                            <div 
                                className={clsx(
                                    'h-4 fill-primaryColor',
                                )}
                            >
                                <ShareIcon />
                            </div>
                        </Button>
                    </Tooltip>
                )}
            </DrawerTrigger>
            <DrawerBody>
                <Snippet
                    tooltipProps={{
                        closeDelay: 0,
                        delay: 0,
                        classNames: {
                            content: 'bg-backgroundColor font-interTight font-semibold text-primaryColor'
                        }
                    }}
                    size="sm"
                >
                    <div className="w-3/4 overflow-hidden">
                        <span>{url}</span>
                    </div>
                </Snippet>
            </DrawerBody>
        </CentredDrawer>
    );
}