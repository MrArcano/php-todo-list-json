const { createApp } = Vue;

createApp({
  data() {
    return {
      myUrl: "myAPI.php",
      myTask: [],
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
      this.myTask = res.data;
     })
     .catch((err)=>{
      console.log(err);
     })
  },
}).mount("#app")