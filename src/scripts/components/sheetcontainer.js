import GridSheetComponent from './component';
import GridSheet from './sheet';
import GridSheetLogger from  '../common/logger';
import GridSheetEditorCell from './sheet_editor_cell';

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
        this.addSheetEditorCell();
    }

    addSheetEditorCell(){
        this.sheetEditorCell=new GridSheetEditorCell(null,Object.assign({}, this.options, {parent:this}));
    }
    createSheetContainerDOM()
    {
        this.element=document.createElement('div');
        this.element.classList.add("sheetcontainer");
        this.options.parent.element.appendChild(this.element);
    }

    
    addSheetsToInnerContainer()
    {
         //this.logger.info('adding sheets');
        for(let i=0;i<this.options.initialSheets;i++)
        {
            this.sheets.push(this.addSheetForInnerContainer(this.getSheetName(this.sheetCount,null),this.sheetCount,(this.sheetCount==1)?true:false));
            this.sheetCount++;
        }

        this.options.parent.options.parent.bottomBar.sheetButtonContainer.adjustWidthForSheetButtonContainer();
           
    }

    addSheetForInnerContainer(name,sheetNum,isActive)
    {
        return new GridSheet(null,Object.assign({}, this.options, {parent:this,sheetName:name,sheetNumber:sheetNum,isActive:isActive}));
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