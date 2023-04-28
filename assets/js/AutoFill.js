// Set default values for userName and decrypted
var userName = "aekjf";
var decrypted = ":AKufh";

// When the "Fill" button is clicked, execute the following code
document.getElementById("Fill").onclick = function() {
    // Get the current active tab
    chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
            function(tabs){
            // Get the URL of the current tab
            url = tabs[0].url;
            // Get the stored value for the current URL
            var value = localStorage.getItem(url);
            // Split the stored value into userName and encrypted password
            var TempValue = value.split("0+/");
            userName = TempValue[0];
            var passwordValue = TempValue[1];
            // Decrypt the password using AES encryption
            decrypted = CryptoJS.AES.decrypt(passwordValue, "Secret Passphrase").toString(CryptoJS.enc.Utf8);
            // Create a JSON object with userName and decrypted password
            var someJSON = { "userName":userName, "password":decrypted};

        // Inject a script into the current active tab that fills the username and password fields with the stored values
        chrome.tabs.executeScript({
        code: '(' + function(params) {
            var inputs = document.getElementsByTagName("input");
            for(var i=1;i<inputs.length;i++){
                if(inputs[i].type=="password"){
                    inputs[i-1].value = params.userName;
                    inputs[i].value = params.password;
                    break;
                }

            }
            return {success: true, html: document.body.innerHTML};
            } + ')(' + JSON.stringify(someJSON) + ');'
        }, function(results) {
    });
    });
};

// The code retrieves a stored password from local storage for the current URL, decrypts it using AES encryption, and injects a script into the current active tab that fills 
// the username and password fields with the stored values. It does so using a JSON object containing the username and password values.