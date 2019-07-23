import GridSheetComponent from './component';
import GridSheetLogger from  '../common/logger';

class GridSheetSheetButtonContainer extends GridSheetComponent
{
    constructor(element,options)
    {
        super(element,options);
        this.logger=new GridSheetLogger(this.constructor.name);
        this.sheetButtons=new Array();
        this.render();
    }

    render()
    {
        
        this.sheetName=this.options.sheetName;
        this.sheetNumber=this.options.sheetNumber;
        this.addSheetButtonContainerDOM();
        
    }

    addSheetButtonContainerDOM()
    {
        this.element=document.createElement('div');
        this.element.classList.add("sheetbuttoncontainer");
        this.element.setAttribute('id','sheetbuttoncontainer');
        this.options.parent.element.appendChild(this.element);
    }

    
}

export default GridSheetSheetButtonContainer;