type userType = {
    nom: string,
    email: string,
    password: string,
  };
  
  export const createUser = async (data: userType) => {
      const { database, ID } = useAppwrite();
      const runtimeConfig = useRuntimeConfig();
      await database.createDocument(
          runtimeConfig.public.DATABASE_ID as string,
          runtimeConfig.public.COLLECTION_ID as string,
          ID.unique(),
          data
      );
  };
  
  export const getAllUser = async () => {
      const { database } = useAppwrite();
      const runtimeConfig = useRuntimeConfig();
      await database.listDocuments(
          runtimeConfig.public.DATABASE_ID as string,
          runtimeConfig.public.COLLECTION_ID as string
      );
  };
  
  export const getAllCountries = async () => {
      const { database } = useAppwrite();
      const runtimeConfig = useRuntimeConfig();
      return await database.listDocuments(
          runtimeConfig.public.DATABASE_ID as string,
          runtimeConfig.public.COLLECTION_ID as string,
      );
  };