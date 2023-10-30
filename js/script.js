const { createApp } = Vue;

createApp({
  data() {
    return {
      myUrl: "myAPI.php",
      myTasks: [],
    }
  },
  methods: {
    
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
}).mount("#app")