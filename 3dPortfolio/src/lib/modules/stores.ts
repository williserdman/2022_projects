import { writable } from "svelte/store";

let innerA: { type: string; focus: number; minimized: boolean; top: number; left: number }[] = [];
export const openApps = writable(innerA);
