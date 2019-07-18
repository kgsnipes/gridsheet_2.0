import GridSheetComponent from './component';
class GridSheetOuterContainer extends GridSheetComponent
{
    constructor(element,options)
    {
        super(element,options);
        this.render();
    }

    render()
    {
        this.element.style.width=this.options.dimension.width+this.options.dimension.units;
        this.element.style.height=this.options.dimension.height+this.options.dimension.units;
        this.element.setAttribute("class","gridsheet");
    }
}

export default GridSheetOuterContainer;