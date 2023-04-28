// code sets an onclick event listener on an element with the ID "setPassword1". When this element is clicked, it retrieves the values of two input fields with IDs "passwordToStore" and "userName", and passes these values to the function StorePassword1()

	document.getElementById("setPassword1").onclick = function() {
		var text = document.getElementById('passwordToStore');
		var username = document.getElementById('userName');

		StorePassword1(username.value, text.value);
	};

// This function retrieves the URL of the current tab in a Google Chrome window, and then retrieves the value of a key in local storage using that URL as the key. However, the retrieved value is not actually used in this function.
	function load()
	{
		var url;
		chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
   			function(tabs){
      		 url = tabs[0].url;
      		 var value = localStorage.getItem(url);
   			}
		);
        
	}

// This function first checks if the browser supports local storage. If it does, it retrieves the URL of the current tab and uses it as a key to store a string value consisting of the input username, the string "0+/", and the encrypted password. If an error occurs due to exceeding the storage quota, it displays an alert message.
	function store(inputUsername, encodedPassword){

		if (typeof(localStorage) == 'undefined' ) {
		alert('Your browser does not support HTML5 localStorage. Try upgrading.');
		} 
		else {
			try {
				chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
   				
   				function(tabs){
      		 		url = tabs[0].url;
      		 		localStorage.setItem(url, inputUsername + "0+/" +encodedPassword);
   				});
				 //saves to the database, “key”, “value”
			} catch (e) {
			if (e == QUOTA_EXCEEDED_ERR) {
				alert('Quota exceeded!'); //data wasn’t successfully saved due to quota exceed so throw an error
			}
		}
	}
}
// This function takes in a username and password, encrypts the password using the CryptoJS library, and passes the encrypted password along with the username to the store() function for storage in local storage.
	function StorePassword1(username, password){
		var encrypted = CryptoJS.AES.encrypt(password, "Secret Passphrase");
		var decrypted = CryptoJS.AES.decrypt(encrypted, "Secret Passphrase");
		// document.getElementById("encrypt").innerHTML = encrypted;
		// document.getElementById("msg").innerHTML = decrypted.toString(CryptoJS.enc.Utf8);
		// document.getElementById("decrypt").innerHTML = decrypted;
		var url;
		chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
   			function(tabs){
      		 url = tabs[0].url;
   			}
		);
		store(username, encrypted);
	}

	function ShowPasswords(passwords) {
		fLen = passwords.length;
		text = "<ul>";
		for (i = 0; i < fLen; i++) {
		    text += "<li>" + passwords[i] + "</li>";
		}
		document.getElementById("PasswordList").innerHTML = text;
	}

	function saveChanges(theValue) {
        // Check that there's some code there.
        if (!theValue) {
          confirm('Error: No value specified');
          return;
        }
        // Save it using the Chrome extension storage API.
        // alert(theValue);
        chrome.storage.sync.set({'value': theValue }, function() {
          // Notify that we saved.
        confirm('Settings saved');
        // alert("done");
        });
      }
	
	//   The function loops through each password in the array and adds an HTML list item element containing the password to a string variable text.

	//   After the loop is complete, the function sets the innerHTML property of an HTML element with the ID "PasswordList" to text, which will display the list of passwords in the element.
	  function showStoredPasswords() {
		// Get the current tab's URL
		chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
		  function(tabs) {
			var url = tabs[0].url;
			var storedValue = localStorage.getItem(url);
	  
			if (storedValue) {
			  // Split the stored value into username and encrypted password
			  var splitValue = storedValue.split("0+/");
	  
			  // Decrypt the password
			  var decrypted = CryptoJS.AES.decrypt(splitValue[1], "Secret Passphrase").toString(CryptoJS.enc.Utf8);
	  
			  // Display the username and password in an HTML list
			  var html = "<ul><li>Username: " + splitValue[0] + "</li><li>Password: " + decrypted + "</li></ul>";
			  document.getElementById("storedPasswords").innerHTML = html;
			}
		  }
		);
	  }
	  