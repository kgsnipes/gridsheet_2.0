import GridSheetComponent from './component';
import GridSheetLogger from  '../common/logger';
import GridSheetSheetButton from './sheetbutton';
import GridSheetColumn from './column';
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
    }

    addColumnsToSheet()
    {
        this.columns.push(new GridSheetColumn(null,Object.assign({}, this.options, {parent:this,columnNumber:this.columnCount,isGutter:true})));
        this.columnCount++;
        for(let i=0;i<this.options.initialColumns;i++)
        {
            this.columns.push(new GridSheetColumn(null,Object.assign({}, this.options, {parent:this,columnNumber:this.columnCount,isGutter:false})));
            this.columnCount++;
        }
        
    }

    addSheetDOM()
    {
        this.logger.info('adding sheet to DOM');
        this.element=document.createElement('div');
        //this.element.style.width=this.options.parent.element.style.width;
        //this.element.style.height=this.options.parent.element.style.height;
        this.element.classList.add("sheet");
       
        this.element.setAttribute('id','sheet_'+this.sheetNumber);
        //this.element.innerHTML=this.sheetName;
        this.options.parent.element.appendChild(this.element);
        if(!this.options.isVisible)
        {
            this.element.classList.add('hide');
        }
    }

    addSheetButtonToBottomBar()
    {
        let sheetButtonContainer=this.options.parent.options.parent.options.parent.bottomBar.sheetButtonContainer;
        sheetButtonContainer.sheetButtons.push(new GridSheetSheetButton(null,Object.assign({}, this.options, {parent:sheetButtonContainer,sheetName:this.sheetName,sheetNumber:this.sheetNumber})));
    }
}

export default GridSheet;