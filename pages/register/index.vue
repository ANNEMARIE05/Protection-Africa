<script setup>
import { ref } from 'vue';
import { createUser } from './../composables/createUser';
import { useRouter } from 'vue-router';

const router = useRouter();

const dataUserRegister = ref({
  nom: '',
  email: '',
  password: '',
  confirmPassword: '',
});

const loading = ref(false);
const showPopup = ref(false);
const showErrorPopup = ref(false);
const showUserExistsPopup = ref(false);

const submitForm = async () => {
  loading.value = true;

  if(dataUserRegister.value.nom === '' || dataUserRegister.value.email === '' || dataUserRegister.value.password === '' || dataUserRegister.value.confirmPassword === '') {
    showErrorPopup.value = true;
    loading.value = false;
    return;
  }

  try {
    // Création de l'utilisateur
    const userData = {
      nom: dataUserRegister.value.nom,
      email: dataUserRegister.value.email,
      password: dataUserRegister.value.password
    };

    const response = await createUser(userData);
    console.log('response', response);
    showPopup.value = true;
  } catch (error) {
    console.log(error);

    if (error.message.includes('A user with the same id, email, or phone already exists')) {
      showUserExistsPopup.value = true;
    }
  } finally {
    loading.value = false;
  }
};

const closePopup = () => {
  showPopup.value = false;
};

const closeErrorPopup = () => {
  showErrorPopup.value = false;
};

const closeUserExistsPopup = () => {
  showUserExistsPopup.value = false;
};

const continueToLogin = () => {
  showPopup.value = false;
  router.push("/login");
};
</script>

<template>
  <section class="bg-white">
    <div class="lg:grid lg:min-h-screen lg:grid-cols-12">
      <section class="relative flex items-end h-32 bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
        <img alt="" src="https://media.istockphoto.com/id/1495606650/vector/isometric-3d-locked-padlock-with-a-password-lock-and-pin-code-entry-security-and-safety.jpg?s=612x612&w=0&k=20&c=TxBjeNOohtOqhAOnG6xuXWbpSswPMgNWNVnJeJ_zXWc=" class="absolute inset-0 object-cover w-full h-full opacity-80" />

        <div class="hidden lg:relative lg:block lg:p-12">
          <ProtectAfrica />
          <p class="mt-4 leading-relaxed text-white/90">Veuillez vous inscrire pour avoir un compte sur notre application</p>
        </div>
      </section>

      <main class="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
        <div class="max-w-xl lg:max-w-3xl">
          <form action="#" class="grid grid-cols-6 gap-6 mt-8" @submit.prevent="submitForm">
            <div class="col-span-6">
              <Input v-model="dataUserRegister.nom" inputType="text" placeholder="Entrez votre nom et prénom" />
            </div>

            <div class="col-span-6">
              <Input v-model="dataUserRegister.email" placeholder="Entrez un email" inputType="email" />
            </div>

            <div class="col-span-6 sm:col-span-3">
              <Input v-model="dataUserRegister.password" placeholder="Entrez votre mot de passe" inputType="password" />
            </div>

            <div class="col-span-6 sm:col-span-3">
              <Input v-model="dataUserRegister.confirmPassword" placeholder="Confirmez votre mot de passe" inputType="password" />
            </div>

            <div class="col-span-6">
              <label for="MarketingAccept" class="flex gap-4">
                <input type="checkbox" id="MarketingAccept" name="marketing_accept" class="size-5 rounded-md border-gray-200 bg-white shadow-sm" />
                <span class="text-sm text-gray-700">Je souhaite recevoir des e-mails concernant les événements, les mises à jour et les annonces de l'entreprise.</span>
              </label>
            </div>

            <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
              <button @click="submitForm" :class="buttonClasses" :disabled="loading" class="text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500 rounded border border-indigo-600 bg-indigo-600 px-5 py-2.5 cursor-pointer">
                <span v-if="!loading">Inscription</span>
                <div v-else class="loader"></div>
              </button>
              <p class="mt-4 text-sm text-gray-500 sm:mt-0">Avez-vous un compte? <NuxtLink to="/login" class="text-gray-700 underline">Connectez-vous</NuxtLink>.</p>
            </div>
          </form>
        </div>
      </main>
    </div>

    <!-- Popup pour l'inscription réussie -->
    <div v-if="showPopup" class="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-8 rounded-lg shadow-lg">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold">Inscription réussie</h2>
          <button @click="closePopup" class="text-gray-500 hover:text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p>Votre inscription a été réussie. Voulez-vous vous connecter ?</p>
        <div class="mt-4 flex justify-end">
          <button @click="continueToLogin" class="text-sm text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-4 py-2.5">Se connecter</button>
        </div>
      </div>
    </div>
    <!-- Fin Popup -->

    <!-- Popup pour les champs non remplis -->
    <div v-if="showErrorPopup" class="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-8 rounded-lg shadow-lg">
        <h2 class="text-lg font-semibold mb-4">Veuillez remplir tous les champs</h2>
        <button @click="closeErrorPopup" class="text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500 rounded border border-indigo-600 bg-indigo-600 px-5 py-2.5">OK</button>
      </div>
    </div>
    <!-- Fin Popup -->

    <!-- Popup pour l'utilisateur déjà existant -->
    <div v-if="showUserExistsPopup" class="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-8 rounded-lg shadow-lg">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold">Utilisateur déjà existant</h2>
          <button @click="closeUserExistsPopup" class="text-gray-500 hover:text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p>L'utilisateur existe déjà dans la base de données.</p>
        <div class="mt-4 flex justify-end">
          <button @click="closeUserExistsPopup" class="text-sm text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-4 py-2.5">OK</button>
        </div>
      </div>
    </div>
    <!-- Fin Popup -->
  </section>
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
</style>


  beninFlag: '/Flag_of_Benin.svg.png',
  bf:'images.png',
  ciFlag:'/Flag_of_Côte_d\'Ivoire.svg.png',
  ghanaFlag:'Flag_of_Ghana.png',
  maliFlag:'mali-flag-png-xl.png',
  togoFlag:'Flag_of_Togo.svg.png',
}) -->