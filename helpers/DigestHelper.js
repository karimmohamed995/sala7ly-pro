import Sha256 from "./Sha256"
import AsyncStorage from '@react-native-community/async-storage';


export default class DigestHelper {
    static async SetNonce(header){
        let startIndex = header.lastIndexOf('="') + 2;
        let nonce = header.substring(startIndex,startIndex + 64);
        await AsyncStorage.setItem('nonce',nonce);
    }

    static async SetCredentials(email,password){
        password = Sha256.Hash(password).toLowerCase();
        await AsyncStorage.setItem("password", password);
        await AsyncStorage.setItem("email", email); 
    }

    static async GenerateDigest(uri, method){
        let emailOrPhone = await AsyncStorage.getItem("email");
        let password = await AsyncStorage.getItem("password");
        let nonce = await AsyncStorage.getItem("nonce");
        let A1 = Sha256.Hash(`"${emailOrPhone}:SALA7LY:${password}"`);
        let A2 = Sha256.Hash(`"${method}:${uri}"`);
        let token = Sha256.Hash(`"${A1}:${nonce}:${A2}"`);
		return 'Digest emailOrPhone="' + emailOrPhone + '"' + ', nonce="' + nonce + '", token="' + token + '"';
    }
}