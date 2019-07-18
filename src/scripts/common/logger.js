/* Logger created for Reactor*/
class GridSheetLogger
  {
    constructor(name)
    {
      this.name=name;
    }
    
    appendComponentName(...args)
    {
      if(args &&  typeof args[0] ==='string')
      {
        args[0]=this.name+" : "+args[0];
      }
      return args;
    }
    info(...args)
    {
      let argsT=this.appendComponentName(...args);
      if(console.info)
        {
          console.info(...argsT);
        }
    }
    debug(...args)
    {
      let argsT=this.appendComponentName(...args);
      if(console.debug)
        {
          console.debug(...argsT);
        }
      else
        {
           this.info(...argsT);
        }
    }
    error(...args)
    {
      let argsT=this.appendComponentName(...args);
      if(console.error)
        {
          console.error(...argsT);
        }
      else
        {
           this.info(...argsT);
        }
    }
    
    warn(...args)
    {
      let argsT=this.appendComponentName(...args);
      if(console.warn)
        {
          console.warn(...argsT);
        }
      else
        {
           this.info(...argsT);
        }
    }
  }

  export default GridSheetLogger;