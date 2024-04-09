const getSizeOnMb = (file: string) => {
    const onBytes = Buffer.from(file.substring(file.indexOf(",") + 1));
    const onMb = onBytes.length / 1e6;
    return onMb;
};

export { getSizeOnMb };
