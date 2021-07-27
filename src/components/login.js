export default function Login({$app, initialState, onLogin}){

    this.state = initialState;
    this.$target = document.createElement('div');
    this.$target.id = "login";
    this.onLogin = onLogin;
    $app.appendChild(this.$target);

    this.setState = (nextState) =>{
        this.state = nextState;
        this.render();
    }

    this.render = () =>{
        this.$target.innerHTML = `
        <form id="loginForm">
        <input id="loginInput" type="text" placeholder="what's your name?" required />
        <input type="submit" value="submit">
        </form>
        `
        if(this.state){
            document.querySelector('#loginForm').addEventListener('submit', (e)=>{
                e.preventDefault();
                const username = document.querySelector('#loginForm #loginInput').value;
                this.onLogin(username);
            })
        }
        this.$target.style.display = this.state ? "block" : "none";   
    }
}