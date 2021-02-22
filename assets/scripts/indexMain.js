let dataValue;
function init(){
    console.log(firebase);
        // #1 - get a reference to the databse
        let database = firebase.database();

     //   // #2 - refer to a root node named `scores`
     //   let ref = database.ref('scores2');
//
     //   let data = {
     //   name: "MADMAX",
     //   realName: "Maxine Mayfield",
     //   gameName: "Dig Dug",
     //   score: 750200
     // };
//
     // // #4 - send data, in this case we are adding it to the `scores` node
     // ref.push(data);
        // #4 This is where the magic happens!
        firebase
          .database()
          .ref('scores2')
          .on('value', dataChanged, firebaseError);

        function dataChanged(data) {
          console.log(data.val());
          dataValue = data.val();
        }

        function firebaseError(error) {
          console.log(error);
        }

        loginButton.onclick = _ => {
            let loginValue = userName.value;
            if(loginValue != ""){
              if (dataValue[loginValue] == null) {
                let path = 'scores2/' + loginValue;
                firebase.database().ref(path).set({
                  // over-writes old values
                  userID: userName.value,
                });
              }
              localStorage.setItem('loginId', loginValue);
              window.location = 'meal_planner.html';
            }
        };
        
        userName.innerHTML = window.localStorage.getItem('loginId');
        userName.value = window.localStorage.getItem('loginId');
}
export {init};