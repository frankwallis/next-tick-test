next-tick-test
==================

Demonstrate issue with mocha / async addon / nextTick

npm install
npm build
npm start

The program should output:

before next tick
after next tick

but it hangs after printing "before next tick"

uncommenting the setInterval fixes the issue.
hitt ctrl-c also causes "after next tick" to be printed before the program exits

Changing the addon to callback synchronously also fixes the error, it only
happens when uv-queue-work is used.

the issue only happens when run in mocha.