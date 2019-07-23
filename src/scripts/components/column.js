import GridSheetComponent from './component';
import GridSheetRow from  './row';

class GridSheetColumn extends GridSheetComponent
{
    constructor(element,options)
    {
        super(element,options);
        this.options=options;
        this.columnNumber=this.options.columnNumber;
        this.rows=new Array();
        this.rowCount=0;
        this.render();
    }

    render()
    {
        this.element=document.createElement('div');
        this.element.classList.add("column");
        this.element.setAttribute('id','sheetcolumn_'+this.columnNumber);
        this.element.style.width=this.options.defaultColumnWidth+this.options.dimension.units;
        this.options.parent.element.appendChild(this.element);
        this.updateSheetWidth();
        this.addRows();
    }

    updateSheetWidth()
    {
        this.options.parent.element.style.width=this.addWidthToSheet()+this.options.dimension.units;
    }

    addWidthToSheet()
    {
       return (this.options.parent.columnCount+2)*this.element.getBoundingClientRect().width;
    }

    addRows()
    {
        this.rows.push(new GridSheetRow(null,Object.assign({}, this.options, {parent:this,columnNumber:this.columnCount,rowNumber:this.rowCount,isGutter:true})));
        this.rowCount++;
        Array(this.options.initialRows).fill(1).forEach((e)=>{
            this.rows.push(new GridSheetRow(null,Object.assign({}, this.options, {parent:this,columnNumber:this.columnCount,rowNumber:this.rowCount,isGutter:this.options.isGutter})));
            this.rowCount++;
        }) ;   
    }
}

export default GridSheetColumn;