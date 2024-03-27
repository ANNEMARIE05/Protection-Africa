<script setup>
import { ref } from 'vue';
import { apiLoginUser } from "./../composables/createUser";
import { useRouter } from "vue-router"; 

const router = useRouter(); 

const dataUser = ref({
  email: "",
  password: "",
});

const showPopup = ref(false);
const showSuccessPopup = ref(false);
const loading = ref(false);

const errorMessage = ref(""); // Nouvelle référence pour le message d'erreur

const submitLoginForm = async (e) => {
  e.preventDefault(); 
  loading.value = true;
  errorMessage.value = ""; // Réinitialisation du message d'erreur à chaque soumission du formulaire

  if(dataUser.value.email === '' || dataUser.value.password === '') {
    showPopup.value = true; 
    loading.value = false;
    return;
  }

  const userData = {
    email: dataUser.value.email,
    password: dataUser.value.password
  }

  try {
    const response = await apiLoginUser(userData);
    const getUserId = response.userId;

    // Vérifiez si l'ID de l'utilisateur est disponible
    if (getUserId) {
      // Stocker l'ID de l'utilisateur dans localStorage
      sessionStorage.setItem('userId', getUserId);
      showSuccessPopup.value = true;
      loading.value = false;
    } else {
      throw new Error('ID utilisateur non disponible');
    }

  } catch (error) {
    console.log(error); 

    if (error.message.includes('password')) {
      errorMessage.value = "Mot de passe incorrect"; // Affichage du message d'erreur pour un mot de passe incorrect
    } else if (error.message.includes('email')) {
      errorMessage.value = "Email incorrect"; // Affichage du message d'erreur pour un email incorrect
    } else {
      alert('Une erreur s\'est produite. Veuillez réessayer plus tard.');
    }
  }
}


const closePopup = () => {
  showPopup.value = false;
}

const closeSuccessPopup = () => {
  showSuccessPopup.value = false;
}

const continueToProfile = () => {
  showSuccessPopup.value = false;
  // Naviguer vers la page profil
  router.push("/profile");
}
</script>



<template>
  <section class="relative flex flex-wrap lg:h-screen lg:items-center">
    <div class="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
      <div class="max-w-lg mx-auto text-center">
        <ProtectAfrica />
        <p class="mt-4 text-gray-500">
          Veuillez vous connecter pour avoir accès à nos services
        </p>
      </div>

      <form action="#" class="max-w-md mx-auto mt-8 mb-0 space-y-4">
        <div>
          <label for="email" class="sr-only">Email</label>
          <Input v-model="dataUser.email" inputType="email" placeholder="Entrez votre email"/>
          <p v-if="errorMessage.includes('Email')" class="text-red-500">{{ errorMessage }}</p> <!-- Affichage du message d'erreur -->
        </div>

        <div>
          <label for="password" class="sr-only">Password</label>
          <Input v-model="dataUser.password" inputType="password" placeholder="Entrez votre mot de passe"/>
          <p v-if="errorMessage.includes('Mot de passe')" class="text-red-500">{{ errorMessage }}</p> <!-- Affichage du message d'erreur -->
        </div>

        <div class="flex items-center justify-between">
          <p class="text-sm text-gray-500">
            Pas de compte?
            <NuxtLink to="/register"
              ><a class="underline" href="#">Créer un compte</a></NuxtLink
            >
          </p>

          <button @click="submitLoginForm" :class="buttonClasses" :disabled="loading" class="text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500 rounded border border-indigo-600 bg-indigo-600 px-5 py-2.5 cursor-pointer">
            <span v-if="!loading">Connexion</span>
            <div v-else class="loader"></div>
          </button>
        </div>
      </form>
    </div>

    <div class="relative w-full h-64 sm:h-96 lg:h-full lg:w-1/2">
      <img
        alt=""
        src="https://media.istockphoto.com/id/1495432480/fr/vectoriel/cadenas-verrouill%C3%A9-3d-avec-un-mot-de-passe-verrouiller-et-saisir-le-code-pin-s%C3%A9curit%C3%A9-et.jpg?s=612x612&w=0&k=20&c=YaZ9nTFHZDTGJVsEdlHWPJTwUqm_gkTuueWpkpPtoY8="
        class="absolute inset-0 object-cover w-full h-full"
      />
    </div>

    <!-- Popup -->
    <div v-if="showPopup" class="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-8 rounded-lg shadow-lg">
        <h2 class="text-lg font-semibold mb-4">Veuillez remplir les champs</h2>
        <button @click="closePopup" class="text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500 rounded border border-indigo-600 bg-indigo-600 px-5 py-2.5 cursor-pointer">OK</button>
      </div>
    </div>
    <!-- Fin Popup -->

    <!-- Popup pour la connexion réussie -->
    <div v-if="showSuccessPopup" class="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-8 rounded-lg shadow-lg">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold">Connexion réussie</h2>
          <button @click="closeSuccessPopup" class="text-gray-500 hover:text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p>Votre connexion a été réussie. Voulez-vous continuer?</p>
        <div class="mt-4 flex justify-end">
          <button @click="continueToProfile" class="text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500 rounded border border-indigo-600 bg-indigo-600 px-5 py-2.5 cursor-pointer">Continuer</button>
        </div>
      </div>
    </div>
    <!-- Fin Popup pour la connexion réussie -->
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