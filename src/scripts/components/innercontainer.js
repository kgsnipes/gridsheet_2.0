import GridSheetComponent from './component';
import GridSheetSheetContainer from './sheetcontainer';
import GridSheetLogger from  '../common/logger';


class GridSheetInnerContainer extends GridSheetComponent
{
    constructor(element,options)
    {
        super(element,options);
        this.logger=new GridSheetLogger(this.constructor.name);
        this.render();
    }

    render()
    {
        this.createInnerContainerDOM();
        this.addSheetContainer();
    }

    createInnerContainerDOM()
    {
        this.element=document.createElement('div');
        this.element.style.width=this.getWidthForInnerContainer(this.options.dimension.width)+this.options.dimension.units;
        this.element.style.height=this.getHeightForInnerContainer(this.options.dimension.height)+this.options.dimension.units;
        this.element.style.top=this.getInnerContainerTop()+this.options.dimension.units;
        this.element.classList.add("innercontainer");
        this.options.parent.element.appendChild(this.element);
    }

    addSheetContainer()
    {
        this.sheetContainer=new GridSheetSheetContainer(null,Object.assign({}, this.options, {parent:this})); 
    }


    getInnerContainerTop()
    {
        
        let parentClientRect=this.options.parent.element.getBoundingClientRect();
        return parentClientRect.top+this.options.topbarHeight;
    }


    getWidthForInnerContainer(outerContainerWidth)
    {
        return outerContainerWidth;
    }
    getHeightForInnerContainer(outerContainerHeight)
    {
        return outerContainerHeight-(this.options.topbarHeight+this.options.bottombarHeight);
    }
}

export default GridSheetInnerContainer;