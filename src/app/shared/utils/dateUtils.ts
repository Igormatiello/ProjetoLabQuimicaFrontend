export function toBrasilianDate(data: Date): string {
    return data.toLocaleDateString("pt-BR");
}

export function removeDays(date: Date, days: number): Date {
    date.setDate(date.getDate() - days);
    return date;
}
