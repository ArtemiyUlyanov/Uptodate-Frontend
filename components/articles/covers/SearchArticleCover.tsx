import { ArticleTopicModel } from "@/models/article_topic";
import { UserModel } from "@/models/user";
import { UserAvatarIcon } from "@/ui/icons/UserAvatarIcon";
import { formatDate, retrieveDateFromISO } from "@/utils/date_utils";
import { capitalizeText, parseQueryText } from "@/utils/text_utils";
import { Card, CardBody, Image, Link } from "@nextui-org/react";
import clsx from "clsx";
import { useMemo } from "react";

export type SearchArticleCoverProps = {
    id: number
    heading: string
    description: string
    topics: ArticleTopicModel[]
    createdAt: string
    query?: string
    author?: UserModel
    url: string
    className?: string
}

export const SearchArticleCover: React.FC<SearchArticleCoverProps> = ({
    id,
    heading,
    description,
    topics,
    url,
    query,
    createdAt,
    author,
    className
}) => {
    const [dayCreated, monthCreated, yearCreated] = useMemo(() => retrieveDateFromISO(createdAt), [createdAt]);

    return (
        <Card 
            className="w-full" 
            radius="none"
            shadow="none"
            classNames={{
                base: 'bg-[transparent]'
            }}
        >
            <CardBody className="flex flex-row overflow-hidden gap-2 p-1">
                <div className={clsx(
                    'flex flex-row w-full gap-4'
                )}>
                    <div className="w-1/4">
                        <Image
                            alt={heading}
                            className="w-full object-cover object-top aspect-square"
                            radius="lg"
                            shadow="none"
                            disableSkeleton={false}
                            src={url}
                        />
                    </div>
                    <div className={clsx(
                        'flex flex-col w-3/4 gap-1'
                    )}>
                        <div className={clsx(
                            'flex flex-row flex-wrap items-center gap-2'
                        )}>
                            <div className={clsx(
                                'flex flex-row gap-2 items-center'
                            )}>
                                <UserAvatarIcon 
                                    url={'/api/files/get?path=' + (author && author?.icon)}
                                    size="sm"
                                    className='w-full h-full aspect-square object-cover'
                                />
                                <div className={clsx(
                                    'flex flex-col h-auto'
                                )}>
                                    <p className={clsx(
                                        'relative font-interTight font-semibold text text-sm text-primaryText line-clamp-1'
                                    )}>{author?.firstName + " " + author?.lastName}</p>
                                    <p className={clsx(
                                        'relative font-interTight font-medium text text-sm text-roseText line-clamp-1'
                                    )}>{formatDate(createdAt)}</p>
                                </div>
                            </div>
                        </div>
                        <div className={clsx(
                            'flex flex-col'
                        )}>
                            <Link
                                href={`/${dayCreated}/${monthCreated}/${yearCreated}/${heading}`}
                                className="hover:opacity-50"
                            >
                                <p className="font-interTight font-semibold text-primaryText text-sm line-clamp-2">{parseQueryText(capitalizeText(heading), query || '', 'bg-roseText text-oppositeText')}</p>
                            </Link>
                            <p className="font-interTight font-medium text-secondaryText text-sm line-clamp-3">{parseQueryText(description, query || '', 'bg-roseText text-oppositeText')}</p>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}

export default SearchArticleCover;