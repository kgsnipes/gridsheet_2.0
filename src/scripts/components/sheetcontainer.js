import GridSheetComponent from './component';
import GridSheet from './sheet';
import GridSheetLogger from  '../common/logger';

class GridSheetSheetContainer extends GridSheetComponent
{
    constructor(element,options)
    {
        super(element,options);
        this.sheetCount=1;
        this.sheets=new Array();
        this.logger=new GridSheetLogger(this.constructor.name);
        this.options=options;
        this.render();
    }

    render()
    {
        this.createSheetContainerDOM();
        this.addSheetsToInnerContainer();
    }

    createSheetContainerDOM()
    {
        this.element=document.createElement('div');
        this.element.classList.add("sheetcontainer");
        this.options.parent.element.appendChild(this.element);
    }

    
    addSheetsToInnerContainer()
    {
        this.logger.info('adding sheets');
        Array(this.options.initialSheets).fill(1).forEach((e)=>{ 
            this.sheets.push(this.addSheetForInnerContainer(this.getSheetName(this.sheetCount,null),this.sheetCount,(this.sheetCount==1)?true:false));
            this.sheetCount++;
        }) ;   
    }

    addSheetForInnerContainer(name,sheetNum,isVisible)
    {
        return new GridSheet(null,Object.assign({}, this.options, {parent:this,sheetName:name,sheetNumber:sheetNum,isVisible:isVisible}));
    }

    getSheetName(count,name)
    {
        if(name)
        {
            return name+' '+count;
        }
        else{
            return this.options.defaultSheetNamePrefix+' '+count;
        }
    }

   
}

export default GridSheetSheetContainer;