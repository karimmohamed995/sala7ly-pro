import AsyncStorage from "@react-native-community/async-storage";

export default class StorageHelper {
    static async setUser(user){
        await AsyncStorage.setItem('user',JSON.stringify(user));
    }

    static async getUser(){
        return  JSON.parse(await AsyncStorage.getItem('user'));
    }

    static async setLocationArray(latLongArray){
        await AsyncStorage.setItem('locationArray',JSON.stringify(latLongArray));
    }

    static async getLocationArray(){
        return  JSON.parse(await AsyncStorage.getItem('locationArray'));
    }

    static async setLocationName(locationName){
        await AsyncStorage.setItem('locationName',JSON.stringify(locationName));
    }

    static async getLocationName(){
        return  JSON.parse(await AsyncStorage.getItem('locationName'));
    }
}