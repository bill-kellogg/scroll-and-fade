This project looks deceptively simple but took several meetings and few iterations to get right. The goal was to fade the background color of the whole page as the user scrolled/progressed down the page. Getting the math right for the "lerp" or linear interpolation of the color values as the user scrolls was a bit tricky to figure out. Then optimizing the performance of the page using requestAnimationFrame on the fixed position ref was crucial to making the overall experience come together (the production version of this experience had a bunch of different animations and sprites on it as well which ate up a lot of browser resources).

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
