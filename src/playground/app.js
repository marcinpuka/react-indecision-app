const obj = {
    name: "Vikram", 
    getName() {
        return this.name;
    }
};

// const getName = obj.getName.bind(obj);
const getName = obj.getName.bind({name: "Andrew"});
console.log(getName());



class IndecisionApp extends React.Component {

    constructor(props) {
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.state = {
            options: props.options
        };
    }

    componentDidMount() {

        try {
            const json = localStorage.getItem("options");
            const options =  JSON.parse(json);
            if(options) { 
                this.setState(()=> ({options}));
            }
        } catch (e) {
            //Do nothing at all
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem("options", json);
        }
    }

    componentWillUnmount() {
        console.log("componentWillUnmount!");
    }

    handlePick () {
        let option = this.state.options[Math.floor(Math.random()*this.state.options.length)];
        alert(option);
    }

    handleDeleteOptions() {
        this.setState(()=> {
            return {
                options: []
            };
        });

        // this.setState(() => ({options: []})) 
    }

    handleDeleteOption(optionToRemove){
        this.setState((prevState)=>({
            options: prevState.options.filter((option) => {
                return optionToRemove !== option;
            })
        }));
    }

    handleAddOption (option) {
        if (!option) {
            return "Enter valid value to add item";
        } else if (this.state.options.indexOf(option) > -1) {
            return "This option already exists";
        } 
        this.setState((prevState)=> {
            return {
                options: prevState.options.concat(option)
            };
        });


    }

    render() {
        const subtitle = "Put your life in the hands of a computer";

        return (
            <div>
                <Header subtitle={subtitle}/>
                <Action hasOptions={this.state.options.length > 0} handlePick={this.handlePick} should={this.state.should}/>
                <Options options={this.state.options} handleDeleteOption={this.handleDeleteOption} handleDeleteOptions={this.handleDeleteOptions}/>
                <AddOption handleAddOption={this.handleAddOption}/>
            </div>
        );
    }
}

IndecisionApp.defaultProps = {
    options: []
}



const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            {props.subtitle && <h2>{props.subtitle}</h2>}
        </div>
    );
}

Header.defaultProps = {
    title: "Indecision App"
}

const Action = (props) => {
    return (
        <div>
            <button 
                onClick={props.handlePick}
                disabled={!props.hasOptions}
                >What should I do? 
            </button>  
        </div>
    );
}



const Options = (props) => {
    return (
        <div>  
            <button onClick={props.handleDeleteOptions}>Remove all</button>
            {props.options.length === 0 && <p>Please add an option to get started</p>}
            {props.options.map((option) => {
                    return <Option 
                            key={option} 
                            optionText={option}
                            handleDeleteOption={props.handleDeleteOption}
                    />;
                })
            }
        </div>
    );
}

const Option = (props) => {
    return (
        <div>
            Option: {props.optionText}
            <button onClick={(e) => props.handleDeleteOption(props.optionText)}>Remove</button>
        </div>
    );
}

class AddOption extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            error: undefined
        };
    }

    handleAddOption (e) {
        e.preventDefault();
        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option);

        this.setState(() => {
            return {
                error
            };
        });

        if(!error) {
            e.target.elements.option.value ="";
        }
    }

    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}

                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="option"/>
                    <button>Add Option</button>
                </form>
            </div>
        );
    }
}

// const User = (props) => {
//     return (
//         <div>
//             <p>Name: {props.name}</p>
//             <p>Age: {props.age}</p>
//         </div>        
//     );
// };



ReactDOM.render(<IndecisionApp options={["Devils den", "Second district"]}/>, document.getElementById("app"));