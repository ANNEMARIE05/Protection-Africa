import { Client, Account, Databases, ID } from 'appwrite';

const useAppwrite = () => {
    const runtimeConfig = useRuntimeConfig();
    const client = new Client();
    client
        .setEndpoint(runtimeConfig.public.APPWRITE_URL)
        .setProject(runtimeConfig.public.PROJECT_ID);

    const database = new Databases(client);
    const account = new Account(client);
    return { client, account, ID, database };
};

export { useAppwrite }; 