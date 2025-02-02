import React from "react";
import Link from "next/link";
import { Decoration } from "@/ui/decorations/decoration.type";
import { DefaultText } from "@/ui/decorations/DefaultText";
import { Heading3Text } from "@/ui/decorations/Heading3Text";
import { Heading2Text } from "@/ui/decorations/Heading2Text";
import { Heading1Text } from "@/ui/decorations/Heading1Text";
import { BoldText } from "@/ui/decorations/BoldText";
import { UnderlinedText } from "@/ui/decorations/UnderlinedText";

const pattern = /(?:^|\n)(###\s([^\n]+))|(?:^|\n)(##\s([^\n]+))|(?:^|\n)(#\s([^\n]+))|(\*([^*]+)\*)|(_([^_]+)_)|\[([^\]]+)\]\(([^)]+)\)/g;

export const parseDecoratedText = (input: string): Decoration[] => {
    const result: Decoration[] = [];
    let match;

    let lastIndex = 0;
    let currentIndex = 0;

    while ((match = pattern.exec(input)) !== null) {
        if (match.index > lastIndex) {
            const textBetween = input.slice(lastIndex, match.index);
            const splitText = textBetween.split('\n');

            splitText.forEach((line, index) => {
                if (index > 0) {
                    result.push(
                        {
                            type: 'breakline',
                            get: () => <br key={currentIndex++} />
                        }
                    );
                }

                result.push(
                    {
                        type: 'default',
                        text: line,
                        get: () => <DefaultText key={currentIndex++}>{line}</DefaultText>
                    }
                );
            });
        }

        if (match[2]) {
            const text = match[2];

            result.push(
                {
                    type: 'heading3',
                    text: text,
                    get: () => <Heading3Text key={currentIndex++}>{text}</Heading3Text>
                }
            );
        } else if (match[4]) {
            const text = match[4];

            result.push(
                {
                    type: 'heading2',
                    text: text,
                    get: () => <Heading2Text key={currentIndex++}>{text}</Heading2Text>
                }
            );
        } else if (match[6]) {
            const text = match[6];

            result.push(
                {
                    type: 'heading1',
                    text: text,
                    get: () => <Heading1Text key={currentIndex++}>{text}</Heading1Text>
                }
            );
        } else if (match[7]) {
            const text = match[8];

            result.push(
                {
                    type: 'bold',
                    text: text,
                    get: () => <BoldText key={currentIndex++}>{text}</BoldText>
                }
            );
        } else if (match[9]) {
            const text = match[10];

            result.push(
                {
                    type: 'underlined',
                    text: text,
                    get: () => <UnderlinedText key={currentIndex++}>{text}</UnderlinedText>
                }
            );
        } else if (match[11]) {
            const url = match[11];
            const text = match[12];

            result.push(
                {
                    type: 'image',
                    text: text,
                    get: () => <Link className="text-primaryText" href={url} key={currentIndex++}>{text}</Link>
                }
            );
        }

        lastIndex = pattern.lastIndex;
    }

    if (lastIndex < input.length) {
        const remainingText = input.slice(lastIndex);
        const remainingLines = remainingText.split('\n');

        remainingLines.forEach((line, index) => {
            if (index > 0) {
                result.push(
                    {
                        type: 'breakline',
                        get: () => <br key={currentIndex++} />
                    }
                );
            }
            
            result.push(
                {
                    type: 'default',
                    text: line,
                    get: () => <DefaultText key={currentIndex++}>{line}</DefaultText>
                }
            );
        });
    }

    return result;
};
