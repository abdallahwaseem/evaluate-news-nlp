(()=>{"use strict";function e(e){console.log("::: Running checkForName :::",e),["Picard","Janeway","Kirk","Archer","Georgiou"].includes(e)?alert("Welcome, Captain!"):alert("Enter a valid captain name")}document.getElementById("urlForm").addEventListener("submit",(function(n){n.preventDefault(),e(document.getElementById("name").value)})),alert("I EXIST ya abdallah"),console.log(e)})();