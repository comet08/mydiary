export default function Writer({$app, initialState, onSubmit, formOff}){

    this.state = initialState;
    this.$target = document.createElement('div');
    this.$target.id = "writing_container";
    $app.appendChild(this.$target);

    this.onSubmit = onSubmit;
    this.formOff = formOff;

    this.setState = (nextState) =>{
        this.state = nextState;
        this.render();
    }

    this.getDate = () =>{
        return new Date().toISOString().split('T')[0];
    }

    this.getTime = () =>{
        const date = new Date();
        const hour = String(date.getHours()).padStart(2, "0");
        const minute = String(date.getMinutes()).padStart(2, "0");
        const second = String(date.getSeconds()).padStart(2, "0");

        return `${hour}:${minute}:${second}`;
    }

    this.onPress = (e) =>{
        //console.log(e.code);
        if(e.key === "Escape"){
            this.formOff();
            window.removeEventListener('keyup', this.onPress);
        }
    }

    this.render = () =>{

        if(this.state.isWriting){
            this.$target.innerHTML = `
            <form id="writeForm">
            <label for="title"> 제목 </label> <input type="text" max-length=60 name="title" id="title">
            <label for="color"> 오늘의 색 </label> <input type="color" name="color" id="color">
            <label for="content"> 내용 </label> <textarea id="content" name="content"> </textarea> </label>
            <input type="submit" value="submit">
            <span>❌ESC❌</span>
            </form>
            `

            document.querySelector('#writeForm').addEventListener('submit', (e)=>{
                e.preventDefault();
                const { title, color, content } = e.target;
                let data = {
                    date : this.getDate(),
                    time : this.getTime(),
                    title : title.value,
                    color : color.value,
                    content : content.value
                }
                this.onSubmit(data);
            })

            window.addEventListener('keyup', this.onPress, false);
        }
        



        this.$target.style.display = this.state.isWriting ? "block" : "none";
    }
}