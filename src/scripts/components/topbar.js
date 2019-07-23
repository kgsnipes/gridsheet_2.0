import GridSheetComponent from './component';
import GridSheetLogger from  '../common/logger';

class GridSheetTopBar extends GridSheetComponent
{
    constructor(element,options)
    {
        super(element,options);
        this.logger=new GridSheetLogger(this.constructor.name);
        this.render();
    }

    render()
    {
        this.element=document.createElement('div');
        this.element.style.width=this.options.parent.element.style.width;
        this.element.style.height=this.options.topbarHeight+this.options.dimension.units;
        this.element.style.top=this.getTopBarTop()+this.options.dimension.units;
        
        this.element.classList.add("topbar");
        this.options.parent.element.appendChild(this.element);
    }

    getTopBarTop()
    {
        
        let parentClientRect=this.options.parent.element.getBoundingClientRect();
        return parentClientRect.top;
    }

  
}

export default GridSheetTopBar;