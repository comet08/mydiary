import Loading from "./loading.js";
import Login from './login.js'
import Writer from "./writer.js";
import List from "./list.js";
import DiaryView from "./diaryView.js";

export default function App($app){
    this.state={
        isLoading : false,
        list : [],
        isWriting : false,
        user : null,
        selectedDiary : null
    }

    this.$target = document.createElement('div');
    this.$target.className="content";

    $app.appendChild(this.$target);

    this.loading = new Loading({
        $app,
        initialState : this.state.isLoading
    });
    this.login = new Login({
        $app,
        initialState : !this.state.loggedIn,
        onLogin : (username) =>{
            localStorage.setItem('user', username);
            this.setState({
                ...this.state,
                user : username,
            })
        }
    })

    this.list = new List({
        $app,
        initialState : {
            list : this.state.list,
            isViewing : this.state.selectedDiary,
            isWriting : this.state.isWriting
        },
        writing : () =>{
            this.setState({
                ...this.state,
                isWriting : true,
            })
        },
        viewing : (index) => {
            this.setState({
                ...this.state,
                selectedDiary : 
                {
                    index : index,
                    diary : this.state.list[index]
                }     
            })
        }
    })

    

    this.writer = new Writer({
        $app,
        initialState : {
            user : this.state.user,
            isWriting : this.state.isWriting,
        },
        onSubmit : ( diary ) =>{
            const nextState = {...this.state};
            nextState.list.push(diary);
            localStorage.setItem('diary', JSON.stringify(nextState.list));
            this.setState({
                ...nextState,
                isWriting : false,
            })
        },
        formOff : () =>{
            this.setState({
                ...this.state,
                isWriting : false
            })
        }
    });

    this.diaryview = new DiaryView({
        $app,
        initialState : this.state.selectedDiary,
        viewOff : () =>{
            this.setState({
                ...this.state,
                selectedDiary : null,
            })
        },
        onDelete : (index)=>{
            let newList = this.state.list;
            newList.splice(index,1);


            localStorage.setItem('diary', JSON.stringify(newList));
            this.setState({
                ...this.state,
                list : newList
            })

        }
    })

   

    this.setState = (nextState) =>{
        this.state = nextState;
        this.loading.setState(this.state.isLoading);
        this.login.setState(!this.state.user);
        this.writer.setState({
            user : this.state.user,
            isWriting : this.state.isWriting
        })
        this.list.setState({
            list : this.state.list,
            isViewing : this.state.selectedDiary,
            isWriting : this.state.isWriting
        })
        this.diaryview.setState(this.state.selectedDiary);
    }

    const setUser = (name) =>{
        document.querySelector("#title").innerHTML = `${name}'s Diary`
    }


    const init = () =>{
        this.setState({
            ...this.state,
            isLoading : true
        })
        const user = localStorage.getItem('user');
       
        if(!user){
            this.setState({
                ...this.state,
                isLoading : false,
            })
            return;
        }

        setUser(user);

        let diarys = JSON.parse(localStorage.getItem('diary'));
        if(!diarys) diarys = [];
        console.log(diarys)

        this.setState({
            ...this.state,
            user : user,
            list : diarys, 
            isLoading : false,
        })
    }

    init();
}