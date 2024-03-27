{/* <script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAppwrite } from './../composables/useAppwrite';
import { getAllUser, createUser } from './../composables/appwrite';

const route = useRoute();
const router = useRouter();
const selectedCountry = ref('');
const phoneNumber = ref('');
const showSuccessPopup = ref(false);
const countries = ref([]);
const userId = ref(null);

onMounted(() => {
  // Obtenez l'URL actuelle
  const currentUrl = window.location.href;
  const urlParams = currentUrl.split('?')[1];
  const valeurId = urlParams.replace("id=", "")
  userId.value = valeurId;

  getAllCountries();
});

const getAllCountries = async () => {
  try {
    const { database } = useAppwrite();
    const runtimeConfig = useRuntimeConfig();
    const documents = await database.listDocuments(
      runtimeConfig.public.DATABASE_ID,
      runtimeConfig.public.COLLECTION_PAYS
    );
    
    // Mise à jour des pays avec les données récupérées
    countries.value = documents.documents.map(doc => ({
      country: doc.country,
      indicatifTelephonique: doc.indicatifTelephonique,
      flag: doc.flag // Ajouter le champ pour le drapeau
    }));
    
    console.log('Pays récupérés :', countries.value);
  } catch (error) {
    console.error('Erreur lors de la récupération des pays :', error);
  }
};

const submitForm = async () => {
  try {
    const clientId = userId.value; // Utiliser l'ID récupéré de l'URL comme clientId
    console.log("Client ID:", clientId);

    // Enregistrement des données utilisateur
    await createUser({ clientId, country: selectedCountry.value, phoneNumber: phoneNumber.value });
    
    // Réinitialisation des champs
    selectedCountry.value = '';
    phoneNumber.value = '';
    showSuccessPopup.value = true;
    
    // Redirection vers le tableau de bord
    redirectToDashboard();

  } catch (error) {
    console.error('Erreur lors de l\'enregistrement des données:', error);
  }
};

const logout = () => {
  router.push('/login');
  console.log('Se déconnecter...');
};

const redirectToDashboard = () => {
  router.push('/dashboard');
};

const recupInformation = (country) => {
  const client_id = userId.value
  const recupLesValeurs = countries.value.find(item => item.country === country);
  const phone_Number = recupLesValeurs.indicatifTelephonique +` ` + phoneNumber.value
  const valeurCountry = recupLesValeurs.country
  console.log("phone_Number", phone_Number);
  console.log("valeurCountry", valeurCountry);
  console.log("client_id", client_id); 
};

// Fonction pour obtenir l'indicatif téléphonique en fonction du pays sélectionné
const getPhoneCode = (country) => {
  const selected = countries.value.find(item => item.country === country);
  return selected ? selected.indicatifTelephonique : '';
};

// Fonction pour afficher le pays avec le drapeau
const getCountryDisplay = (country) => {
  return `${country.flag} ${country.country}`;
};
</script>

<template>
  <div class="overflow-hidden h-lvh py-12 bg-black/10">
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
          <button type="submit" @click="recupInformation(selectedCountry, userId.value)" class="text-sm w-full mb-2 font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500 rounded border border-indigo-600 bg-indigo-600 px-5 py-2.5 cursor-pointer">Valider</button>
          <button type="button" @click="logout" class="border border-indigo-700 text-sm w-full font-medium text-indigo-700 rounded-md hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500 px-5 py-2.5">Se déconnecter</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
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
</style> */}
