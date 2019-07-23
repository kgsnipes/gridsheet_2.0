import GridSheetComponent from './component';
import GridSheetTopBar from './topbar';
import GridSheetBottomBar from  './bottombar';
import GridSheetInnerContainer from './innercontainer';

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
        this.element.classList.add("gridsheet");
    
        this.renderSheetTopBar();
        this.renderSheetBottomBar();
        this.renderSheetInnerContainer();
    }

    renderSheetInnerContainer()
    {
        this.innerContainer=new GridSheetInnerContainer(null,Object.assign({}, this.options, {parent:this}));     
    }

    renderSheetTopBar()
    {
        this.topBar=new GridSheetTopBar(null,Object.assign({}, this.options, {parent:this})); 
    }
    renderSheetBottomBar()
    {
        this.bottomBar=new GridSheetBottomBar(null,Object.assign({}, this.options, {parent:this})); 
    }
}

export default GridSheetOuterContainer;