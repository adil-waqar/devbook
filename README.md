# DevBook - Where developers meet

DevBook is a MERN stack application that helps developers all around the world collaborate.

For live demo, [click here!](https://developers-book.herokuapp.com/)

### Prerequisites

Following are prerequisites to be installed:

1. Node
2. NPM
3. MongoDB

## Quick Start 🚀

### Setup server side

1. Install server dependencies by running the following in the root directory

```bash
npm install
```

2. Create a .env file in root and add the following content in it. <> are merely placeholders.

```js
MONGO_URI=<mongoDBURI>
JWT_SECRET=<randomJWTKey>
EXPIRES_IN=<expirationTimeOfJWTToken>
GITHUB_TOKEN=<githubToken>
```

## Extra notes!

You can easily generate a GitHub token by following the instructions [here!](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line)

Also, as per JWT documentation, following are valid "expiresIn" values:

- `expiresIn`: expressed in seconds or a string describing a time span [zeit/ms](https://github.com/zeit/ms).
  > Eg: `60`, `"2 days"`, `"10h"`, `"7d"`. A numeric value is interpreted as a seconds count. If you use a string be sure you provide the time units (days, hours, etc), otherwise milliseconds unit is used by default (`"120"` is equal to `"120ms"`).

### Setup client side

3. Install client dependencies by:

```bash
cd client
npm install
```

4. Go back to root directory and run the following:

```bash
cd ..
npm run dev
```

This will run both server and client from root. Enjoy!

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
