const { createApp } = Vue;

createApp({
  data() {
    return {
      myUrl: "myAPI.php",
      myTasks: [],
      newTask: "",
      errFlag: false,
      errMsg: "Non puoi eliminare un task non completato!",
    }
  },
  methods: {

    addTask(){
      console.log("ADD", this.newTask);

      const formData = new FormData();
      formData.append("todo", this.newTask);
      formData.append("done", false);

      axios.post(this.myUrl,formData)
        .then((res)=> {
          this.myTasks = res.data;
        })
        .catch((err)=>{
          console.log(err);
        })

      this.newTask = "";
    },

    delTask(index){
      console.log("DEL: ",index);
      this.selectIndexDel = index;

      if(!this.myTasks[this.selectIndexDel].done){
        this.errFlag = true;
      }else{
        this.errFlag = false;
      }

      const formData = new FormData();
      formData.append("delTask", index);

      axios.post(this.myUrl,formData)
      .then((res)=> {
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
      this.myTasks = res.data;
     })
     .catch((err)=>{
      console.log(err);
     })
  },
}).mount("#app");