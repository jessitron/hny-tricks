# Hny Tricks

in which jess makes a GUI for the things she wants to accomplish in the honeycomb API

## run locally

`export HONEYCOMB_API_KEY=where-this-app-should-send-traces`

`npm run start`

Problems? create an issue, hopefully it emails me. I'd link you to Office Hours, but I don't want this to seem like an official Honeycomb app in any way.

## weird dependencies

(the .js is included in this repo)

This uses my own version of htmx, instrumented in my own way. Find it in ~/code/bigskysoftware/htmx (or forked at jessitron/htmx)

It also uses my own hny.js to initialize otel. which is at https://github.com/jessitron/hny-otel-web
