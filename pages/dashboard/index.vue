<script setup>
import { ref } from 'vue';

const identityDocument = ref(null);
const birthdate = ref('');
const criminalRecord = ref(null);
const combatProof = ref(null);
const height = ref('');
const weight = ref('');

const submitForm = () => {
  // Logique de soumission du formulaire
  console.log('Formulaire soumis');
};
</script>

<template>
   <SideBar />
  <div class="overflow-y-auto h-lvh py-12 bg-blue/10">
    <div class="mx-auto max-w-lg mt-12 border-none rounded-lg bg-white px-4 py-16 sm:px-6 lg:px-8 ">
      <div class="mx-auto max-w-lg text-center ">
       Dashboard
      </div>
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


</style>
