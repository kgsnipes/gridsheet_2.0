import GridSheetComponent from './component';
import GridSheetLogger from  '../common/logger';

class GridSheetColumnResizer extends GridSheetComponent
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
        this.element.classList.add('columnresizehandle');
        this.element.style.width=this.options.columnResizeHandlesWidth+this.options.dimension.units;
        this.element.style.height=this.options.parent.element.getBoundingClientRect().height+this.options.dimension.units;
        this.element.style.top=this.options.parent.element.getBoundingClientRect().top+this.options.dimension.units;
        this.element.style.left=(this.options.parent.element.getBoundingClientRect().left+this.options.parent.element.getBoundingClientRect().width-this.options.columnResizeHandlesWidth)+this.options.dimension.units;
        this.options.parent.element.appendChild(this.element);
        //this.logger.info(this.element);
    }

}

export default GridSheetColumnResizer;