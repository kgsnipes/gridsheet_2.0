import GridSheetComponent from './component';
import GridSheetLogger from  '../common/logger';

class GridSheetBottomBar extends GridSheetComponent
{
    constructor(element,options)
    {
        super(element,options);
        this.logger=new GridSheetLogger(this.constructor.name);
        this.sheetButtons=new Array();
        this.render();
    }

    render()
    {
        this.element=document.createElement('div');
        this.element.style.width=this.options.parent.element.style.width;
        this.element.style.height=this.options.bottombarHeight+this.options.dimension.units;
        this.element.style.top=this.getBottomBarTop()+this.options.dimension.units;
        this.element.classList.add("bottombar");
        this.options.parent.element.appendChild(this.element);

    }

   

    getBottomBarTop()
    {
        
        let parentClientRect=this.options.parent.element.getBoundingClientRect();
        return parentClientRect.top+parentClientRect.height-this.options.bottombarHeight;
    }
}

export default GridSheetBottomBar;