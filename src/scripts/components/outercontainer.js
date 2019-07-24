import GridSheetComponent from './component';
import GridSheetTopBar from './topbar';
import GridSheetBottomBar from  './bottombar';
import GridSheetInnerContainer from './innercontainer';
import GridSheetLoader from './loader';
class GridSheetOuterContainer extends GridSheetComponent
{
    constructor(element,options)
    {
        super(element,options);
        
        //this.render();
        this.init();
    }

    init()
    {
        this.element.style.width=this.options.dimension.width+this.options.dimension.units;
        this.element.style.height=this.options.dimension.height+this.options.dimension.units;
        this.element.classList.add("gridsheet");
        this.renderLoader().then(()=>{});
    }

    render()
    {
        this.renderMainParts().then(()=>{
            this.loader.hide();
        });
    }

    renderMainParts()
    {
        return new Promise((resolve,reject)=>{
            this.renderSheetTopBar();
            this.renderSheetBottomBar();
            this.renderSheetInnerContainer();
            resolve();
        });
    }

    renderLoader()
    {
        return new Promise((resolve,reject)=>{
            this.loader=new GridSheetLoader(null,Object.assign({}, this.options, {parent:this}));
            this.loader.show();
        });
       
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