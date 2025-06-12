const fetch = require("node-fetch"); // bringing in fetch so we can make HTTP requests (like axios but built-in)

// this is your Discord token — DO NOT share this with anyone or upload it to GitHub
const token = "your token here"; // NEVER LEAK YOUR USER TOKEN TO PPL

// a list of statuses you can rotate through — you can customize these however you want
const statuses = [
  { text: "sample text 1", emoji: "😭" },
  { text: "sample text 2", emoji: "😜" },
  // you can add additional statuses here
];

// this function actually sends the request to Discord to change your custom status
async function setCustomStatus(status) {
  const body = {
    custom_status: {
      text: status.text,       // the message you wanna show
      emoji_name: status.emoji // the emoji next to it
    },
  };

  // sending a PATCH request to Discord's settings API endpoint
  const res = await fetch("https://discord.com/api/v9/users/@me/settings", {
    method: "PATCH",
    headers: {
      Authorization: token,           // this is how Discord knows it's you
      "Content-Type": "application/json", // telling the API we're sending JSON
      "User-Agent": "Mozilla/5.0",    // Discord expects a user agent like a browser
    },
    body: JSON.stringify(body),       // sending the status as JSON
  });

  // if it works, let us know in the console — otherwise throw an error
  if (res.ok) {
    console.log(`Custom status set to: ${status.text} ${status.emoji}`);
  } else {
    console.error(`Failed to set status: ${res.status} ${res.statusText}`);
  }
}

// this function just loops forever, switching your status every hour
async function start() {
  while (true) {
    const status = statuses[Math.floor(Math.random() * statuses.length)]; // pick a random one
    await setCustomStatus(status); // set the new status
    await new Promise((r) => setTimeout(r, 60 * 60 * 1000)); // wait an hour (in ms)
  }
}

// kick it all off — if anything breaks, log the error
start().catch(console.error);
