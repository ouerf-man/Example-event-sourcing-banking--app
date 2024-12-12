export const validateIBAN = (iban: string) => {
    // Simple regex for IBAN validation (can be improved)
    const ibanRegex = /^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/;
    return ibanRegex.test(iban);
}