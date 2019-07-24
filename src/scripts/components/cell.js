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
        }
        this.updateColumnWidth();
        
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

    updateColumnWidth()
    {
        if(this.isGutter && this.autoWidth)
        {
            this.options.parent.element.style.width=(this.cellContent.length*5)+this.options.dimension.units;
        }
    }

    getContentWidth()
    {
        
    }


}

export default GridSheetCell;