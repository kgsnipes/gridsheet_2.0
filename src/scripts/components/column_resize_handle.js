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
        //this.element.style.width=this.options.columnResizeHandlesWidth+this.options.dimension.units;
        this.element.style.height=(this.options.parent.element.getBoundingClientRect().height+this.options.parent.cells.length*2)+this.options.dimension.units;
        this.element.style.top=0+this.options.dimension.units;
        this.element.style.left=(this.options.parent.getWidth()-(this.options.columnResizeHandlesWidth))+this.options.dimension.units;
        this.element.setAttribute('draggable','true');
        this.options.parent.element.appendChild(this.element);
        this.addEventListener();
    }

    addEventListener()
    {
        this.element.addEventListener('dragstart',(evt)=>{
            evt.dataTransfer.dropEffect = "link";
            this.dragStartXPos=evt.clientX;
            //this.element.classList.add('columnresizehandle_active');
        });
        this.element.addEventListener('dragend',(evt)=>{
            this.dragStopXPos=evt.clientX;
            //this.element.classList.remove('columnresizehandle_active');
            this.resizeColumn();
        });
    }

    resizeColumn()
    {
        let dragDistance=this.dragStopXPos-this.dragStartXPos;
        this.options.parent.adjustWidth(dragDistance);
        this.element.style.left=(this.getLeftPosition()+dragDistance)+this.options.dimension.units;
    }

    getLeftPosition()
    {
        return parseInt(this.element.style.left.substring(0,this.element.style.left.indexOf('px')));
    }


}

export default GridSheetColumnResizer;