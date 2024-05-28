# React Google Authentication

Uma aplicação de página única para autenticação com Google.

A página web é de minha autoria e foi inspirada em outras aplicações já existentes, adaptando seus designs e recursos. A aplicação foi desenvolvida utilizando tecnologias como TypeScript, React, TailwindCSS.

## Screenshots

![#](./public/desktop-view.png)

</br>

## Objetivos

O principal objetivo deste projeto foi simular um ambiente que realiza a autenticação com Google.

Os usuários têm a capacidade de:
- Logar com sua conta do Google

> OBS - Por questões de segurança, essa aplicação não está disponível na internet, mas se desejar, você pode fazer um fork do projeto para testes em sua máquina local.

</br>

## Propriedades e Tecnologias

- TypeScript
- React
- TailwindCSS
- React Oauth Google

</br>

## Meu aprendizado

Fazer login com o Google é uma ferramenta frequentemente utilizada em diversas aplicações. Ela traz simplicidade ao processo de autenticação, uma solução com poucos cliques.

Atualmente, o pacote disponível para utilizar o serviço é o [react-oauth/google](https://www.npmjs.com/package/@react-oauth/google) com auxílio do [Google Cloud Platform](https://console.cloud.google.com/).

Primeiro, precisamos criar um projeto na plataforma do Google Cloud. Você pode conferir o passo a passo neste [artigo](https://livefiredev.com/in-depth-guide-sign-in-with-google-in-a-react-js-application/). Com isso, vamos obter o ID do cliente.

![#](./public/clientid.png)

Partindo para o código, precisamos envolver a aplicação com a função GoogleOAuthProvider, utilizando o clientId.

```tsx
...
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="***********-*****************.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
```

Isso nos dará autorização para utilizar a plataforma do Google Cloud. A partir daqui, temos dois caminhos: usar o botão padrão (GoogleLogin) ou o personalizado (useGoogleLogin), neste artigo seguiremos pelo segundo. 

```tsx
...
import { TokenResponse, useGoogleLogin } from "@react-oauth/google";

function App() {
  const [ user, setUser ] = useState<TokenResponse | undefined>(undefined);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log("Login successful:", codeResponse);
      setCookie(null, "auth_token", codeResponse.access_token);
      setUser(codeResponse);
    },
    onError: (error) => console.log("Login Failed:", error)
  });

  return (
    <main className="bg-zinc-800 w-full h-screen text-white flex justify-center items-center">
      <div className="flex flex-col items-center gap-10">
        <h3 className="text-2xl">Faça login com auxílio do <strong>React Oauth Google</strong></h3>
        <div className="rounded-full w-[96px] h-[96px] bg-gray-500/30">
            <IoPersonCircle className="w-full h-full" />
        </div>
        <button 
            className="px-6 py-2 bg-white hover:bg-gray-200 transition-all text-black font-semibold text-lg rounded-full" 
            onClick={() => login()}
        >Entrar com Google</button>
      </div>
    </main>
  );
}
...
```

O useGoogleLogin tem duas propriedades por padrão: onSuccess e onError. A primeira é uma função interna que faz uma solicitação para o servidor do Google Cloud e retorna o token de autenticação, entre outras informações. A segunda também é uma função, mas que captura os erros da solicitação.

```tsx
{
  access_token: 
    'ya29.a0AXooCgtelLQdOn_cjw0ysqaBFxwFtK84l6IG7MnmqABKdOPpV3sHDVPthJfBeR5f9EkywvtOP3JcqPAKzycMQDEGJWorXWVG6Q7cECqe1GzrmmTMA8CBTx97lqR3d6rk35Ettf2-R_uZZOHZBStWgOJwPkqYBvrAmxwaCgYKAesSARISFQHGX2Mi1Bnxm0X9CdS9X1a72Yg6yA0170',
  token_type: 'Bearer',
  expires_in: 3598,
  scope: 
    'email profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid',
  authuser: '0',
  prompt: 'none'
}
```

Com o token, podemos recuperar as informações do usuário solicitando a API do Google.

```tsx
...
  axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
    headers: {
      Authorization: `Bearer ${user.access_token}`,
      Accept: "application/json"
    }
  }
  ).then(res => {
    setProfile(res.data);
  })
    .catch(error => {
      console.error(error);
    });
...
```

Dentre as informações retornadas, as mais relevantes são nome, email e a URL da imagem de perfil do usuário.

```tsx
{
  id: '************',
  email: '************',
  verified_email: ************,
  name: '************',
  given_name: '************',
  family_name: '************',
  picture: 
    '************',
  locale: '************'
}
```

Uma observação importante a destacar: não é recomendado utilizar esse exemplo em projetos reais. Por segurança, é necessário utilizar os recursos desse framework em conjunto com o back-end, criando uma sessão para guardar as informações. Contudo, esse projeto é destinado apenas para fins de estudo prático.

Você poderá encontrar mais informações no artigo: [In Depth Guide: “Sign In With Google” In A React JS Application](https://livefiredev.com/in-depth-guide-sign-in-with-google-in-a-react-js-application/), de Khoj Badami.

</br>

## Autor

- LinkedIn - [Pedro A. Lima](https://www.linkedin.com/in/pedroalima6/)