import clsx from "clsx";

export const splitTextBySubtexts = (text: string, subtexts: string[]) => {
    let regex = new RegExp(`(${subtexts.join('|')})`, 'gi');
    return text.split(regex);
}

export const splitQueryText = (text: string, query: string, className?: string) => {
    return splitTextBySubtexts(text, [query]).map(part =>
        (query.length > 0 && part.toLowerCase() === query.toLowerCase()) ?
            <span className={clsx(
                className
            )}>{part}</span>
        :
            part
    );
}

export const capitalizeText = (text: string) => {
    return text.replace(/\b\w|(?<=')\w/g, char => char.toUpperCase());
}