import GridSheetComponent from './component';

class GridSheetRow extends GridSheetComponent
{
    constructor(element,options)
    {
        super(element,options);
        this.options=options;
        this.columnNumber=this.options.columnNumber;
        this.rowNumber=this.options.rowNumber;
        this.render();
    }

    render()
    {
        this.element=document.createElement('div');
        this.element.classList.add("row");
        if(this.options.isGutter)
        {
            this.element.classList.add("gutter");

        }
        this.element.setAttribute('id','sheetrow_'+this.rowNumber);
        this.element.style.height=this.options.defaultRowHeight+this.options.dimension.units;
        this.options.parent.element.appendChild(this.element);
        this.updateSheetHeight();
        
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
   

}

export default GridSheetRow;