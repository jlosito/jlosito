const psn = require("psn-api");
const fs = require("fs");
const core = require("@actions/core");

async function main() {
  // First Signin: https://www.playstation.com/en-us/
  // Then visit: https://ca.account.sony.com/api/v1/ssocookie
  const myNpsso = core.getInput("NPSSO");
  const startComment = "<!--START_SECTION:psn-->"
  const endComment = "<!--END_SECTION:psn-->"
  const readmePath = core.getInput("README_PATH");
  
  // We'll exchange your NPSSO for a special access code.
  const accessCode = await psn.exchangeNpssoForCode(myNpsso);
  // We can use the access code to get your access token and refresh token.
  const authorization = await psn.exchangeCodeForAccessToken(accessCode);
  
  const userTitlesResponse = await psn.getUserTrophyProfileSummary(
    { accessToken: authorization.accessToken },
    "me"
  );

  fs.readFile(readmePath, 'utf-8', function (err, data) {
    if (err) throw err;

    const text = startComment 
		  + "\n" + "Platinum: " + userTitlesResponse.earnedTrophies.platinum 
		  + "\n" + endComment;
    const newData = data.replace(/<!--START_SECTION:psn-->\n.*\n<!--END_SECTION:psn-->/g, text);
    fs.writeFile(readmePath, newData, (err) => {
      if (err) throw err;
    });
  });
 
  
}

main();
