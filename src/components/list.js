export default function List({$app, initialState, writing, viewing}){

    this.state = initialState;
    this.$target = document.createElement('div');
    this.$target.className = "diary_container";

    this.writing = writing;
    this.viewing = viewing;
    $app.appendChild(this.$target)

    this.setState = (nextState) =>{
        this.state = nextState;
        this.render();
    }

    this.render = () =>{
        let display = !this.state.isWriting && !this.state.isViewing;

        if(display){
            let listTemplate =  this.state.list.map((node, index)=>{
                let fontColor = "white";
                if(node.color === "#ffffff")
                    fontColor = "black";
                return`
                <div class="diary" data-index="${index}" style="background-color : ${node.color}; color : ${fontColor}">
                <span>${node.title}</span>
                <span>${node.date}</span>
                <span>${node.time}</span>
                </div>
                `
            }).join('');
            listTemplate += `<button type="button" id="writing">writing</button>`
            this.$target.innerHTML = listTemplate;
            
            document.querySelector('#writing').addEventListener('click', ()=>{
                writing();
            });

            this.$target.addEventListener('click', (e)=>{
               
                e.stopPropagation();
                if(e.target.id==="writing") return;
                const { index } = e.target.dataset;
                this.viewing(index);
            })

        } 
        this.$target.style.display = display ? "block" : "none";
    }
}