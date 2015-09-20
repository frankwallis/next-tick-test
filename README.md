next-tick-test
==================

Demonstrate issue with mocha / async addon / nextTick

npm install
npm run build
npm start

The program should output:

before next tick
after next tick
timed out

but actually it prints out

before next tick
timed out
after next tick

and pauses for 5 seconds between "before next tick" and "timed out"
uncommenting the setInterval fixes the issue.

Changing the addon to callback synchronously also fixes the error, it only
happens when uv-queue-work is used.

UPDATE: it's fixed by using node::MakeCallback.