import GridSheetComponent from './component';
import GridSheetLogger from  '../common/logger';
import GridSheetUtil from '../common/util';
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
        this.sheetButtonScrollContainer=document.createElement('div');
        this.sheetButtonScrollContainer.classList.add("sheetbuttonscrollcontainer");
        this.sheetButtonScrollContainer.setAttribute('id','sheetbuttonscrollcontainer');
        this.options.parent.element.appendChild(this.sheetButtonScrollContainer);
        this.element=document.createElement('div');
        this.element.classList.add("sheetbuttoncontainer");
        this.element.setAttribute('id','sheetbuttoncontainer');
        this.sheetButtonScrollContainer.appendChild(this.element);
    }
    adjustWidthForSheetButtonContainer()
    {
        this.element.style.width=this.getChildrenWidth()+this.options.dimension.units;
    }

    getChildrenWidth()
    {
        let childrenWidth=0;
        this.sheetButtons.forEach(sb=>{
            childrenWidth+=GridSheetUtil.getPxFromStyle(sb.element.style.width)+20;
        });
        return childrenWidth;
    }

    scrollSheetContainerToLeft(val)
    {
        let leftValue=GridSheetUtil.getPxFromStyle(this.element.style.left)||0;
        let width=GridSheetUtil.getPxFromStyle(this.element.style.width);
        
        if((leftValue+val)<=0 && (leftValue+val)>(-width-val))
        {
            this.element.style.left=(leftValue+val)+this.options.dimension.units;
        }
    }

    
}

export default GridSheetSheetButtonContainer;