import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

function App() {

  return (
    <main className="bg-zinc-800 w-full h-screen text-white flex justify-center items-center">
      <GoogleLogin
        onSuccess={credentialResponse => {
          let credentialResponseDecoder = null;

          if (credentialResponse.credential) {
            credentialResponseDecoder = jwtDecode(credentialResponse.credential);
          }
          
          console.log(credentialResponseDecoder);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </main>
  );
}

export default App;

