# Hey!

My name is Wesley Ramalho and this is my assignment. Hope you enjoy it! 
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Assumptions:

- I'm assuming I can't use local time, (As per aviation practice, all times are UTC (GMT), the app makes no use of local time. Airports are displayed using their four letter code.), considering that, I'm not using JS/TS to get the next day and present on the screen as it's being shown on the mockup available on the assignment README;
- I'm assuming I don't have to match which flights belong to n airplanes, and then validate that the moment before the user is trying to build a rotation;
- There are tests available in the project for the majority of the components/functions, some of them are emitting warnings, but all of them were passing when I tested. You can check them out through ```yarn test```.
- There's a lot to be improved here, since I was in a hurry lately I wasn't able to clean up the styles/css organization the way I wanted, hope that's enough for this assignment. 
- (just a heads-up) For this assignment, I'm not using a UI kit, but I'm also pretty used to work with things like that such as Material UI, Ant Design.
- I added an extra feature about rotations suggestions generated automatically because it was being awful for me to manually build a rotation. For that, I'm assuming that the criteria for a good rotation is the ability to fill the timeline in mostly of the times available.
- I've also added tooltips in the timeline, I thought it would be a nice way to show some information related to each portion of time presented over there. 
-I'm assuming this app would be used in desktop devices, so I haven't shaped it to have a good UI/UX in mobile devices for this moment.
- There's a lot to be improved from an accessibility perspective;
- Performance could be better;


About the svgs/media that you're going to see in the project, I got them from the following urls:
- https://all-free-download.com/free-vector/download/airplane_icons_white_modern_design_6840399.html
- https://pixabay.com/pt/photos/avi%c3%a3o-lufthansa-aeroporto-airbus-2152713/
- https://www.freepik.com/free-vector/grey-world-map_893780.htm
- https://br.freepik.com/vetores-gratis/ilustracao-de-silhueta-de-aviao-de-design-plano_28453240.htm#query=airplane&position=2&from_view=search&track=sph

as I'm not going to post this anywhere, I just added the references over here, but didn't got official liceses for them. I've also changed them a little bit using figma.


## Environment suggestions:

To run this project, I suggest you to use the following specs for node and npm:
```node v14.17.0 (npm v6.14.13)```

You can use something like NVM (https://github.com/nvm-sh/nvm) to be able to switch between node versions in your computer.



# Getting Started with Create React App

## Available Scripts

In the project directory, you can run:

First of all, install the dependencies using:
### `npm install` or `yarn`

Then you can start the project using the following commands:
### `npm start` or `yarn start`

It runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

If you're interested to run the test cases, feel free to:
### `npm test` or `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

