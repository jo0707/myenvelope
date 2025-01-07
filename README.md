<h1 align="center">MyEnvelope</h1>

<p align="center">
  <img src="screenshots/banner.png"/>
</p>

<p align="center">
    URLShort is a URL shortener application that is built with Nuxt 3 and MongoDB. 
</p>

## App

Try It : [MyEnvelope](https://myenvelope.vercel.app/)
<br>
Try It : [MyEnvelope (envelope.jooo.site)](https://envelope.jooo.site/)

<p align="center">
  <img src="screenshots/main.png" />
</p>

<p align="center">
  <img src="screenshots/create.png" />
</p>

## Library, Frameworks & Tools Used

- [Nuxt 3](https://nuxt.com/)
  - [Nuxt UI](https://ui.nuxt.com/)
  - [Nuxt Google Fonts](https://google-fonts.nuxtjs.org/)
  - [Nuxt SEO](https://nuxtseo.com/)
  - [Nuxt Rate Limit](https://github.com/timb-103/nuxt-rate-limit)
  - [Nuxt I18n](https://i18n.nuxtjs.org/)
  - [Nuxt VueUse](https://vueuse.org/)
- [MongoDB](https://www.mongodb.com/)
  - [MongoDB Atlas (Free Plan)](https://www.mongodb.com/cloud/atlas)
  - [Nuxt Mongoose](https://nuxt-mongoose.nuxt.space/)
- [TailwindCSS](https://tailwindcss.com/)
- [Pnpm](https://pnpm.io/)
- [Starback.js](https://github.com/zuramai/starback.js)

## Setup & Build

if you want to try, continue or modify this project, you can follow these steps:

- Clone this project

```bash
git clone https://github.com/jo0707/myenvelope
```

- Change directory to the project

```bash
cd myenvelope
```

- Install dependencies (pnpm)

```bash
pnpm install
```

This project use MongoDB as its messages database:

- Create .env file on the root of the project
- Create a MongoDB Atlas account
- Create a new deployment / project (Use M0 to get free plan)
- On the overview tab, click Connect > Drivers > Nodejs
- copy your connection string to .env file

.env example

```env
MONGODB_URI=mongodb+srv://changeyourusername:changeyourpassword@clusterX.xxxxx.mongodb.net/app?retryWrites=true&w=majority
```

- Run the project

```bash
pnpm dev
```

- Build the project

```bash
pnpm run build
#or
pnpm run generate # static hosting
```

That's it!

## Contributing

Made by [jo0707](https://github.com/jo0707)

Feel free to contribute to this repository!
