const getSizeOnMb = (file: string) => {
    const onBytes = Buffer.from(file.substring(file.indexOf(",") + 1));
    const onMb = onBytes.length / 1e6;
    return onMb;
};

const convertToMoney = (value: number) => {
    return new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
    }).format(Number(value));
};

export { getSizeOnMb, convertToMoney };
