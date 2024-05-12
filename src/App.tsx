import { GoogleLogin } from "@react-oauth/google";


function App() {

  return (
    <main className="bg-zinc-800 w-full h-screen text-white flex justify-center items-center">
      <GoogleLogin
        onSuccess={credentialResponse => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </main>
  );
}

export default App;

