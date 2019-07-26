import GridSheetComponent from './component';
import GridSheetLogger from  '../common/logger';

class GridSheetRowResizer extends GridSheetComponent
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
        this.element.classList.add('rowresizehandle');
        this.element.setAttribute('draggable','true');
        this.options.parent.element.appendChild(this.element);
        this.sheet=this.options.parent.options.parent.options.parent;
        this.addEventListener();
    }

    addEventListener()
    {
        this.element.addEventListener('dragstart',(evt)=>{
           // this.sheet.getRowResizeHighlighter().show();
           // this.sheet.getRowResizeHighlighter().setPosition(evt.screenY);
            evt.dataTransfer.dropEffect = "link";
            this.dragStartYPos=evt.clientY;
            
        });
        this.element.addEventListener('dragend',(evt)=>{
           // this.sheet.getRowResizeHighlighter().hide();
            this.dragStopYPos=evt.clientY;
            this.resizeRow();
        });
    }

    resizeRow()
    {
        let dragDistance=this.dragStopYPos-this.dragStartYPos;
        this.options.parent.adjustHeightForAllCellsAcrossColumns(dragDistance);
        //this.element.style.left=(this.getLeftPosition()+dragDistance)+this.options.dimension.units;
    }

 

}

export default GridSheetRowResizer;