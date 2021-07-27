export default function Loading({$app, initialState}){

    this.state = initialState;
    this.$target = document.createElement('div');
    this.$target.id = "loading";
    $app.append(this.$target)

    this.setState = (nextState) =>{
        this.state = nextState;
        this.render();
    }

    this.render = () =>{
        this.$target.innerHTML = `💜💙💚💛🧡Loading🧡💛💚💙💜`;
        this.$target.style.display = this.state ? "block" : "none";
    }
}