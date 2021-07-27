
export default function DiaryView({$app, initialState, viewOff}){

    this.state = initialState;
    this.$target = document.createElement('div');
    this.$target.id = "view_container";
    $app.appendChild(this.$target);

    this.viewOff = viewOff;

    this.setState = (nextState) =>{
        this.state = nextState;
        this.render();
    }
    
    this.onClick  = (e) =>{
        console.log("?")
        e.stopPropagation();
        document.body.removeEventListener('click', this.onClick, false);
        if(!e.target.classList.contains('diary_content'))
            this.viewOff();
    }

    this.render = () =>{
        if(this.state){
            this.$target.innerHTML = `
            <div class="diary_content" style="background-color : ${this.state.color}">
            <span>${this.state.title}</span>
            <span>${this.state.date}</span>
            <span>${this.state.time}</span>
            <span>${this.state.content}</span>
            </div>
            `

            document.body.addEventListener('click', this.onClick, false);
        }
        this.$target.style.display = this.state ? "block" : "none";
    }
}