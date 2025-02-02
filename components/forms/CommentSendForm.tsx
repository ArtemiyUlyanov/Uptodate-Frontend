import { useUploader } from "@/hooks/uploader/useUploader";
import { ArticleModel } from "@/models/article";
import { ApiCommentCreateParams, ApiCommentCreateResponse, createCommentApi } from "@/services/api/comments.create.endpoint";
import { Button, Card, CardFooter, Tooltip } from "@nextui-org/react";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import clsx from "clsx";
import { useState } from "react";
import DefaultButton from "../../ui/buttons/DefaultButton";
import { CloseIcon } from "../../ui/icons/CloseIcon";
import { UploadFileIcon } from "../../ui/icons/UploadFileIcon";
import DefaultTextarea from "../../ui/textareas/DefaultTextarea";

const useCreateCommentQuery = (
    params: ApiCommentCreateParams,
    opts: Partial<UseQueryOptions<ApiCommentCreateResponse>> = {},
) => {
    return useQuery<ApiCommentCreateResponse>({
      queryKey: [],
      queryFn: () => createCommentApi(params),
      ...opts,
    });
}

export type CommentSendFormProps = React.HTMLProps<HTMLDivElement> & {
    article: ArticleModel,
    updateData?: () => void
}

export const CommentSendForm: React.FC<CommentSendFormProps> = ({
    article,
    updateData
}) => {
    const [content, setContent] = useState<string>('');
    const [isSent, setIsSent] = useState<boolean>(false);
    const [isQueryEnabled, setIsQueryEnabled] = useState<boolean>(false);

    const { selectedFiles, addFile, removeFile, uploader } = useUploader(
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

    const { isFetching, refetch } = useCreateCommentQuery(
        {
            comment: {
                content: content,
                article: article
            },
            files: selectedFiles
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
                updateData && updateData();

                setIsQueryEnabled(false);
            });
    } 

    return (
        <form 
            className="flex flex-col gap-2 pt-2 pb-2"
            onSubmit={sendForm}
        >
            {!isSent &&
                <>
                    <p className="font-interTight font-semibold text-sm text-secondaryText">Leave a comment</p>
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
                        // onInvalid={(e: React.FormEvent<HTMLTextAreaElement>) => handleInputInvalid(e, 'password', translate('common.login.errors.password_field_incorrect'))}
                        // onInput={(e: React.FormEvent<HTMLInputElement>) => handleInput(e, 'password')}
                        // type="password"
                        // required
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
                    content='Send a comment'
                    closeDelay={0}
                    classNames={{
                        content: 'bg-backgroundColor font-interTight font-semibold text-primaryColor'
                    }}
                >
                    <div>
                        <DefaultButton
                            text='Send'
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