console.log("App.js is running");

// JSX - JavaScript XML
// if statements 
// terantry operators 
// logical and operator
//only render the subtitle and p tag if subtitle exist - logical and operator 
// render new p tag - if options.length > 0 "Here are you options

const app = {
    title: "Indecision", 
    subtitle: "High-tech support for your big decisions", 
    options: []
};

const onFormSubmit = (e) => {
  e.preventDefault();
    
  const option = e.target.elements.option.value;
    
  if (option) {
    app.options.push(option);  
    e.target.elements.option.value = "";
    renderView();
  }    
  
};

const removeAll = () => {
    app.options = [];
    renderView();
};

const onMakeDecision = () => {
  const randomNum = Math.floor(Math.random() * app.options.length);    
  const option = app.options[randomNum];
  alert(option);
};


const appRoot = document.getElementById("app");

const numbers = [55, 75, 101, 1000];

const renderView = () => {
    const template = ( 
        <div>
            <h1> {app.title} </h1> 
            {app.subtitle && <p> {app.subtitle}</p>}
            <p>{(app.options && app.options.length > 0) ? "Here are your options" : "No options"} </p>
            <p>{app.options.length}</p> 
            <button disabled={app.options.length === 0} onClick={onMakeDecision}>What should I do?</button>
            <button onClick={removeAll}>Remove Options</button>

            {
               numbers.map((number) => {
                   return <p key={number}> {number*2}</p>;
               })
            }

            <ol> 
                {
                    app.options.map((option) => {
                        return <li key={option}> {option} </li>; 
                    })    
                }
            </ol>


            <form onSubmit={onFormSubmit}>
                <input type="text" name="option"/>
                <button>Add Option</button>
            </form>
        </div>
    );
    ReactDOM.render(template, appRoot);
};

renderView();