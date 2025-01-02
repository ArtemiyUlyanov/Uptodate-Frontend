export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    };
    const formattedDate = date.toLocaleDateString('en-GB', options);

    return formattedDate;
}