import GridSheetComponent from './component';
import GridSheetLogger from  '../common/logger';
import GridSheetSheetButton from './sheetbutton';
import GridSheetColumn from './column';
import GridSheetRowResizeHighlighter from './row_resize_highlighter';
class GridSheet extends GridSheetComponent
{
    constructor(element,options)
    {
        super(element,options);
        this.logger=new GridSheetLogger(this.constructor.name);
        this.columns=new Array();
        this.columnCount=0;
        this.render();
    }

    render()
    {
        
        this.sheetName=this.options.sheetName;
        this.sheetNumber=this.options.sheetNumber;
        this.addSheetDOM();
        this.addSheetButtonToBottomBar();
        this.addColumnsToSheet();
        //this.addRowResizeHighlighter();
        //this.addEventListener();
    }

    addRowResizeHighlighter()
    {
        this.rowResizeHighlighter=new GridSheetRowResizeHighlighter(null,Object.assign({}, this.options, {parent:this}));
    }



    getRowResizeHighlighter()
    {
        return this.rowResizeHighlighter;
    }

    addColumnsToSheet()
    {
        this.gutterColumn=new GridSheetColumn(null,Object.assign({}, this.options, {parent:this,columnNumber:this.columnCount,isGutter:true}));
        this.columns.push(this.gutterColumn);
        this.columnCount++;
        for(let i=0;i<this.options.initialColumns;i++)
        {
            this.columns.push(new GridSheetColumn(null,Object.assign({}, this.options, {parent:this,columnNumber:this.columnCount,isGutter:false})));
            this.columnCount++;
        }
        
        
    }

    addSheetDOM()
    {
         //this.logger.info('adding sheet to DOM');
        this.element=document.createElement('div');
        //this.element.style.width=this.options.parent.element.style.width;
        //this.element.style.height=this.options.parent.element.style.height;
        this.element.classList.add("sheet");
       
        this.element.setAttribute('id','sheet_'+this.sheetNumber);
        //this.element.innerHTML=this.sheetName;
        this.options.parent.element.appendChild(this.element);
        if(!this.options.isActive)
        {
            this.element.classList.add('hide');
        }
    }

    addSheetButtonToBottomBar()
    {
        let sheetButtonContainer=this.options.parent.options.parent.options.parent.bottomBar.sheetButtonContainer;
        this.sheetButton=new GridSheetSheetButton(null,Object.assign({}, this.options, {parent:sheetButtonContainer,sheetName:this.sheetName,sheetNumber:this.sheetNumber,isActive:this.options.isActive,sheet:this}));
        sheetButtonContainer.sheetButtons.push(this.sheetButton);
    }

    show()
    {
        this.element.classList.remove('hide');
    }
    hide()
    {
        this.element.classList.add('hide');
    }

    // updateSheetWidth()
    // {
    //     this.options.parent.element.style.width=this.addWidthToSheet()+this.options.dimension.units;
    //     this.element.style.width=this.options.parent.element.style.width;
    // }

    // addWidthToSheet()
    // {
    //     let colWidth=0;
    //    this.columns.forEach(col=>{
    //         colWidth+=col.getWidth();
    //    });
    //    return colWidth;
    // }

    // getHeight()
    // {
    //     return this.element.getBoundingClientRect().height;
    // }
    // getTop()
    // {
    //     return this.element.getBoundingClientRect().top;
    // }

    addEventListener()
    {
        this.element.addEventListener('dragover',(evt)=>{
            if(this.getRowResizeHighlighter().isVisible())
            {
                this.getRowResizeHighlighter().setPosition(evt.screenY);
            }
            
        });
    }
}

export default GridSheet;