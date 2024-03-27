import {useAppwrite} from "./useAppwrite";

export const getAllUser = async () => {
    const runtimeConfig = useRuntimeConfig();
    const { database } = useAppwrite();
    await database.listDocuments(
        runtimeConfig.public.DATABASE_ID as string,
        runtimeConfig.public.COLLECTION_ID as string
    );
};