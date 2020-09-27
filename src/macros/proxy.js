module.exports = function proxy(arc, cfn, stage) {

  // always check for configuration
  if (arc.proxy) {

    // always ensure we have the configuration we require
    let staging = arc.proxy.find(e=> e[0] === 'staging')
    let production = arc.proxy.find(e=> e[0] === 'production')

    if (!staging) 
      throw SyntaxError('@proxy missing staging')

    if (!production) 
      throw SyntaxError('@proxy missing production')
  
    // clean up default behavior
    delete cfn.Resources.HTTP.Properties.DefinitionBody.paths['/'] // remove the / handler
    delete cfn.Resources.GetIndex // remove the default lambda 
    delete cfn.Resources.InvokeDefaultPermission // remove the default lambda invoke permission

    // overwrite the default route to point at the configured http endpoint
    let url = (stage === 'production'? production : staging)[1]
    cfn.Resources.HTTP.Properties.DefinitionBody.paths['/$default'] = {
      'x-amazon-apigateway-any-method': {
        isDefaultRoute: true,
        'x-amazon-apigateway-integration': {
          payloadFormatVersion: "1.0",
          type: "http_proxy",
          httpMethod: "ANY",
          uri: url, 
          connectionType: "INTERNET",
          timeoutInMillis: 30000
        }
      }
    }

  // end arc.proxy check
  }
  return cfn
}
