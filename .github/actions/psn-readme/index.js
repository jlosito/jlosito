const psn = require("psn-api");

async function main() {
  // First Signin: https://www.playstation.com/en-us/
  // Then visit: https://ca.account.sony.com/api/v1/ssocookie
  const myNpsso = ""
  
  // We'll exchange your NPSSO for a special access code.
  const accessCode = await psn.exchangeNpssoForCode(myNpsso);
  
  // We can use the access code to get your access token and refresh token.
  const authorization = await psn.exchangeCodeForAccessToken(accessCode);
  
  const userTitlesResponse = await psn.getUserTrophyProfileSummary(
    { accessToken: authorization.accessToken },
    "me"
  );
  console.log(userTitlesResponse);
}

main();
