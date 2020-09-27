# arc-macro-proxy

Change the default route handler to utilize API Gateway's HTTP proxy. 

## Usage

```
@app
myapp

@macros
architect/macro-proxy

# example lambda handler
@http
get /foo 

# setup proxy for all other traffic
@proxy
staging https://dev.example.com
production https://example.com
```

## Demo

This macro is also a demo!

Check out `app.arc` for example usage proxying Heroku.

Proxied to Heroku: https://9evs31ausg.execute-api.us-east-1.amazonaws.com
Lambda strangler! https://9evs31ausg.execute-api.us-east-1.amazonaws.com/foo
