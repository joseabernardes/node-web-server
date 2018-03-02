const watch = require('tsc-watch/client');

watch.on('first_success', () => {
    console.log('First success!');
    copyfiles();
});

watch.on('subsequent_success', () => {
    copyfiles();
});

watch.on('compile_errors', () => {
    // Your code goes here...
});


function copyfiles() {
    var copyfiles = require('copyfiles');
    copyfiles(['./src/public/**/*', './src/views/**/*', 'dist'], 1, () => {
        console.log("Files copied");
    });
}

watch.start();

try {
    // do something...
} catch (e) {
    watch.kill(); // Fatal error, kill the compiler instance.
}