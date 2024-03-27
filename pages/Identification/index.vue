<template>
  <div>
    <SideBar />
    <div class="overflow-y-auto h-lvh w-full bg-blue/10">
      <div class="flex justify-center ml-12 mt-10 mb-12 border-none rounded-lg">
        <div class="w-2/3 bg-white border-none rounded-lg">
          <div class="text-center ">
            <h1 class="text-3xl font-bold mt-10 text-indigo-600 sm:text-2xl uppercase">Formulaire d'identité</h1>
            <p class="mt-4 text-black text-">Veuillez remplir les informations suivantes :</p>
          </div>

          <form class="mx-auto mb-0 mt-8 max-w-md space-y-4" @submit.prevent="submitForm">
            <div class="file-upload">
              <div class="drag-drop-area" @dragover.prevent @drop="handleIdentityDocumentDrop">
                <div class="icon">
                  <i class="fas fa-cloud-upload-alt"></i>
                </div>
                <div class="instructions">
                  <p>Drag & drop your files here or</p>
                  <input type="file" @change="handleIdentityDocumentUpload" accept=".png">
                  <button @click="browseFiles">Choose files</button>
                </div>
              </div>
              <div class="file-list">
                <h3>Uploaded Files</h3>
                <ul>
                  <li v-for="file in uploadedFiles" :key="file.name">
                    {{ file.name }} <span v-if="file.uploadStatus === 'failed'" class="upload-failed">(Upload Failed)</span>
                  </li>
                </ul>
              </div>
            </div>
            <!-- Date de naissance -->
            <div>
              <input v-model="birthdate" class="w-full bg-black/10 p-3" type="date" placeholder="Date de naissance" />
            </div>
            <!-- Casier judiciaire -->
            <div class="file-upload">
              <div class="drag-drop-area" @dragover.prevent @drop="handleCriminalRecordDrop">
                <div class="icon">
                  <i class="fas fa-cloud-upload-alt"></i>
                </div>
                <div class="instructions">
                  <p>Drag & drop your files here or</p>
                  <input type="file" @change="handleCriminalRecordUpload" accept=".png">
                  <button @click="browseFiles">Choose files</button>
                </div>
              </div>
              <div class="file-list">
                <h3>Uploaded Files</h3>
                <ul>
                  <li v-for="file in uploadedFiles" :key="file.name">
                    {{ file.name }} <span v-if="file.uploadStatus === 'failed'" class="upload-failed">(Upload Failed)</span>
                  </li>
                </ul>
              </div>
            </div>
            <!-- Preuve de pratique de technique de combat -->
            <div class="file-upload">
              <div class="drag-drop-area" @dragover.prevent @drop="handleCombatProofDrop">
                <div class="icon">
                  <i class="fas fa-cloud-upload-alt"></i>
                </div>
                <div class="instructions">
                  <p>Drag & drop your files here or</p>
                  <input type="file" @change="handleCombatProofUpload" accept=".png">
                  <button @click="browseFiles">Choose files</button>
                </div>
              </div>
              <div class="file-list">
                <h3>Uploaded Files</h3>
                <ul>
                  <li v-for="file in uploadedFiles" :key="file.name">
                    {{ file.name }} <span v-if="file.uploadStatus === 'failed'" class="upload-failed">(Upload Failed)</span>
                  </li>
                </ul>
              </div>
            </div>
            <!-- Taille -->
            <div>
              <input v-model="height" class="w-full bg-black/10 p-3" placeholder="Taille (cm)" />
            </div>
            <!-- Poids -->
            <div>
              <input v-model="weight" class="w-full bg-black/10 p-3" placeholder="Poids (kg)" />
            </div>
            <!-- Bouton de soumission -->
            <div class="items-center">
              <button type="submit" class="text-sm w-full mb-2 font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500 rounded border border-indigo-600 bg-indigo-600 px-5 py-2.5 cursor-pointer">Soumettre</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const birthdate = ref('');
const height = ref('');
const weight = ref('');
const uploadedFiles = ref([]);

const handleIdentityDocumentDrop = (event) => {
  event.preventDefault();
  const files = event.dataTransfer.files;
  handleFiles(files);
};

const handleIdentityDocumentUpload = (event) => {
  const files = event.target.files;
  handleFiles(files);
};

const handleCriminalRecordDrop = (event) => {
  event.preventDefault();
  const files = event.dataTransfer.files;
  handleFiles(files);
};

const handleCriminalRecordUpload = (event) => {
  const files = event.target.files;
  handleFiles(files);
};

const handleCombatProofDrop = (event) => {
  event.preventDefault();
  const files = event.dataTransfer.files;
  handleFiles(files);
};

const handleCombatProofUpload = (event) => {
  const files = event.target.files;
  handleFiles(files);
};

const handleFiles = (files) => {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (file.size <= 500 * 1024 && file.type === 'image/png') {
      uploadedFiles.value.push({ name: file.name, uploadStatus: 'success' });
      // Perform file upload logic here
    } else {
      uploadedFiles.value.push({ name: file.name, uploadStatus: 'failed' });
    }
  }
};

const browseFiles = () => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = '.png';
  fileInput.click();
  fileInput.addEventListener('change', (event) => {
    handleFiles(event.target.files);
  });
};

const submitForm = () => {
  // Logique de soumission du formulaire
  console.log('Formulaire soumis');
};
</script>

<style scoped>
/* Styles pour le fichier upload */
.file-upload {
  margin: 20px;
}

.drag-drop-area {
  border: 2px dashed #ccc;
  padding: 20px;
  text-align: center;
}

.icon {
  font-size: 48px;
  margin-bottom: 10px;
}

.instructions {
  color: #666;
}

.instructions button {
  margin-top: 10px;
}

.file-list {
  margin-top: 20px;
}

.upload-failed {
  color: red;
}
</style>

