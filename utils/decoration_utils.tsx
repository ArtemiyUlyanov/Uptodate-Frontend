import React from "react";
import Link from "next/link";
import { ContentBlockModel } from "@/models/content_block";
import { ImageContentBlock } from "@/ui/content/ImageContentBlock";
import { HeadingContentBlock } from "@/ui/content/HeadingContentBlock";
import { ListContentBlock } from "@/ui/content/ListContentBlock";
import { TextContentBlock } from "@/ui/content/TextContentBlock";

export const parseDecoratedText = (blocks: Array<ContentBlockModel>): Array<React.ReactElement> => {
    return blocks.map((block, index) => {
        if (block.type == 'image') {
            return <ImageContentBlock url={block.text} />
        }

        if (block.type == 'heading') {
            return <HeadingContentBlock>{block.text}</HeadingContentBlock>
        }

        if (block.type == 'list') {
            return <ListContentBlock>{block.text}</ListContentBlock>
        }

        return <TextContentBlock>{block.text}</TextContentBlock>
    });
};
