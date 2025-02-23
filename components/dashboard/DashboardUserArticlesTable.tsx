import { useAccount } from "@/hooks/models/useAccount";
import { useArticles } from "@/hooks/models/useArticles";
import { AddIcon } from "@/ui/icons/AddIcon";
import { EditIcon } from "@/ui/icons/EditIcon";
import { LikeIcon } from "@/ui/icons/LikeIcon";
import { TrashIcon } from "@/ui/icons/TrashIcon";
import { ViewIcon } from "@/ui/icons/ViewIcon";
import { capitalizeText } from "@/utils/text_utils";
import { addToast, Button, Image, Selection, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from "@heroui/react";
import clsx from "clsx";
import React, { useEffect, useState } from "react";

export type DashboardUserArticlesTableProps = React.HTMLProps<HTMLDivElement> & {
    
}

export const DashboardUserArticlesTable: React.FC<DashboardUserArticlesTableProps> = ({

}) => {
    const { user } = useAccount();
    const { articles, likeMutate, deleteMutate } = useArticles({ ids: user?.articlesIds || [] });

    const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set([]));

    const handleChange = (keys: Selection) => {
        if (keys == 'all') {
            setSelectedKeys(new Set(articles?.map(article => article.slug)));
        } else {
            setSelectedKeys(keys as Set<string>);
        }
    }
    
    const deleteArticle = (id: number) => {
        deleteMutate({ id });

        addToast({
            title: "Article deleted!",
            classNames: {
                title: 'font-interTight font-semibold text-primaryText',
                icon: 'h-4 fill-redColor',
                base: 'bg-backgroundColor'
            },
            icon: (
                <TrashIcon />
            )
        });
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-row items-end justify-between w-full">
                <div className="flex flex-col">
                    <p className="font-interTight font-semibold text-base text-primaryText">Your articles</p>
                    <p className="font-interTight font-semibold text-base text-secondaryText">These are your articles</p>
                </div>
                <div className="flex flex-row gap-2">
                    <Button
                        className={clsx(
                            'gap-1.5 bg-[transparent]',
                            'transition-all duration-200',
                        )}
                        // onPress={deleteArticle}
                        isDisabled={selectedKeys.size <= 0}
                        size="sm"
                        variant='light'
                        startContent={
                            <div className="h-4 fill-redColor">
                                <TrashIcon />
                            </div>
                        }
                    >
                        <p className="font-interTight font-semibold text-sm text-redText">{`Delete all articles (${(selectedKeys as Set<string>).size})`}</p>
                    </Button>
                    <Button
                        as='a'
                        href={`/dashboard/articles/create`}
                        className={clsx(
                            'gap-1.5 bg-[transparent]',
                            'transition-all duration-200',
                        )}
                        // onPress={deleteArticle}
                        size="sm"
                        variant='light'
                        startContent={
                            <div className="h-4 fill-primaryColor">
                                <AddIcon />
                            </div>
                        }
                    >
                        <p className="font-interTight font-semibold text-sm text-primaryText">Create a new article</p>
                    </Button>
                </div>
            </div>
            <Table 
                removeWrapper 
                aria-label="Table with images"
                classNames={{
                    th: 'font-interTight font-semibold text-xs text-oppositeText bg-primaryColor'
                }}
                selectionMode="multiple"
                selectedKeys={selectedKeys}
                onSelectionChange={handleChange}
            >
                <TableHeader>
                    <TableColumn className="w-24">ICON</TableColumn>
                    <TableColumn>HEADING</TableColumn>
                    <TableColumn>DESCRIPTION</TableColumn>
                    <TableColumn>ACTIVITY</TableColumn>
                    <TableColumn>ACTIONS</TableColumn>
                </TableHeader>
                <TableBody emptyContent={"No articles to show"}>
                    {(articles || []).map(article =>
                        <TableRow 
                            key={article.slug}
                        >
                            <TableCell>
                                <Image
                                    alt={article.heading}
                                    className="w-full object-cover object-top aspect-[16/9]"
                                    radius="md"
                                    shadow="none"
                                    disableSkeleton={false}
                                    src={article.cover}
                                />
                            </TableCell>
                            <TableCell>
                                <p className="font-interTight font-medium text-primaryText">{capitalizeText(article.heading)}</p>
                            </TableCell>
                            <TableCell>
                                <p className="font-interTight font-medium text-primaryText">{article.description}</p>
                            </TableCell>
                            <TableCell>
                                <div className="flex flex-row items-center gap-4">
                                    <div className="flex flex-row items-center gap-1">
                                        <div className="h-3 fill-primaryColor">
                                            <ViewIcon />
                                        </div>
                                        <p className="font-interTight font-semibold text-primaryText">{article.views.length}</p>
                                    </div>
                                    <div className="flex flex-row items-center gap-1">
                                        <LikeIcon 
                                            className="w-4 h-4 fill-primaryColor" 
                                            wrapped={false}
                                            stroked={true} 
                                        />
                                        <p className="font-interTight font-semibold text-primaryText">{article.likes.length}</p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="justify-end">
                                <div className="flex flex-row gap-1">
                                    <Tooltip
                                        content='View the article'
                                        closeDelay={0}
                                        classNames={{
                                            content: 'bg-backgroundColor font-interTight font-semibold text-primaryColor'
                                        }}
                                    >
                                        <Button
                                            as='a'
                                            href={`/${article.slug}`}
                                            isIconOnly
                                            className={clsx(
                                                'bg-[transparent]',
                                                'transition-all duration-200',
                                                !article.permissionScope.includes('DELETE') && 'hidden'
                                            )}
                                            size="sm"
                                            variant='light'
                                        >
                                            <div className="h-3 fill-primaryColor">
                                                <ViewIcon />
                                            </div>
                                        </Button>
                                    </Tooltip>
                                    <Tooltip
                                        content='Edit the article'
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
                                                !article.permissionScope.includes('DELETE') && 'hidden'
                                            )}
                                            size="sm"
                                            variant='light'
                                        >
                                            <div className="h-4 fill-primaryColor">
                                                <EditIcon />
                                            </div>
                                        </Button>
                                    </Tooltip>
                                    <Tooltip
                                        content='Delete the article'
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
                                                !article.permissionScope.includes('DELETE') && 'hidden'
                                            )}
                                            onPress={() => deleteArticle(article.id)}
                                            size="sm"
                                            variant='light'
                                        >
                                            <div className="h-4 fill-redColor">
                                                <TrashIcon />
                                            </div>
                                        </Button>
                                    </Tooltip>
                                </div>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}