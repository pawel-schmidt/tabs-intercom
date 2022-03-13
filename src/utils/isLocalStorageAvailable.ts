/**
 * Based on MDN's [Using the Web Storage API > Feature-detecting localStorage > Testing for availability]{@link https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#testing_for_availability }
 */
export default function isLocalStorageAvailable(): boolean {
  let storage;
  try {
    storage = window.localStorage;
    const testItem = '__storage_test__';
    storage.setItem(testItem, testItem);
    storage.removeItem(testItem);
    return true;
  } catch (error) {
    return (
      error instanceof DOMException &&
      // everything except Firefox
      (error.code === 22 ||
        // Firefox
        error.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        error.name === 'QuotaExceededError' ||
        // Firefox
        error.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      typeof storage !== 'undefined' &&
      storage.length !== 0
    );
  }
}
