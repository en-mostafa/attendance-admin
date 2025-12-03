
export const getTime = (value: string) => {
    const date = new Date(value);
    const time = date.toISOString().split("T")[1].split(".")[0];
    return time;
}
