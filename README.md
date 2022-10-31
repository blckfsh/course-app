# Course App

App for e-learning system. Students will be able to study Training materials and Courses available on the platform.

Installation
------------

```
npm install
```
from this directory. It will re-install the `node_modules` folder based on the dependencies on `package.json` file.

How to use?
----------
```
npx run dev
```
from this directory and it will run `dev` environment. Better run this if you plan to add features on the app.

Run the start script?
----------
```
npx run build
```
to create a build folder

```
npx run start
```
will run the application.

Config env file?
----------
1. `NEXTAUTH_SECRET` Secret key for the auth provider.
2. `NEXTAUTH_URL` Auth url.
3. `NEXT_PUBLIC_DB_URI` database uri.
4. `NEXT_PUBLIC_SENDGRID_API_KEY` api key to use sendgrid api.
5. `NEXT_PUBLIC_DOMAIN_FROM` domain name used in sendgrid