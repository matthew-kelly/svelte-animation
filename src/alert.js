import { writable } from "svelte/store";

export const alert = writable({
  text: 'New Message test',
  isActive: false,
})