function clock(){
    this.$target  = document.createElement('div');
    this.$target.id= "clock";

    document.body.appendChild(this.$target);

    this.clocking = ()=>{
        const date = new Date();
        const hour = String(date.getHours()).padStart(2, "0");
        const minute = String(date.getMinutes()).padStart(2, "0");
        const second = String(date.getSeconds()).padStart(2, "0");

        this.$target.innerHTML = `${hour} : ${minute} : ${second}`;
    }

    this.clocking();
    setInterval(this.clocking, 1000);   
}


new clock();