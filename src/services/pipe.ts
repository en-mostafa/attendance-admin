import IMask from "imask";

export const pipe = IMask.createPipe({
    mask: Number,
    scale: 0,
    thousandsSeparator: ',',
    normalizeZeros: true,
    padFractionalZeros: true,
});

export const pipeNumber = (value: number) => Intl.NumberFormat().format(value)