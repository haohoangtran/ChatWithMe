import {
    AsyncStorage
} from 'react-native';

function savePrefData(key, value = '') {
    AsyncStorage.setItem(key, value);
}

async function getPrefData(key) {
    return AsyncStorage.getItem(key);
}

export {savePrefData, getPrefData}