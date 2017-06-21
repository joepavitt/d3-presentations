## d3js Presentation Framework

In order to run the presentation, once you have downloaded or performed a `git clone` of the source code, open the `index.html` file in the browser.

The presentation itself works by pressing the left/right arrow keys in order to switch slides. This controls a JavaScript `switch` statement that defines what to do on each slide.

The core JavaScript file that runs the presentation is the `functions.js` file. 

Some of the visualisations, for example the CICS Network chart at the end of the slides, have their code stored in a separate JavaScript file, which is imported into `index.html`, and consequently exposes it's functions globally. This means that we can call functions like `NetworkChart()` from inside `functions.js`