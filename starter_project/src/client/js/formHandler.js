// Replace checkForUrl with a function that checks the URL
import { checkForUrl } from "./urlChecker";

// If working on Udacity workspace, update this with the Server API URL e.g. `https://wfkdhyvtzx.prod.udacity-student-workspaces.com/api`
// const serverURL = 'https://wfkdhyvtzx.prod.udacity-student-workspaces.com/api'
const serverURL = "https://localhost:8000/api";

const form = document.getElementById("urlForm");
form.addEventListener("submit", handleSubmit);

async function handleSubmit(event) {
  if (event != null) {
    event.preventDefault();
  }

  // Get the URL from the input field
  const formText = document.getElementById("name").value;

  // Check if the URL is valid
  let passedCheck = Client.checkForUrl(formText);

  // If the URL is valid, send it to the server using the serverURL constant above
  if (passedCheck) {
    const localBaseUrl = "http://localhost:8001";
    const response = await postData(`${localBaseUrl}/get_sentiment`, {
      url: formText,
    });

    if (response["status"] == 200) {
      let resultText = "";

      if (response["polarity"] == "N") {
        resultText += "It is negative, ";
      } else {
        resultText += "It is postive, ";
      }
      if (response["subjectivity"] == "OBJECTIVE") {
        resultText += "and objective.";
      } else {
        resultText += "and subjective.";
      }
      document.getElementById("results").textContent = resultText;
    } else {
      alert("Failed to get sentiment");
    }
  } else {
    alert("Url cannot be empty");
  }
}

// Function to send data to the server
const postData = async (url = "", data = {}) => {
  const body = {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url, body);

  try {
    const newData = await response.json();

    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

// Export the handleSubmit function
export { handleSubmit };
