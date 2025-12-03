
export const useFormatDate = (date: any) => {
    const timestamp = date?.unix;
    const dateTime: any = new Date(timestamp * 1000);
    const year = dateTime.getFullYear().toString();
    const month = (dateTime.getMonth() + 1).toString().padStart(2, '0')
    const day = dateTime.getDate().toString().padStart(2, '0');
    let formattedDate;
    if(! isNaN(dateTime)) {
        formattedDate = `${year}-${month}-${day}`
    } else {
        formattedDate =''
    }
    
    return formattedDate
}