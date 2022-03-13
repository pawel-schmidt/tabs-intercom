import isBrowser from './utils/isBrowser';
import isLocalStorageAvailable from './utils/isLocalStorageAvailable';

export { default as EventBus } from './EventBus';
export { default as TabsIntercom } from './TabsIntercom';
export { default } from './TabsIntercom';

if (!isBrowser()) {
  console.warn(
    `Browser not detected — TabsIntercom core functions may not working correctly.`
  );
}

if (!isLocalStorageAvailable()) {
  console.warn(
    `Browser's local storage seems to be unavailable — TabsIntercom core functions may not working correctly.`
  );
}
