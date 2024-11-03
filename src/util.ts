export function clamp(num: number, min: number, max: number): number {
    return Math.min(Math.max(min, num), max);
}