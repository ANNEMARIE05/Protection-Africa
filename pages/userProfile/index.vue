<template>
  <SideBar />
  <div class="overflow-y-auto h-lvh w-full bg-blue/10">
      <div class="flex justify-center ml-12 mt-10 mb-12 border-none rounded-lg">
        <div class="w-2/3 bg-white border-none rounded-lg">
          <div class="text-center ">
            <h1 class="text-3xl font-bold mt-10 text-indigo-600 sm:text-2xl uppercase">Formulaire d'identité</h1>
            <p class="mt-4 text-black text-">Veuillez remplir les informations suivantes :</p>
          </div>
          <form @submit.prevent="submitForm" class="mt-8 space-y-4">
  
          <!-- Prix par heure (jour) -->
          <div>
            <label for="priceDay" class="block text-sm font-medium text-gray-700">Prix par heure (jour)</label>
            <input type="number" id="priceDay" v-model="priceDay" placeholder="Prix par heure (jour)" class="py-3 px-4 block w-full rounded-md border-gray-300 mt-1">
          </div>
  
          <!-- Prix par heure (nuit) -->
          <div>
            <label for="priceNight" class="block text-sm font-medium text-gray-700">Prix par heure (nuit)</label>
            <input type="number" id="priceNight" v-model="priceNight" placeholder="Prix par heure (nuit)" class="py-3 px-4 block w-full rounded-md border-gray-300 mt-1">
          </div>
  
          <!-- Bouton de soumission -->
          <div class="mt-6">
            <button type="submit" class="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Soumettre
            </button>
          </div>
  
        </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  </script>
  
  <style scoped>
  /* Styles spécifiques au formulaire vont ici */
  </style>
  