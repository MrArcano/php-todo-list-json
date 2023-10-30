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

      const formData = new FormData();
      formData.append("todo", this.newTask);

      axios.post(this.myUrl,formData)
        .then((res)=> {
          console.log(res.data);
          this.myTasks = res.data;
        })
        .catch((err)=>{
          console.log(err);
        })
    },

    delTask(index){
      console.log("DEL: ",index);
      const formData = new FormData();
      formData.append("delTask", index);

      axios.post(this.myUrl,formData)
      .then((res)=> {
        console.log(res.data);
        this.myTasks = res.data;
      })
      .catch((err)=>{
        console.log(err);
      })
    },

    toggleDone(index){
      console.log("TOGGLE: ",index);
      const formData = new FormData();
      formData.append("toggle", index);

      axios.post(this.myUrl,formData)
      .then((res)=> {
        console.log(res.data);
        this.myTasks = res.data;
      })
      .catch((err)=>{
        console.log(err);
      })
    },
    
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