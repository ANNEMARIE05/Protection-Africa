<template>
  <div :class="sidebarClasses" @click="toggleSidebar">
    <div class="logo-details ">
      <div class="logo_name p-2 ">Protect Africa</div>
      <i class="bx bx-menu" id="btn"></i>
    </div>
    <ul class="nav-list">
      <li v-for="(menuItem, index) in menuItems" :key="index" :class="{ active: isActive(menuItem.to) }">
        <NuxtLink :to="menuItem.to">
          <i :class="menuItem.iconClass"></i> <!-- Icône ici -->
          <span class="links_name"  :class="{ 'hidden': isSidebarOpen }">{{ menuItem.text }}</span>
        </NuxtLink>
        <span class="tooltip">{{ menuItem.text }}</span>
      </li>
    </ul>
  </div>
</template>


<script>
export default {
  data() {
    return {
      isSidebarOpen: false,
      menuItems: [
        { iconClass: "bx bx-grid-alt", text: "Dashboard", to: "/dashboard" },
        { iconClass: "bx bxs-contact", text: "Identification", to: "/identification" },
        { iconClass: "bx bxs-credit-card", text: "Tarification", to: "/tarification" },
        { iconClass: "bx bx-user", text: "Profile", to: "/userProfile" },
        { iconClass: "bx bx-log-out", text: "Deconnexion", to: "/login" }
      ]
    };
  },
  methods: {
    toggleSidebar() {
      const main = document.getElementById("main");
      this.isSidebarOpen = !this.isSidebarOpen;
      main.classList.toggle("open");
    },
    isActive(route) {
      return this.$route.path.includes(route);
    }
  },
  computed: {
    sidebarClasses() {
      return {
        Sidebar: true,
        "bg-[#1E2029]": true,
        "sm:w-60": true,
        "min-h-screen": true,
        "w-14": true,
        "transition-all": true,
        open: this.isSidebarOpen
      };
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap");

.Sidebar .logo-details i:nth-child(1) {
  opacity: 1;
}

.Sidebar .logo-details .logo_name {
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  transition: all 0.5s ease;
}

.Sidebar.open .logo-details .logo_name {
  display: none;
}

.Sidebar .logo-details #btn {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  font-size: 22px;
  transition: all 0.4s ease;
  font-size: 23px;
  text-align: center;
  cursor: pointer;
  transition: all 0.5s ease;
}

.Sidebar .logo-details {
  height: 60px;
  display: flex;
  align-items: center;
  position: relative;
}

.Sidebar .logo-details #btn {
  text-align: right;
}

.Sidebar .logo-details .icon {
  opacity: 0;
  transition: all 0.5s ease;
}

.Sidebar li {
  width: 100%;
}

.Sidebar li.active {
  border-radius: 10px;
  background-color: #fff;
}

.Sidebar.open ul li a span {
  color: #11101d;
}

.Sidebar li a {
  color: #11101d;
  width: 100%;
}

.Sidebar li.active a {
  background-color: #fff;
  width: 100%;
}

.Sidebar li.active a span {
  color: #11101d;
  width: 100%;
}

.Sidebar li.active a i {
  color: #11101d;
}

.Sidebar li a .links_name {
  color: #ffffff;
}

.Sidebar li a i {
  color: #ffffff;
}

.Sidebar {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 250px;
  background: #11101d;
  padding: 6px 14px;
  transition: all 0.5s ease;
  overflow: hidden;
}

.Sidebar.open {
  width: 78px;
}

.Sidebar .nav-list {
  margin-top: 20px;
  height: 100%;
}

.Sidebar li .tooltip {
  display: none;
}

.Sidebar li {
  position: relative;
  margin: 8px 0;
  list-style: none;
}

.Sidebar li .tooltip {
  position: absolute;
  top: -20px;
  left: calc(100% + 15px);
  background: #fff;
  padding: 6px 12px;
  color: #11101d;
  border-radius: 4px;
  font-size: 15px;
  font-weight: 900;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: 0s;
}

@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap");
.Sidebar .bx-search {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  font-size: 22px;
  background: hsl(245, 29%, 15%);
  color: #fff;
}
.Sidebar li a:hover {
  background: #fff;
}
.Sidebar li a .links_name {
  color: #fff;
  font-size: 15px;
  font-weight: 400;
  color: #fff;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: 0.4s;
}
/* .Sidebar .bx-search:hover {
  background: #1d1b31;
  color: #fff;
} */

.Sidebar li a .links_name {
  opacity: 1;
  pointer-events: auto;
}
.Sidebar .bx-search:hover {
  background: #fff;
  color: #11101d;
}

.Sidebar li a {
  display: flex;
  height: 100%;
  width: 100%;
  border-radius: 12px;
  align-items: center;
  text-decoration: none;
  transition: all 0.4s ease;
  background: #5c6ac4;
}
.Sidebar li a:hover .links_name,
.Sidebar li a:hover i {
  transition: all 0.5s ease;
  color: #11101d;
}
.Sidebar li i {
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  border-radius: 12px;
}

.Sidebar i {
  color: #fff;
  height: 60px;
  min-width: 50px;
  font-size: 28px;
  line-height: 60px;
  text-align: center;
}
.Sidebar li:hover .tooltip {
  opacity: 1;
  pointer-events: auto;
  transition: all 0.4s ease;
  top: 50%;
  transform: translateY(-50%);
}

.Sidebar .nav-list {
  margin-top: 20px;
  height: 100%;
}
.Sidebar li .tooltip {
  display: none;
}
.Sidebar li {
  position: relative;
  margin: 8px 0;
  list-style: none;
}
.Sidebar li .tooltip {
  position: absolute;
  top: -20px;
  left: calc(100% + 15px);
  background: #fff;
  padding: 6px 12px;
  color: #11101d;
  border-radius: 4px;
  font-size: 15px;
  font-weight: 900;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: 0s;
}
.Sidebar input {
  color: white;
  font-size: 15px;
  outline: none;
  height: 50px;
  width: 100%;
  width: 50px;
  border: none;
  border-radius: 12px;
  transition: all 0.5s ease;
  font-weight: 400;
  background: #5c6ac4;
}

.Sidebar input {
  padding: 0 20px 0 50px;
  width: 100%;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins";
}


.Sidebar {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 250px;
  background: #5c6ac4;
  padding: 6px 14px;
  transition: all 0.5s ease;
  overflow: hidden;
}
.Sidebar.open {
  width: 78px;
}

.Sidebar .logo-details i:nth-child(1){
  opacity: 1;
}


.Sidebar .logo-details .logo_name {
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  transition: all 0.5s ease;
}

.Sidebar.open .logo-details .logo_name{
  display: none;
}

.Sidebar .logo-details #btn {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  font-size: 22px;
  transition: all 0.4s ease;
  font-size: 23px;
  text-align: center;
  cursor: pointer;
  transition: all 0.5s ease;
}

.Sidebar .logo-details {
  height: 60px;
  display: flex;
  align-items: center;
  position: relative;
}
.Sidebar .logo-details #btn {
  text-align: right;
  /* width: 100%; */
}

.Sidebar .logo-details .icon {
  opacity: 0;
  transition: all 0.5s ease;
}

.Sidebar li{
  width: 100%;
}

.Sidebar li.active{
  border-radius: 10px;
  background-color: #5c6ac4;
}

.Sidebar.open ul li a span{
  color: #5c6ac4;
}

.Sidebar li a {
  color: #5c6ac4;
  width: 100%;
}

.Sidebar li.active a{
  background-color: #fff;
  width: 100%;
}

.Sidebar li.active a span{
  color: #5c6ac4;
  width: 100%;
}

.Sidebar li.active a i{
  color: #5c6ac4;
}


.Sidebar li a .links_name {
  color: #ffffff;
}
.Sidebar li a i {
  color: #ffffff;
}

.card {
  background-color: #fff;
  color: #845ec8;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  width: 100%;
}

.card-title {
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
}

.card-text {
  font-size: 0.8rem;
  text-align: center;
}



.main{
  position: absolute;
  width: calc(100% - 250px);
  height: 100%;
  left: 250px;
  transition: 0.5s;
}

.main.open{
  position: absolute;
  
  width: calc(100% - 78px);
  left: 78px;
}



/* Conteneur de la pagination */
.paginationBttns {
  display: flex;
  list-style: none;
  padding: 0;
  justify-content: center;
}

/* Bouton précédent désactivé */
.previous.paginationDisabled {
  color: #999;
  cursor: not-allowed;
}

/* Bouton suivant désactivé */
.next.paginationDisabled {
  color: #999;
  cursor: not-allowed;
}



/* Styles pour les boutons */
.paginationBttns li {
  margin: 0 5px; /* Espacement entre les boutons */
}

/* Styles généraux pour les liens des boutons */
.paginationBttns a {
  text-decoration: none;
  display: inline-block;
  padding: 5px 10px;
  border: 1px solid #007bff;
  border-radius: 5px;
  color: #007bff;
}

/* Bouton actif */
.paginationActive a {
  background-color: #22287d;
  color: white;
  font-weight: bolder;
}

/* Styles pour les boutons précédents et suivants */
.previousBttn,
.nextBttn {
  background-color: #fff;
}


tr.updated{
  animation: updatedBackground 3s infinite;
}

tr.deleted{
  animation: deletedBackground 3s infinite;
}

@keyframes updatedBackground {
  to{
    background: #ffffff;
    opacity: 1;
  }
  from{
    background: rgb(34, 255, 0);
    opacity: 0;
  }
}

@keyframes deletedBackground {
  to{
    background: #ffffff;
    opacity: 1;
  }
  from{
    background: rgb(255, 64, 1);
    opacity: 0;
  }
}
</style>
