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

    this.onSubmit = (e)=>{
        e.preventDefault();
        const {name} = e.target;
        console.log(name.value);
        document.querySelector('#loginForm')?.removeEventListener('submit', this.onSubmit, false);
        this.onLogin(name.value); 
    }

    this.render = () =>{
        this.$target.innerHTML = `
        <form id="loginForm">
        <input id="loginInput" type="text" name="name" placeholder="what's your name?" required />
        <input type="submit" value="Register">
        </form>
        `
        this.$target.style.display = !this.state ? "block" : "none"; 
        document.querySelector('#loginForm')?.addEventListener('submit', this.onSubmit, false);
    }
}