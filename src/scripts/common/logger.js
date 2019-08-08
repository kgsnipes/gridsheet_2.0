/* This is a custom logger created for Gridsheet 
   It is recommended to turn on the logging only for development purpose. 
   As enabling the logging on the distrubution will add to some performance issues.
*/
class GridSheetLogger
  {
    
    //instantiating the logger with the class name where this will be used.
    constructor(name)
    {
      this.name=name;
      this._enableLogging=true;
    }
    
    //this appends the component name to the log message - this is for better log representation on the console. 
    appendComponentName(...args)
    {
      if(args &&  typeof args[0] ==='string')
      {
        args[0]=this.name+" : "+args[0];
      }
      return args;
    }

    // to perform info level logging
    info(...args)
    {
      // adding the component name where this functiona is being called
      let argsT=this.appendComponentName(...args);
      //checking if the browser supports the info logging and also checking if logging is enabled.
      if(console.info && _enableLogging)
        {
          console.info(...argsT);
        }
    }

    // to perform debug level logging.
    debug(...args)
    {
      // adding the component name where this functiona is being called
      let argsT=this.appendComponentName(...args);
      //checking if the browser supports the info logging and also checking if logging is enabled.
      if(console.debug && _enableLogging)
        {
          console.debug(...argsT);
        }
      else if(_enableLogging)
        {
           this.info(...argsT);
        }
    }

    
    error(...args)
    {
      // adding the component name where this functiona is being called
      let argsT=this.appendComponentName(...args);
      if(console.error && _enableLogging)
        {
          console.error(...argsT);
        }
        else if(_enableLogging)
        {
           this.info(...argsT);
        }
    }
    
    warn(...args)
    {
      let argsT=this.appendComponentName(...args);
      if(console.warn && _enableLogging)
        {
          console.warn(...argsT);
        }
      else if(_enableLogging)
        {
           this.info(...argsT);
        }
    }
  }

  export default GridSheetLogger;