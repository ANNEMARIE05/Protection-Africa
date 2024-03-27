import {useAppwrite} from "./useAppwrite";

type UserTypeLogin = {
    email: string;
    password: string;
  };
  

export const createUser = async (data: userType) => {
    const runtimeConfig = useRuntimeConfig();
    const { database, ID, account } = useAppwrite();
    await account.create(ID.unique(), data.email, data.password, data.nom)
    
};

export const apiLoginUser = async (data: UserTypeLogin) => {

    const runtimeConfig = useRuntimeConfig();
    const { client, account } = useAppwrite();
    const result = await account.createEmailSession(data.email, data.password)
    return await result
   
}

export const getUser = async () => {
    const { client, account } = useAppwrite();
    await account.get()
}