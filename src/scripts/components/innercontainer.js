import GridSheetComponent from './component';
import GridSheet from './sheet';
import GridSheetLogger from  '../common/logger';

class GridSheetInnerContainer extends GridSheetComponent
{
    constructor(element,options)
    {
        super(element,options);
        this.sheetCount=1;
        this.sheets=new Array();
        this.logger=new GridSheetLogger(this.constructor.name);
        this.render();
    }

    render()
    {
        this.createInnerContainerDOM();
        this.addSheetsToInnerContainer();
    }

    createInnerContainerDOM()
    {
        this.element=document.createElement('div');
        this.element.style.width=this.getWidthForInnerContainer(this.options.dimension.width)+this.options.dimension.units;
        this.element.style.height=this.getHeightForInnerContainer(this.options.dimension.height)+this.options.dimension.units;
        this.element.setAttribute('class','innerContainer');
        this.options.parent.appendChild(this.element);
    }

    

    addSheetsToInnerContainer()
    {
        this.logger.info('adding sheets');
        Array(this.options.initialSheets).fill(1).forEach((e)=>{ 
            this.sheets.push(this.addSheetForInnerContainer(this.sheetCount,this.getSheetName(this.sheetCount,null)));
            this.sheetCount++;
        }) ;   
    }

    addSheetForInnerContainer(name,sheetNum)
    {
        return new GridSheet(null,Object.assign({}, this.options, {parent:this.element,sheetName:name,sheetNumber:sheetNum}));
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

    getWidthForInnerContainer(outerContainerWidth)
    {
        return outerContainerWidth*2;
    }
    getHeightForInnerContainer(outerContainerWidth)
    {
        return outerContainerWidth*2;
    }
}

export default GridSheetInnerContainer;