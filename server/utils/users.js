// [{
//   id: '/',
//   name: 'Temitayo',
//   room: 'The Office Fans'
// }]

// addUser(id, name, room)
// removeUser(id) -> and update the people list
// getUser(id) //returns user object
// getUserList(room) //returns array of names of users in a room

//ES6 Class
// class Person {
//
//   constructor (name, age) {
//     this.name = name;
//     this.age = age;
//   }
//
//   getUserDescription() {
//     return `${this.name} is ${this.age} year(s) old.`;
//   }
//
// }
//
//
// let me = new Person('Temitayo', 18);
// let description = me.getUserDescription();
// console.log(description);constructor () {
//}

class Users {
  constructor () {
    this.users = [];
  }

  addUser(id, name, room) {
    let user = {
      id: id,
      name: name,
      room: room
    };
    this.users.push(user);
    return user;
  }

  removeUser(id) {
    //return user that was removed
    let removedUser = this.getUser(id);

    if(removedUser){
      this.users = this.users.filter((user) => {
        return user.id !== id;
      });
    }

    return removedUser;
  }

  getUser(id) {
    let user = this.users.filter((user) => {
      return user.id === id;
    });

    return user[0];
  }

  getUserList(room){
    let users = this.users.filter((user) => {
      return user.room === room;
    });

    let namesArray = users.map((user) => {
      return user.name;
    });

    return namesArray;
  }

}

module.exports = {Users};
