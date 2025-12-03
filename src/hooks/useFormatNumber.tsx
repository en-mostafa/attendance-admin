export const useFormatNumber = (value: any) => {
    return new Intl.NumberFormat().format(value)
}