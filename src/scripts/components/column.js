import GridSheetComponent from './component';
import GridSheetCell from  './cell';
import GridSheetColumnResizer from './column_resize_handle';

class GridSheetColumn extends GridSheetComponent
{
    constructor(element,options)
    {
        super(element,options);
        this.options=options;
        this.columnNumber=this.options.columnNumber;
        this.cells=new Array();
        this.rowCount=0;
        this.render();
    }

    render()
    {
        this.element=document.createElement('div');
        this.element.classList.add("column");
        this.element.setAttribute('id','sheetcolumn_'+this.columnNumber);
        this.element.style.width=this.options.defaultColumnWidth+this.options.dimension.units;
        //this.element.style.top=0+this.options.dimension.units;
        if(this.options.isGutter)
        {
            this.element.style.left=(this.columnNumber*this.options.defaultColumnWidth)+this.options.dimension.units;
        }
        else{
            this.element.style.left=((this.columnNumber*this.options.defaultColumnWidth)-(this.options.defaultColumnWidth-this.options.parent.gutterColumn.getWidth()))+this.options.dimension.units;
        }
        
        this.options.parent.element.appendChild(this.element);
        this.options.parent.updateSheetWidth();
        this.addRows();
        this.addResizeHandles();
    }

    

    addRows()
    {
        this.cells.push(new GridSheetCell(null,Object.assign({}, this.options, {parent:this,columnNumber:this.columnNumber,rowNumber:this.rowCount,isGutter:true})));
        this.rowCount++;
        for(let i=0;i<this.options.initialRows;i++)
        {
            this.cells.push(new GridSheetCell(null,Object.assign({}, this.options, {parent:this,columnNumber:this.columnNumber,rowNumber:this.rowCount,isGutter:this.options.isGutter})));
            this.rowCount++;
        }

        if(this.options.isGutter)
        {
            this.updateColumnWidthForGutterColumn();
        }
        
    }

    updateColumnWidthForGutterColumn()
    {
        if(this.options.isGutter)
        {
           let width=this.cells[this.cells.length-1].getWidthForAdjustment();
           if(width!=0)
           {
            this.setWidth(width);
           }
            
        }
    }

    setWidth(width)
    {
        this.element.style.width=width+this.options.dimension.units;
    }

    adjustWidth(width)
    {
        let previousWidth=this.element.getBoundingClientRect().width;
        this.element.style.width=(previousWidth+width)+this.options.dimension.units;
        let currentWidth=this.element.getBoundingClientRect().width;
       
        this.updateOtherColumnsLeftPosition(width);
    }
    getWidth()
    {
        //return this.element.getBoundingClientRect().width;
        return parseInt(this.element.style.width.substring(0,this.element.style.width.indexOf('px')));
    }

    setLeftPosition(left)
    {
        this.element.style.left=left+this.options.dimension.units;
    }

    getLeftPosition()
    {
        //return this.element.getBoundingClientRect().left;
        //console.log(this.element.style.left);
        return parseInt(this.element.style.left.substring(0,this.element.style.left.indexOf('px')));
    }

    addResizeHandles()
    {
        this.columnResizehandle=new GridSheetColumnResizer(null,Object.assign({}, this.options, {parent:this,columnNumber:this.columnNumber,isGutter:this.options.isGutter}));
    }

    updateOtherColumnsLeftPosition(widthDifference)
    {
        
        this.options.parent.columns.forEach((col)=>{
            
            if(col.columnNumber>this.columnNumber)
            {
                col.setLeftPosition(widthDifference+col.getLeftPosition());
            }
            
            
        });
    }
}

export default GridSheetColumn;