import GridSheetComponent from './component';
import GridSheetLogger from  '../common/logger';
class GridSheetLoader extends GridSheetComponent
{
    constructor(element,options)
    {
        super(element,options);
        this.options=options;
        this.logger=new GridSheetLogger(this.constructor.name);
        this.render();
    }

    render()
    {
        this.element=document.createElement('div');
        this.element.style.width=this.options.dimension.width+this.options.dimension.units;
        this.element.style.height=this.options.dimension.height+this.options.dimension.units;
        this.element.classList.add("loader");
        this.options.parent.element.appendChild(this.element);
        
    }

    show()
    {
        this.logger.info('showing the loader');
        return new Promise((resolve,reject)=>{
            this.element.classList.remove("hide");
        });
    }

    hide()
    {
        this.logger.info('hiding the loader');
        return new Promise((resolve,reject)=>{
            this.element.classList.add("hide");
        });
    }

    
}

export default GridSheetLoader;