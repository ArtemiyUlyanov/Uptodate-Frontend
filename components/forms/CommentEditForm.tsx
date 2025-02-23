import { useUploader } from "@/hooks/uploader/useUploader";
import { CommentModel } from "@/models/comment";
import { ApiCommentEditParams, ApiCommentEditResponse, editCommentApi } from "@/services/api/comments.edit.endpoint";
import { urlsToFiles } from "@/utils/file.utils";
import { Button, Card, CardFooter, Tooltip } from "@nextui-org/react";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import clsx from "clsx";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import DefaultButton from "../../ui/buttons/DefaultButton";
import { CloseIcon } from "../../ui/icons/CloseIcon";
import { UploadFileIcon } from "../../ui/icons/UploadFileIcon";
import DefaultTextarea from "../../ui/textareas/DefaultTextarea";

const useEditCommentQuery = (
    params: ApiCommentEditParams,
    opts: Partial<UseQueryOptions<ApiCommentEditResponse>> = {},
) => {
    return useQuery<ApiCommentEditResponse>({
      queryKey: [],
      queryFn: () => editCommentApi(params),
      ...opts,
    });
}

export type CommentEditFormProps = React.HTMLProps<HTMLDivElement> & {
    comment: CommentModel
    setShowEditForm?: Dispatch<SetStateAction<boolean>>
}

export const CommentEditForm: React.FC<CommentEditFormProps> = ({
    comment,
    setShowEditForm,
}) => {
    const [content, setContent] = useState<string>('');
    const [isSent, setIsSent] = useState<boolean>(false);

    const [isQueryEnabled, setIsQueryEnabled] = useState<boolean>(false);
    const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);

    const { selectedFiles, setSelectedFiles, addFile, removeFile, clearFiles, uploader } = useUploader(
        <Tooltip
            content='Upload files (3 max, 8MB limit)'
            closeDelay={0}
            classNames={{
                content: 'bg-backgroundColor font-interTight font-semibold text-primaryColor'
            }}
        >
            <div className={clsx(
                'w-4',
                'transition-all duration-200',
                'hover:opacity-50',
                'active:opacity-50 sm:active:opacity'
            )}>
                <UploadFileIcon className="fill-secondaryColor" />
            </div>
        </Tooltip>
    )

    useEffect(() => {
        if (!isDataLoaded) {
            setContent(comment.content);
        
            urlsToFiles(comment.resources || [])
                .then((files) => setSelectedFiles(files));

            setIsDataLoaded(true);
        }
    }, []);

    const { isFetching, refetch } = useEditCommentQuery(
        {
            id: comment.id,
            content: content,
            resources: selectedFiles
        }, {
            enabled: isQueryEnabled
        }
    );

    const sendForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsQueryEnabled(true);

        refetch()
            .then(response => {
                response.data?.message && setIsSent(true)

                setShowEditForm && setShowEditForm(false);
                setIsQueryEnabled(false);
            });
    } 

    return (
        <form 
            className="flex flex-col w-full gap-2 pt-2 pb-2"
            onSubmit={sendForm}
        >
            {isDataLoaded && !isSent &&
                <>
                    <p className="font-interTight font-semibold text-sm text-secondaryText">Edit a comment</p>
                    <DefaultTextarea
                        placeholder='Start typing here...'
                        customClassName={clsx(
                            'w-full'
                        )}
                        inputClassName='text-base'
                        fullBordered={true}
                        rows={5}
                        maxLength={500}
                        value={content}
                        handleChange={(value) => setContent(value)}
                    />
                    <div className="flex flex-row flex-wrap gap-4">
                        {selectedFiles.map((file, index) => (
                            <Card>
                                <img 
                                    key={index} 
                                    src={URL.createObjectURL(file)} 
                                    alt={`Preview ${index}`} 
                                    className="w-24 h-24 object-cover rounded-lg border"
                                />
                                <CardFooter className="flex flex-row justify-end absolute p-1">
                                    <Button
                                        isIconOnly
                                        className="text-default-400"
                                        size="sm"
                                        variant="flat"
                                        onPress={() => removeFile(file)}
                                    >
                                        <div 
                                            className="w-3 aspect-square"
                                        >
                                            <CloseIcon customClassName="fill-primaryColor" />
                                        </div>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </>
            }
            {isSent && 
                <p className="font-interTight font-medium text-sm text-primaryText">Your comment has been left successfully!</p>
            }
            <div className="flex flex-row items-center gap-4">
                <Tooltip
                    content='Save a comment'
                    closeDelay={0}
                    classNames={{
                        content: 'bg-backgroundColor font-interTight font-semibold text-primaryColor'
                    }}
                >
                    <div>
                        <DefaultButton
                            text='Save'
                            customClassName='font-interTight font-semibold text-sm text-center rounded-md'
                            isLoading={isFetching && isQueryEnabled}
                            isDisabled={content.length <= 0 || isSent}
                            type="submit"
                            size="sm"
                        />
                    </div>
                </Tooltip>
                {uploader}
            </div>
        </form>
    );
}