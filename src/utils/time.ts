export function convertTimestampToLocalTime(timestampInSeconds: number): string {
    const date = new Date(timestampInSeconds * 1000);
    return date.toLocaleString();
}

export function formatTimestamp(timestamp: number): string {
    if (!timestamp) return '-';
    const date = new Date(timestamp * 1000); // 转毫秒
    return date.toLocaleString();
};