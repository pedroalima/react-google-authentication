import { CredentialResponse, useGoogleOneTapLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";

function App() {
  const [ user, setUser ] = useState({});

  const login = () => useGoogleOneTapLogin({
    onSuccess: async (credentialResponse: CredentialResponse) => {
      try {
        const response = await axios.get("https://www.googleapis.com/oauth2/v3/userinfor",
          {
            headers: {
              Authorization: `Bearer ${credentialResponse.clientId}`,
            }
          }
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
    onError: () => {
      console.log("Login Failed");
    },
  });

  return (
    <main className="bg-zinc-800 w-full h-screen text-white flex justify-center items-center">
      <div>
        <button onClick={() => login}>Login</button>
      </div>

      {/* // <GoogleLogin
      //   onSuccess={credentialResponse => {
      //     let credentialResponseDecoder = null;

      //     if (credentialResponse.credential) {
      //       credentialResponseDecoder = jwtDecode(credentialResponse.credential);
      //     }
         
        //     setUser(credentialResponseDecoder);
        //     console.log(user);
        //   }}
        //   auto_select
        //   onError={() => {
        //     console.log("Login Failed");
        //   }}
        // /> */}
    </main>
  );
}

export default App;

