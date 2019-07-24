import GridSheetComponent from './component';
import GridSheetUtil from '../common/util';
import GridSheetLogger from '../common/logger';

class GridSheetCell extends GridSheetComponent
{
    constructor(element,options)
    {
        super(element,options);
        this.logger=new GridSheetLogger(this.constructor.name);
        this.options=options;
        this.columnNumber=this.options.columnNumber;
        this.rowNumber=this.options.rowNumber;
        this.cellContent='';
        this.render();
    }

    render()
    {
        this.element=document.createElement('div');
        this.element.classList.add("row");
        
        this.element.setAttribute('id','sheetrow_'+this.rowNumber);
        this.element.style.height=this.options.defaultRowHeight+this.options.dimension.units;
        this.options.parent.element.appendChild(this.element);
        this.updateSheetHeight();
        if(this.options.isGutter)
        {
            this.autoWidth=true;
            this.element.classList.add("gutter");
            this.addGutterInformation();
            this.addResizeHandles();
        }
        //this.updateColumnWidth();
        
    }

    updateSheetHeight()
    {
        let sheetElement=this.options.parent.options.parent.element;
        sheetElement.style.width=this.addHeightToSheet()+this.options.dimension.units;
    }
    addHeightToSheet()
    {
        let sheetElement=this.options.parent.options.parent.element;
        return (this.options.parent.columnCount+2)*this.element.getBoundingClientRect().height;
    }

    addGutterInformation(){

        if(this.rowNumber>0 && this.columnNumber==0 && this.options.isGutter)
        {
            this.cellContent=this.getGutterInformation().row+'';
            this.element.innerHTML=this.cellContent;

        }
        if(this.rowNumber==0 && this.options.isGutter)
        {
            this.cellContent=this.getGutterInformation().column+'';
            this.element.innerHTML=this.cellContent;

        }
    }
    getGutterInformation()
    {
        return {row:this.getGutterRowNumber(),column:this.getGutterColumnName()};
    }

    getGutterRowNumber()
    {
        return this.rowNumber;
    }

    getGutterColumnName()
    {
        return GridSheetUtil.getColumnNameFromColumnNumber(this.columnNumber);
    }

    

    getWidthForAdjustment()
    {
        let contentWidth=this.getContentWidth();
        let column=this.options.parent.element;
        if(column.getBoundingClientRect().width>contentWidth && this.rowNumber==0)
        {
            return 0;
        }
        else{
            return contentWidth;
        }
    }

    getContentWidth()
    { 
        return GridSheetUtil.getTextDisplayWidth(this.cellContent,this)+this.options.gutterPadding;
    }

    addResizeHandles()
    {

    }


}

export default GridSheetCell;