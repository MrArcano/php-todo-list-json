const { createApp } = Vue;

createApp({
  data() {
    return {
      myUrl: "myAPI.php",
      myTasks: [],
      newTask: "",
    }
  },
  methods: {

    addTask(){
      console.log("ADD", this.newTask);
    },

    delTask(index){
      console.log("DEL: ",index);
    },

    toggleDone(index){
      console.log("TOGGLE: ",index);
    }
    
  },
  mounted() {
    console.log("Montato!");
    // GET myAPI
    axios.get(this.myUrl)
     .then((res) => {
      console.log(res.data);
      this.myTasks = res.data;
     })
     .catch((err)=>{
      console.log(err);
     })
  },
}).mount("#app");