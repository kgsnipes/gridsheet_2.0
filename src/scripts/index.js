import '../styles/index.scss';
import GridSheetLogger from './common/logger';
import GridSheetOptions from './common/options';
import GridSheetOuterContainer from './components/outercontainer';
import GridSheetInnerContainer from './components/innercontainer';
class GridsheetApp
{
    constructor(element,options)
    {
        this.logger=new GridSheetLogger(this.constructor.name);
        this.logger.info('entered the gridsheet constructor');
        this.outerContainer=element;
        this.options=Object.assign({}, GridSheetOptions, options);
        this.initUI();
    }

    initUI()
    {
        this.renderSheetOuterContainer();
        this.renderSheetInnerContainer();
    }

    renderSheetOuterContainer()
    {
        this.outerContainer=new GridSheetOuterContainer(this.outerContainer,this.options);     
    }

    renderSheetInnerContainer()
    {
        this.innerContainer=new GridSheetInnerContainer(null,Object.assign({}, this.options, {parent:this.outerContainer.element}));     
    }



}

let gridSheet=new GridsheetApp(document.getElementById("gridsheet"),{});
