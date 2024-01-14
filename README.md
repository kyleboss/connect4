# ConnectFour NextJS App

ConnectFour is a classic two-player connection game in which the players first choose a color and then take turns dropping colored discs into a seven-column, six-row vertically suspended grid. The pieces fall straight down, occupying the lowest available space within the column. The objective of the game is to be the first to form a horizontal, vertical, or diagonal line of four of one's own discs.

This version of ConnectFour is built with Next.js and utilizes WebSockets for real-time gameplay.

## Features

- Real-time gameplay with WebSockets. Try it out by opening the 
- Built-in sounds mute capabilities.
- Interactive UI with animations.

## Installation

To get started with the ConnectFour app, clone the repository and install the dependencies:

```
git clone https://github.com/kyleboss/connet4.git
cd connect4
yarn install
```

## Running the App

You can run the app in development mode with:

```
yarn dev
```

For production build and start, use:

```
yarn build
yarn start
```

## Usage

After starting the app, navigate to `http://localhost:3000` (or your custom port if modified) in your browser to start playing the game.

For the game to begin, open it up in two tabs/windows.

To explore the guest experience, open the game in at least three tabs.

## Testing

Run tests using:

```
yarn test
```

## Dependencies

- Express: For setting up the server.
- Socket.io: For real-time communication between clients and the server.
- Styled Components: For styling the React components.
- use-sound: For adding sound effects to the game.
- Lottie: For rendering animations.

## Development

- React: For building the user interface.
- Next.js: For server-side rendering and static generation.

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## License

[MIT License](LICENSE) - feel free to use and modify the code for your personal or commercial projects