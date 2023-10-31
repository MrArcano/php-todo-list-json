const { createApp } = Vue;

createApp({
  data() {
    return {
      myUrl: "myAPI.php",
      myTasks: [],
      newTask: "",
      errFlag: false,
      errMsg: "Non puoi eliminare un task non completato!",
      isDisabled: true,
      arrayIsEdit: [],
    }
  },
  methods: {

    // ADD new Task
    addTask(){
      console.log("ADD", this.newTask);

      const formData = new FormData();
      formData.append("todo", this.newTask);
      formData.append("done", false);

      axios.post(this.myUrl,formData)
        .then((res)=> {
          this.myTasks = res.data;
          this.arrayEdit();
        })
        .catch((err)=>{
          console.log(err);
        })

      this.newTask = "";
    },

    // DELETE Task
    delTask(index){
      console.log("DEL: ",index);
      this.selectIndexDel = index;

      if(!this.myTasks[this.selectIndexDel].done){
        this.errFlag = true;
      }else{
        this.errFlag = false;
        
        const formData = new FormData();
        formData.append("delTask", index);
  
        axios.post(this.myUrl,formData)
        .then((res)=> {
          this.myTasks = res.data;
          this.arrayEdit();
        })
        .catch((err)=>{
          console.log(err);
        })
      }

    },

    // Toggle complete task
    toggleDone(index){
      if(!this.arrayIsEdit[index]){
        console.log("TOGGLE: ",index);
        const formData = new FormData();
        formData.append("toggle", index);
  
        axios.post(this.myUrl,formData)
        .then((res)=> {
          this.myTasks = res.data;
        })
        .catch((err)=>{
          console.log(err);
        })
      }
    },

    // ArrayIsEdit
    arrayEdit(){
      this.arrayIsEdit.length = 0;
      for (let i = 0; i < this.myTasks.length; i++) {
        this.arrayIsEdit[i]= false;
      }
      console.log(this.arrayIsEdit);
    },

    editTask(index){
      this.arrayIsEdit[index] = !this.arrayIsEdit[index]

      console.log("EDIT: ",index);
      const formData = new FormData();
      formData.append("editIndex", index);
      formData.append("todoEdit", this.myTasks[index].todo);

      axios.post(this.myUrl,formData)
      .then((res)=> {
        this.myTasks = res.data;
      })
      .catch((err)=>{
        console.log(err);
      })
    }
    
  },
  mounted() {
    console.log("Montato!");
    // GET myAPI
    axios.get(this.myUrl)
     .then((res) => {
      this.myTasks = res.data;
      this.arrayEdit();
     })
     .catch((err)=>{
      console.log(err);
     })
  },
}).mount("#app");