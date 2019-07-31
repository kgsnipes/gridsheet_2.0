import GridSheetComponent from './component';
import GridSheetUtil from '../common/util';
import GridSheetLogger from '../common/logger';
import GridSheetRowResizer from './row_resize_handle';
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
        this.element.style.width=this.options.parent.element.style.width;
        this.options.parent.element.appendChild(this.element);
        this.cellContentElement=document.createElement('div');
        this.cellContentElement.classList.add("cellcontent");
        this.element.appendChild(this.cellContentElement);
        this.updateSheetHeight();
        if(this.options.isGutter)
        {
            this.autoWidth=true;
            this.element.classList.add("gutter");
            this.addGutterInformation();
            
        }
        //this.updateColumnWidth();
        this.addResizeHandles();
        this.addEventListener();
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
            
            this.setContent(this.cellContent);

        }
        if(this.rowNumber==0 && this.options.isGutter)
        {
            this.cellContent=this.getGutterInformation().column+'';
            this.setContent(this.cellContent);

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
        this.rowResizeHandle=new GridSheetRowResizer(null,Object.assign({}, this.options, {parent:this,columnNumber:this.columnNumber}));
    }

    setContent(content)
    {
        this.cellContentElement.innerHTML=content;
    }
    
    getContent()
    {
        return this.cellContentElement.innerHTML;
    }

    adjustHeight(dragdiff)
    {
       this.element.style.height=(this.getHeight()+dragdiff)+this.options.dimension.units;
        //this.adjustHeightForAllCellsAcrossColumns(dragdiff);
    }

    getHeight()
    {
        return parseInt(this.element.style.height.substring(0,this.element.style.height.indexOf('px')));
    }

    adjustHeightForAllCellsAcrossColumns(dragdiff)
    {
        let sheet=this.options.parent.options.parent;
        sheet.columns.forEach(col=>{
            col.cells[this.rowNumber].adjustHeight(dragdiff);
        });
    }

    addEventListener()
    {
        this.sheetContainer=this.options.parent.options.parent.options.parent;
        if(!this.options.isGutter)
        {
            this.element.addEventListener('dblclick',evt=>{
                this.hideChildren();
                this.sheetContainer.sheetEditorCell.showAtCell(this);
            });
        }
        
    }

    hideChildren()
    {
        this.cellContentElement.classList.add('hide');
        this.rowResizeHandle.element.classList.add('hide');
    }
    showChildren()
    {
        this.cellContentElement.classList.remove('hide');
        this.rowResizeHandle.element.classList.remove('hide');
    }


}

export default GridSheetCell;