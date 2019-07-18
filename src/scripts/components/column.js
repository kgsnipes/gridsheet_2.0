import GridSheetComponent from './component';
class GridSheetColumn extends GridSheetComponent
{
    constructor(element,options)
    {
        super(element,options);
        this.render();
    }

    render()
    {
        this.element=document.createElement('div');
    }
}

export default GridSheetColumn;