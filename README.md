<h1 align="center"><img src="public/JustListenGifLogo.gif" alt="JUstListen" width="100%"/></a></h1>

## **Introduction** 👨‍💻
It is a just a clone of spotify web player which can be used only to listen your music playlists of spotify.

### **Built with** <img src="https://seeklogo.com/images/N/next-js-logo-8FCFF51DD2-seeklogo.com.png" alt="NextJS" width="36" height="36" /> <img src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" alt="java" width="36" height="36" />

### **API used** 📄️
- [Spotify Web API](https://developer.spotify.com/documentation/web-api/)

## **Getting Started** 🏃‍♂️️
- These instructions will get you a copy of the project up and be running on your local machine for development and testing purposes.

### **Prerequisites** ✍️
 - [Node.js](https://nodejs.org/en/)
    - [npm](https://www.npmjs.com/)

### **Setting up your local development environment** 🏭️

1. Download and install Git.

2. Clone the project locally. At the command line:
            
   ```
   $ git clone https://github.com/BolisettySujith/Just-Listen.git
   ```
3. Create a new file called `.env.local` in the root directory of the project, and declare the folowing variable 
   - `NEXTAUTH_URL` = "http://localhost:3000"
   - `NEXT_PUBLIC_CLIENT_SECRET` = *"YOUR_SPOTIFY_CLIENT_SECRET"*
   - `NEXT_PUBLIC_CLIENT_ID` = *"YOUR_SPOTIFY_CLIENT_ID"*
   - `JWT_SECRET` = *"YOUR_SCREAT_KEY"*

   To get `NEXT_PUBLIC_CLIENT_SECRET`, `NEXT_PUBLIC_CLIENT_ID` you need to create a an app in [Spotify developers dashboard](https://developer.spotify.com/dashboard/login), in that application you can find `Client Secret`, `Client ID` values respectively.

4. Go to the project directory and run the following command in terminal:
            
   ```
   $ npm install
   ```
5. Run the following command to start the development server:
            
   ```
   $ npm run dev
   ```
    Mostly it will be available at ``localhost:3000`` in the browser.

> Note : Songs playing feature is only supported for Premium Spotify account holders, for Normal Accounts songs playing feature is not supported.

## **Preview** 🤩️
<p align="center"><img src="public/JustListendemo.gif" alt="JUstListen" width="100%"/></a></p>

## **How to Contribute** 🤔
This project is made just for learning purpose to know more about NextJS. If you have any suggestions or you want to contribute to this project, please feel free to open an issue and create a pull request🍴.

## **Resources** 🎓
Thanks to [Heroicons](https://heroicons.com/) for providing resources for this project.


To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel 🌐️

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


If you like the project feel free to **⭐** the repository.

### **#Happy Coding!**