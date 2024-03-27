<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAppwrite } from './../composables/useAppwrite';

const router = useRouter();
const loading = ref(false);
const selectedCountry = ref('');
const phoneNumber = ref('');
const countries = ref([]);
const val = ref('');
const userId = ref(null);
const showErrorPopup = ref(false); // Variable pour contrôler la visibilité du popup d'erreur



onMounted(() => {
  const val = sessionStorage.getItem('userId');
  userId.value = val;
  console.log("userId.value", userId.value);

  getAllCountries();
  
});



const getAllCountries = async () => {
  try {
    const runtimeConfig = useRuntimeConfig();
    const { database } = useAppwrite();
    const documents = await database.listDocuments(
      runtimeConfig.public.DATABASE_ID,
      runtimeConfig.public.COLLECTION_PAYS
    );
    
    countries.value = documents.documents.map(doc => ({
      country: doc.country,
      indicatifTelephonique: doc.indicatifTelephonique,
      flag: doc.flag
    }));
    console.log('Pays récupérés :', countries.value);
  } catch (error) {
    console.error('Erreur lors de la récupération des pays :', error);
  }
};

const submitForm = async () => {
  loading.value = true
  console.log("val2", val);
  try {
    const clientId = userId.value;
    const country = selectedCountry.value;
    const phoneNumberValue = phoneNumber.value;
    if (!isInteger(phoneNumberValue) || phoneNumberValue.length !== 10) {
      // Afficher le popup d'erreur si la validation échoue
      showErrorPopup.value = true;
      loading.value = false
      return; // Arrêter le processus d'enregistrement
    }
    await recupInformation(country, phoneNumberValue, clientId);
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement des données:', error);
  }
};

const redirectToDashboard = () => {
  router.push('/dashboard');
};

const logout = () => {
  router.push('/login');
};

const recupInformation = async (country, phoneNumber, clientId) => {

  try {
    const runtimeConfig = useRuntimeConfig();
    const { database,ID } = useAppwrite();
    const data = {
    client_id: clientId,
    country_valeur: country,
    phone_Number: phoneNumber,
  };
    console.log("clientId",clientId,
    "country",country,
    "phoneNumber",phoneNumber
    );
    // Enregistrer les données dans la base de données
    console.log("data",data)
    const response = await database.createDocument(
      runtimeConfig.public.DATABASE_ID,
      runtimeConfig.public.COLLECTION_PROFILE,
      ID.unique(),  
     data
    );

    console.log('Données enregistrées avec succès', response);
    
    // Redirection vers le tableau de bord
    redirectToDashboard();
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement des données:', error);
  }
};


const getPhoneCode = (country) => {
  const selected = countries.value.find(item => item.country === country);
  return selected ? selected.indicatifTelephonique : '';
};

const getCountryDisplay = (country) => {
  return `${country.flag} ${country.country}`;
};

const isInteger = (value) => {
  return /^\d+$/.test(value);
};
</script>

<template>
  <div class="overflow-hidden h-lvh py-12 bg-blue/10">
    <div class="mx-auto max-w-lg mt-12 border-none rounded-lg bg-white px-4 py-16 sm:px-6 lg:px-8 ">
      <div class="mx-auto max-w-lg text-center">
        <h1 class="text-3xl font-bold text-indigo-600 sm:text-2xl uppercase ">Vérification des informations</h1>
        <p class="mt-4 text-black text-">
          Entrez votre pays et aussi votre numéro de téléphone pour qu'on puisse vous tenir informé des changements.
        </p>
      </div>

      <form @submit.prevent="submitForm" class="mx-auto mb-0 mt-8 max-w-md space-y-4">
        <div>
          <div class="relative">
            <select v-model="selectedCountry" class="py-3 text-base w-full font-medium px-7 text-dark dark:text-black focus:outline-none custom-input">
              <option disabled selected value="">Sélectionnez un pays</option>
              <option v-for="country in countries" :key="country.country" :value="country.country">
                <img :src="country.flag" :alt="country.country" :title="country.country" style="width: 20px; height: 20px;">
                {{ country.country }}
              </option>
            </select>
          </div>
        </div>

        <div v-if="selectedCountry" class="flex items-center">
          <Input class="w-full"
            :modelValue="phoneNumber"
            @update:modelValue="phoneNumber = $event"
            :placeholder="`(${getPhoneCode(selectedCountry)}) Entrez votre numéro de téléphone`"
          />
        </div>

        <div class="items-center">
          <button type="submit" :class="buttonClasses" :disabled="loading" class="text-sm w-full mb-2 font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500 rounded border border-indigo-600 bg-indigo-600 px-5 py-2.5 cursor-pointer">
            <span v-if="!loading">Valider</span>
            <div v-else class="loader"></div>
          </button>
          <button type="button" @click="logout" class="border border-indigo-700 text-sm w-full font-medium text-indigo-700 rounded-md hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500 px-5 py-2.5">Se déconnecter</button>
        </div>

        <!-- Popup d'erreur -->
        <div v-if="showErrorPopup" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div class="bg-white p-8 rounded-lg">
            <p class="text-red-500 mb-4">Erreur : un numéro de téléphone doit contenir 10 chiffres.</p>
            <button @click="showErrorPopup = false" class="text-gray-500 hover:text-red-500 focus:outline-none">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

      </form>
    </div>
  </div>
</template>

<style scoped>
.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 2s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.custom-input {
  border: 1px solid rgba(0, 0, 0, 0);
  border-radius: 7px;

  background-color: rgb(247, 247, 231);
  color: black;
}

.custom-input:focus {
  border: 1px solid #667EEA;
}

.custom-input:focus {
  color: black;
  background-color: white;
}
</style>
