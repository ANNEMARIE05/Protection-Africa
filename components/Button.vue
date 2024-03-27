<script setup>
import { useRouter } from 'vue-router'
import { defineProps } from "vue";

const props = defineProps({
  valueLabel: String,
});

const router = useRouter()

const redirectToLogin = () => {
  if (props.valueLabel === "Se connecter") {
      router.push('/login');
  } else {
      router.push('/register');
  }
};

// Déterminer la classe CSS en fonction de la valeur du bouton
const getButtonStyle = () => {
  if (props.valueLabel === "S'inscrire") {
    return "border border-indigo-600 bg-indigo-600 text-sm font-medium text-white rounded-md hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500";
  } else if (props.valueLabel === "Se connecter") {
    return "border border-indigo-600 ml-2 text-sm font-medium text-indigo-600 rounded-md hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500";
  } else {
    return "border border-indigo-600 text-sm font-medium text-white rounded-md bg-primary hover:bg-blue-dark focus:outline-none focus:ring";
  }
};
</script>

<template>
  <a
    :class="getButtonStyle()"
    @click="redirectToLogin()"
    style="padding: 0.75rem 1.75rem;"
  >
    {{ props.valueLabel }}
  </a>
</template>
