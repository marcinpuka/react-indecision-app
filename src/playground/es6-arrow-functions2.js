// arguments object - no longer bound with arrow functions 

const add = (a, b) => {
    // console.log(arguments); no acc to arguments
    return a + b;
};
console.log(add(55, 1));

// this keyword - no longer bound

const user = {
  name: "Andrew", 
  cities: ["Philadelphia", "New York", "Dublin"], 
  printPlacesLived: function () {
      console.log(this.name);
      console.log(this.cities);
      
      const that = this;
      
      this.cities.forEach(function (city) {
         console.log(that.name + " has lived in " + city);  
      });
  }
};

user.printPlacesLived();


const user2 = {
  name: "Andrew", 
  cities: ["Philadelphia", "New York", "Dublin"], 
  printPlacesLived: function () {
      this.cities.forEach((city)  => {
         console.log(this.name + " has lived in " + city);  
      });
  }
};

user2.printPlacesLived();


const user3 = {
  name: "Andrew", 
  cities: ["Philadelphia", "New York", "Dublin"], 
  printPlacesLived() {
      return this.cities.map((city) => {
          return this.name + " has lived in "  + city;
      });
  }
};

console.log(user3.printPlacesLived());