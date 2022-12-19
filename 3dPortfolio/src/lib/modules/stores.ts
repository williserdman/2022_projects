import { writable } from "svelte/store";

let innerA: { type: string; focus: number; minimized: boolean }[] = [];
export const openApps = writable(innerA);
