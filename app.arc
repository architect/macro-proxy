@app
arc-macro-proxy

@http
get /foo

@macros
proxy

@proxy
staging https://arcane-reaches-80940.herokuapp.com
production https://arcane-reaches-80940.herokuapp.com

