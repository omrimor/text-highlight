const KEY = '__editorData';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(KEY);
    if (serializedState === null) {
      return {};
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.log('thrown from serializedState: ',err);
    return undefined;
  }
};

export const saveState = data => {
  try {
    const serializedState = JSON.stringify(data);
    localStorage.setItem(KEY, serializedState);
  } catch (err) {
    console.error(`could not save to localStorage; ${err}`);
  }
};

export const deleteState = () => {
  localStorage.removeItem(KEY);
};
