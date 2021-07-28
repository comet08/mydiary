
export default function DiaryView({$app, initialState, viewOff, onDelete}){

    this.state = initialState;
    this.$target = document.createElement('div');
    this.$target.className = "view_container";
    $app.appendChild(this.$target);

    this.viewOff = viewOff;
    this.onDelete = onDelete;

    this.setState = (nextState) =>{
        this.state = nextState;
        this.render();
    }
    
    this.onClick  = (e) =>{      
        e.stopPropagation();

        console.log(e.target)
        if(!e.target.classList.contains('diary')){
            console.log("?")
            document.body.removeEventListener('click', this.onClick, false);
            this.viewOff();
        }
    }

    this.delete = (e) =>{
        this.onDelete(this.state.index);
        this.viewOff();
        e.target.removeEventListener('click', this.delete, false);
    }



    this.render = () =>{
        if(this.state!=null){
            this.$target.innerHTML = `
            <div class="diary" id="diaryview" style="background-color : ${this.state.diary.color}">
            <span class="diary" id="title">${this.state.diary.title}</span>
            <span class="diary" id="date">${this.state.diary.date}</span>
            <span class="diary" id="time">${this.state.diary.time}</span>
            <span class="diary" id="content">${this.state.diary.content}</span>
            </div>
            <button id="deleteButton" type="button">Delete</button>
            `

            document.body.addEventListener('click', this.onClick, false);
            document.querySelector("#deleteButton").addEventListener('click', this.delete, false);
        }
        this.$target.style.display = this.state ? "block" : "none";
    }

    
}